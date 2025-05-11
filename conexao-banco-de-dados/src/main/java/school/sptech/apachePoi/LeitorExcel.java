package school.sptech.apachePoi;

// TODO: Criar ID de execução da aplicação para adicionar em todos os logs de uma mesma execução no banco de dados
// TODO: Refatorar os metodos de processar dados
// TODO: Adicionar Logs para linhas vazias
// TODO: Adicionar em todas as funções a função Log
// TODO: Criar o super método do Dao?
// TODO: Validar os try catch
// Lembrete DEV:
// Leitura interna do arquivo, praticamente não mexer. Só precisa abrir o InputStream, com o Path do arquivo
// Criar instância workbook e fornecer o row pedido
// Após finalizar o For, fechar o InputStream desse arquivo metodo .close()
// Não esquecer de adicionar/validar o auto-commit
// O Main realmente é na classe workbook?
// Não esquecer de mexer com o log - criar classe log, e passar ela nos metodos, para poder
// imprimir log em qualquer parte do código
// verificar estr

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Iterator;
import java.util.List;


import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.SpreadsheetVersion;
import org.apache.poi.ss.formula.EvaluationWorkbook;
import org.apache.poi.ss.formula.udf.UDFFinder;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DBConnectionProvider;
import school.sptech.dao.CidadesDao;
import school.sptech.dao.DoencasDao;
import school.sptech.dao.LogEtlDao;
import school.sptech.dao.OcorrenciasDao;

import static java.util.Objects.isNull;

public class LeitorExcel {

    // metodo para buscar o ID da doença no banco pelo nome
    private Integer getFkDoenca(String nomeDoenca, DoencasDao doencasDao) {
        Integer id = doencasDao.buscarIdDoenca(nomeDoenca); // busca a doença pelo nome
        if (id != null) {
            return id; // retorna o ID da doença
        } else {
            // TO DO: Adicionar log
            throw new RuntimeException("Doença não encontrada no banco: " + nomeDoenca);
        }
    }

    // metodo para extrair os dados de todos os arquivos Excel
    public void extrairDados(String nomeArquivo) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider(); // TODO: Colocar conexão pra fora do for do Workbook main
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate(); // conexão com o banco
        LogEtlDao logDao = new LogEtlDao(connection); // conexão com o banco para os logs

        // Busca endereço do arquivo
        Path caminhoArquivo = Path.of(nomeArquivo);

        try {
            // Abre arquivo e inicia a leitura
            InputStream arquivoLocal = Files.newInputStream(caminhoArquivo);
            Workbook workbook = new XSSFWorkbook(arquivoLocal);


            // Identifica o arquivo da vez e cria a conexão necessária com o banco de dados para inserir os valores
            // Lẽ o arquivo cidades-sp.xlsx
            if (nomeArquivo.contains("cidades")) {
                CidadesDao cidadesDao = new CidadesDao(connection); // conexão com o banco para as cidades

                processarCidades(logDao, cidadesDao, nomeArquivo, workbook); // Processa as cidades

            } else {
                OcorrenciasDao ocorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências
                DoencasDao doencasDao = new DoencasDao(connection); // conexão com o banco para as doenças

                // Lê o arquivo estadoSP_doencas.xlsx
                if (nomeArquivo.contains("doencas")) {
                    processarCasosDoencas(logDao, ocorrenciasDao, doencasDao, nomeArquivo, workbook); // Processa caso das doenças

                } else if (nomeArquivo.contains("vacinas")) {

                    // Lê o arquivo estadoSP_vacinas-19-22.xlsx
                    if (nomeArquivo.contains("19-22")) {
                        processarOcorrenciasAnuais(logDao, ocorrenciasDao, doencasDao, nomeArquivo, workbook); // Processa as vacinas anuais/antigas

                        // Lẽ o arquivo estadoSP_vacinas-23-24.xlsx
                    } else if (nomeArquivo.contains("23-24")) {
                        processarOcorrenciasMensais(logDao, ocorrenciasDao, doencasDao, nomeArquivo, workbook); // Processa as vacinas mensais/recentes

                    }
                }
            }
            arquivoLocal.close();

        } catch (Exception e) {
            logDao.inserirLogEtl("500", e.getMessage(), "LeitorExcel");
            throw new RuntimeException(e);
        }
    }

    // metodo para processar e inserir as cidades
    private void processarCidades(LogEtlDao logDao, CidadesDao cidadesDao, String nomeArquivo, Workbook workbook) {
        logDao.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        // Busca a primeira planilha do excel
        Sheet sheet = workbook.getSheetAt(0);

        cidadesDao.iniciarInserts();
        for (Row row : sheet) {
            if (row.getRowNum() == 1) {
                System.out.println("\nLendo cabeçalho");
                continue;
            } // pula a primeira linha (cabeçalho)

            // Obtém o valor do codigoIbge
            Cell cellCodigoIbge = row.getCell(0);
            Long codigoIbge; // transforma o valor para Long pq no banco é BigInt

            // Verifica o tipo da célula e converte para Long
            if (cellCodigoIbge.getCellType() == CellType.STRING) {
                codigoIbge = Long.parseLong(cellCodigoIbge.getStringCellValue()); // transforma o valor para Long
            } else {
                codigoIbge = (long) cellCodigoIbge.getNumericCellValue(); // transforma o valor para Long
            }

            // Verifique se o código da cidade está correto
            System.out.println("Processando cidade com código IBGE: " + codigoIbge);

            String nomeCidade = row.getCell(1).getStringCellValue(); // nome da cidade

            Float qtdPopulacional; // quantidade populacional
            Cell cellPopulacao = row.getCell(2); // célula da população no Excel
            if (cellPopulacao.getCellType() == CellType.STRING) {
                qtdPopulacional = Float.parseFloat(cellPopulacao.getStringCellValue().replace(".", "").replace(",", "."));
            } else {
                qtdPopulacional = (float) cellPopulacao.getNumericCellValue();
            } // esse if é para verificar se a célula é String ou Numeric

            // Verifica se a cidade já existe no banco
            // Se não existir, insere a cidade
            if (cidadesDao.buscarPorId(codigoIbge) == null) {
                cidadesDao.inserirCidade(codigoIbge, nomeCidade, qtdPopulacional);
                System.out.println("Cidade " + nomeCidade + " inserida no banco (linha " + row.getRowNum() + ")");
            } else {
                System.out.println("Linha " + row.getRowNum() + " já existe no banco");
            }

        }
        cidadesDao.finalizarInserts();

        logDao.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }

    // metodo para processar e inserir as ocorrências anuais
    private void processarOcorrenciasAnuais(LogEtlDao logDao, OcorrenciasDao ocorrenciasDao, DoencasDao doencasDao, String nomeArquivo, Workbook workbook) {
        logDao.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        // Mapeamento dos anos, doenças e a coluna inicial da planilha
        Integer[] anos = {2019, 2020, 2021, 2022};
        String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"};
        Integer colunaInicial = 2;

        DataFormatter formatter = new DataFormatter();

        // Busca a primeira planilha do excel
        Sheet sheet = workbook.getSheetAt(0);

        ocorrenciasDao.iniciarInserts();
        for (Row row : sheet) {
            // Obtendo o valor do código IBGE e convertendo para inteiro
            // (não tenho certeza se isso é necessário, vou verificar depois)
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            Integer codigoIbge = Integer.parseInt(valorIbgeStr); // código IBGE

            // for para percorrer as doenças e anos
            for (int d = 0; d < doencas.length; d++) {
                for (int a = 0; a < anos.length; a++) {
                    Integer coluna = colunaInicial + d * 4 + a;
                    Cell cell = row.getCell(coluna);
                    Double cobertura = 0.0;

                    // Verificando se a célula está vazia ou inválida
                    if (isNull(cell) || cell.toString().trim().isEmpty()) {
                        continue; // logar o erro e pular
                    }

                    if (!isNull(cell)) {
                        try {
                            String valorFormatado = formatter.formatCellValue(cell).replace(",", ".").trim();
                            if (!valorFormatado.isEmpty()) {
                                cobertura = Double.parseDouble(valorFormatado);
                            }
                        } catch (NumberFormatException ex) {
                            System.out.println("Erro ao ler valor da célula (linha " + row.getRowNum() + ", coluna " + coluna + "): " + ex.getMessage());
                            continue;
                        }
                    }

                    // definindo a variável fkDoenca
                    Integer fkDoenca = getFkDoenca(doencas[d], doencasDao);

                    // Verificando se a ocorrência já existe no banco
                    if (!ocorrenciasDao.existsByFks(codigoIbge, anos[a], fkDoenca)) {
                        ocorrenciasDao.inserirOcorrencia(fkDoenca, codigoIbge, anos[a], cobertura);
                        System.out.println("Ocorrência anual inserida no banco (linha " + row.getRowNum() + ")");
                    } else {
                        System.out.println("Ocorrência anual já existe no banco (linha " + row.getRowNum() + ")");
                    }
                }
            }
        }
        ocorrenciasDao.finalizarInserts();
        logDao.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }

    // metodo para processar e inserir as ocorrências mensais
    private void processarOcorrenciasMensais(LogEtlDao logDao, OcorrenciasDao ocorrenciasDao, DoencasDao doencasDao, String nomeArquivo, Workbook workbook) {
        logDao.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        DataFormatter formatter = new DataFormatter();

        // Mapeamento das variáveis da planilha
        String[] doencas = {"Meningite", "Poliomielite", "Coqueluche",};
        String[] meses = {
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        };
        Integer[] anos = {2023, 2024};
        Integer totalMeses = 12;
        Integer colunaInicial = 1;
        Integer colunasPorMes = 7; // 1 população + 3 doenças x (cobertura + doses)
        // Integer colunasPorDoenca = 2; // cobertura + doses


        Sheet sheet = workbook.getSheetAt(0);

        ocorrenciasDao.iniciarInserts();
        for (Row row : sheet) {
            // Lê o código IBGE da coluna 0 (índice 0)
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            Long codigoIbge = Long.parseLong(valorIbgeStr);

            for (int d = 0; d < doencas.length; d++) {
                Integer fkDoenca = getFkDoenca(doencas[d], doencasDao);

                for (int a = 0; a < anos.length; a++) {
                    for (int m = 0; m < totalMeses; m++) {
                        // Posição do mês dentro do ano
                        Integer baseColunaMes = colunaInicial + a * totalMeses * colunasPorMes + m * colunasPorMes;

                        Integer coluna = switch (d) {
                            case 0 -> baseColunaMes + 1;
                            case 1 -> baseColunaMes + 3;
                            case 2 -> baseColunaMes + 5;
                            default -> null;
                        };

                        Cell cell2 = row.getCell(coluna);
                        if (cell2 == null || formatter.formatCellValue(cell2).trim().isEmpty()) {
                            continue;
                        }

                        Double coberturaVacinal;
                        try {
                            String valorFormatado = formatter.formatCellValue(cell2).replace(",", ".").trim();
                            coberturaVacinal = Double.parseDouble(valorFormatado);
                        } catch (NumberFormatException ex) {
                            logDao.inserirLogEtl("400",
                                    "Erro ao converter valor na linha %s, coluna %s: %s".formatted(row.getRowNum(), coluna, ex.getMessage()), "LeitorExcel");
                            continue;
                        }

                        String mesReferencia = meses[m];
                        Integer anoReferencia = anos[a];

                        if (!ocorrenciasDao.existsByFksMensal(codigoIbge, mesReferencia, anoReferencia, fkDoenca)) {
                            ocorrenciasDao.inserirOcorrenciaMensal(fkDoenca, codigoIbge, mesReferencia, anoReferencia, coberturaVacinal);
                            System.out.println("Ocorrência mensal inserida no banco (linha " + row.getRowNum() + ")");

                        } else {
                            logDao.inserirLogEtl("200",
                                    "Ocorrência já existe no banco (linha %s, coluna %s, doenca %s, mesReferencia %s, anoReferencia %d, codigoIbge %d)".formatted(
                                            row.getRowNum(), coluna, doencas[d], mesReferencia, anoReferencia, codigoIbge), "LeitorExcel");
                        }
                    }
                }
            }
        }
        ocorrenciasDao.finalizarInserts();
        logDao.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }


    // metodo para inserir numero de casos de cada doença
    private void processarCasosDoencas(LogEtlDao logDao, OcorrenciasDao ocorrenciasDao, DoencasDao doencasDao, String nomeArquivo, Workbook workbook) {
        logDao.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        DataFormatter formatter = new DataFormatter();

        Integer[] anos = {2019, 2020, 2021, 2022, 2023, 2024};
        String[] doencas = {"Coqueluche", "Meningite", "Poliomielite"};
        Integer colunaInicial = 1;

        Sheet sheet = workbook.getSheetAt(0);

        ocorrenciasDao.iniciarInserts();
        for (Row row : sheet) {
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            Integer codigoIbge = Integer.parseInt(valorIbgeStr);

            for (int d = 0; d < doencas.length; d++) {
                Integer fkDoenca = doencasDao.buscarIdDoenca(doencas[d]);

                for (int a = 0; a < anos.length; a++) {
                    Integer coluna = colunaInicial + d * 6 + a; // calcula a coluna correta de acordo com a doença e o ano
                    Cell cell = row.getCell(coluna);
                    Integer numCasos = 0; // variável para armazenar o número de casos

                    if (isNull(cell) || cell.toString().trim().isEmpty()) {
                        continue; // pula a célula vazia
                    }

                    try {
                        String valorFormatado = formatter.formatCellValue(cell).replace(",", ".").trim();
                        if (!valorFormatado.isEmpty()) {
                            numCasos = Integer.parseInt(valorFormatado);
                        }
                    } catch (NumberFormatException ex) {
                        System.out.println("Erro ao ler valor da célula (linha " + row.getRowNum() + ", coluna " + coluna + "): " + ex.getMessage());
                        continue;
                    } // trata a exceção de erro da leitura do arquivo

                    // Inserir ou atualizar ocorrência
                    if (ocorrenciasDao.existsByFks(fkDoenca, codigoIbge, anos[a])) {
                        ocorrenciasDao.atualizarCasos(fkDoenca, codigoIbge, anos[a], numCasos);
                        System.out.println("Número de casos inseridos no banco (linha " + row.getRowNum() + ")");
                    } else {
                        logDao.inserirLogEtl("400",
                                "Ocorrência da linha %s do arquivo %s não encontrada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
                        System.out.println("Nenhuma ocorrência foi encontrada (linha " + row.getRowNum() + ")");
                    }
                }
            }
        }
        ocorrenciasDao.finalizarInserts();
        logDao.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }

}