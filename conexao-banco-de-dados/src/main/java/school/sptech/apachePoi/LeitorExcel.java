package school.sptech.apachePoi;

// TODO: Criar ID de execução da aplicação para adicionar em todos os logs de uma mesma execução no banco de dados
// TODO: Refatorar os metodos de processar dados
// TODO: Adicionar Logs para linhas vazias
// TODO: Adicionar em todas as funções a função Log
// TODO: Criar o super método do Dao?
// TODO: Validar os try catch
// TODO: Testar validação de ocorrênciais mensais
// TODO: Validar Processar casos
// TODO: Mudar os numeros do status
// TODO: Criar ID por execução do ETL no LOG
// TODO: mudar rows para fori
// TODO: Mudar bucketname no Workbook para env
// TODO: Mudar de classe para metodo no log BD e no Java
// TODO: Adicionar ENUM para os status ?
// TODO: Corrigir antigo classQueOcorreu
// TODO: Corrigir planilhas de dados
// TODO: Adicionar classeQueOcorreu no banco de dados e no Java
// TODO: Adicionar verificar inserção cidade ??
// TODO: Trocar user banco para immuno

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
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.utils.LogEtl;
import school.sptech.dao.CidadesDao;
import school.sptech.dao.DoencasDao;
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

    public static InputStream abrirArquivo(String nomeArquivo) throws IOException {
        Path caminhoArquivo = Path.of(nomeArquivo);
        InputStream arquivoLocal = Files.newInputStream(caminhoArquivo);

        return arquivoLocal;
    }

    public void processarDadosDoArquivo(LogEtl logEtl, JdbcTemplate connection, Workbook planilhaExcel, String nomeArquivo) {
        switch (nomeArquivo) {
            case "cidades-sp.xlsx" -> {
                processarCidades(logEtl, connection, nomeArquivo, planilhaExcel); // Processa as cidades
            }
            case "estadoSP_vacinas-19-22.xlsx" -> {
                processarCasosDoencas(logEtl, connection, nomeArquivo, planilhaExcel); // Processa caso das doenças
            }
            case "estadoSP_vacinas-23-24.xlsx" -> {
                processarOcorrenciasAnuais(logEtl, connection, nomeArquivo, planilhaExcel); // Processa as vacinas anuais/antigas
            }
            case "estadoSP_doencas.xlsx" -> {
                processarOcorrenciasMensais(logEtl, connection, nomeArquivo, planilhaExcel); // Processa as vacinas mensais/recentes
            }
            default -> {
                logEtl.inserirLogEtl("404", "Arquivo não reconhecido: %s".formatted(nomeArquivo), "LeitorExcel.extraisDados");
            }
        }
    }

    // metodo para extrair os dados de todos os arquivos Excel
    public void extrairDados(LogEtl logEtl, JdbcTemplate connection, String[] nomeArquivos) {
        for (String nomeArquivo : nomeArquivos) {
            logEtl.inserirLogEtl("200", "Início da leitura do arquivo: %s %n".formatted(nomeArquivo), "Main.executarProcessoETL");

            try {
                // Abre arquivo
                InputStream arquivoLocal = abrirArquivo(nomeArquivo);

                Workbook planilhaExcel = new XSSFWorkbook(arquivoLocal);

                this.processarDadosDoArquivo(logEtl, connection, planilhaExcel, nomeArquivo);

                arquivoLocal.close();

            } catch (Exception e) {
                logEtl.inserirLogEtl("500", e.getMessage(), "LeitorExcel");
                throw new RuntimeException(e);
            }
        }
    }

    // metodo para processar e inserir as cidades
    private void processarCidades(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        CidadesDao cidadesDao = new CidadesDao(connection); // conexão com o banco para as cidades

        // Busca a primeira planilha do excel
        Sheet sheet = workbook.getSheetAt(0);

        cidadesDao.iniciarInserts();
        for (int i = 2; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
            try {
                // Obtém o valor do codigoIbge
                Cell cellCodigoIbge = row.getCell(0);
                Long codigoIbge; // transforma o valor para Long pq no banco é BigInt

                // Verifica o tipo da célula e converte para Long
                if (cellCodigoIbge.getCellType() == CellType.STRING) {
                    codigoIbge = Long.parseLong(cellCodigoIbge.getStringCellValue()); // transforma o valor para Long
                } else {
                    codigoIbge = (long) cellCodigoIbge.getNumericCellValue(); // transforma o valor para Long
                }

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
                if (isNull(cidadesDao.buscarPorId(codigoIbge))) {
                    cidadesDao.inserirCidade(codigoIbge, nomeCidade, qtdPopulacional);
                } else {
                    logEtl.inserirLogEtl("400", "Erro ao processar linha %s: Cidade já exist no banco".formatted(row.getRowNum()),"LeitorExcel");

                }
            } catch (Exception e) {
                logEtl.inserirLogEtl("400", "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()),"LeitorExcel");
            }
        }
        cidadesDao.finalizarInserts();

        logEtl.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }

    // metodo para processar e inserir as ocorrências anuais
    private void processarOcorrenciasAnuais(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        DoencasDao doencasDao = new DoencasDao(connection); // conexão com o banco para as doenças
        OcorrenciasDao ocorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências

        // Mapeamento dos anos, doenças e a coluna inicial da planilha
        Integer[] anos = {2019, 2020, 2021, 2022};

        String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"};
        HashMap<String, Integer> doencasFK = new HashMap<>();

        // Busca as FKs das doenças e as relaciona num HashMap
        for (String doencaDaVez : doencas) {
            doencasFK.put(doencaDaVez, getFkDoenca(doencaDaVez, doencasDao));
        }

        Integer colunaInicial = 2;

        DataFormatter formatter = new DataFormatter();

        // Busca a primeira planilha do excel
        Sheet sheet = workbook.getSheetAt(0);


        for (String doencaDaVez : doencas) {
            try {
                String valorIbgeStr = formatter.formatCellValue(sheet.getRow(1).getCell(0)).trim();
                Integer codigoIbge = Integer.parseInt(valorIbgeStr); // código IBGE

                if (ocorrenciasDao.existsByFksAnual(codigoIbge, anos[3], doencasFK.get(doencaDaVez))) {
                    logEtl.inserirLogEtl("204", "Arquivo já inserido anteriormente: %s".formatted(nomeArquivo), "LeitorExcel");
                    return;
                }

            } catch (Exception e) {
                logEtl.inserirLogEtl("404", "Erro ao processar validação das ocorrências anuais na linha %s: %s".formatted(sheet.getRow(1).getRowNum(), e.getMessage()),"LeitorExcel");
            }
        }

        ocorrenciasDao.iniciarInserts();
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                // Obtendo o valor do código IBGE e convertendo para inteiro
                // (não tenho certeza se isso é necessário, vou verificar depois)
                String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
                Integer codigoIbge = Integer.parseInt(valorIbgeStr); // código IBGE

                // for para percorrer as doenças e anos
                for (int d = 0; d < doencas.length; d++) {
                    // definindo a variável fkDoenca
                    Integer fkDoenca = doencasFK.get(doencas[d]);
                    Integer colunaBase = colunaInicial + (d * 4);

                    for (int a = 0; a < anos.length; a++) {
                        // Conta refatorada para ser mais rápido
                        // Integer coluna = colunaInicial + a + (d * 4);
                        Integer coluna = colunaBase + a;

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
                                logEtl.inserirLogEtl("400", "Erro ao ler valor da célula (linha %d, coluna %d): %s".formatted(row.getRowNum(), coluna, ex.getMessage()), "Leitor Excel");
                                continue;
                            }
                        }

                        ocorrenciasDao.inserirOcorrencia(fkDoenca, codigoIbge, anos[a], cobertura);
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl("400", "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()),"LeitorExcel");
            }

        }
        ocorrenciasDao.finalizarInserts();
        logEtl.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }

    // metodo para processar e inserir as ocorrências mensais
    private void processarOcorrenciasMensais(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        DoencasDao doencasDao = new DoencasDao(connection); // conexão com o banco para as doenças
        OcorrenciasDao ocorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências

        DataFormatter formatter = new DataFormatter();

        // Mapeamento das variáveis da planilha
        String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"};
        HashMap<String, Integer> doencasFK = new HashMap<>();

        // Busca as FKs das doenças e as relaciona num HashMap
        for (String doencaDaVez : doencas) {
            doencasFK.put(doencaDaVez, getFkDoenca(doencaDaVez, doencasDao));
        }

        String[] meses = {
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        };
        Integer[] anos = {2023, 2024};
        Integer totalMeses = 12;
        Integer colunaInicial = 1;
        Integer colunasPorMes = 7; // 1 população + 3 doenças x (cobertura + doses)
        Integer totalMeses_X_colunasPorMes = 84;
        // Integer colunasPorDoenca = 2; // cobertura + doses
        Sheet sheet = workbook.getSheetAt(0);

        // Validação se os dados já foram inseridos
        try {
            for (String doencaDaVez : doencas) {
                String valorIbgeStr = formatter.formatCellValue(sheet.getRow(3).getCell(0)).trim();
                Long codigoIbge = Long.parseLong(valorIbgeStr);

                if (ocorrenciasDao.existsByFksMensal(codigoIbge, meses[11], anos[1], doencasFK.get(doencaDaVez))) {
                    logEtl.inserirLogEtl("204", "Arquivo já inserido anteriormente: %s".formatted(nomeArquivo), "LeitorExcel");
                    return;
                }
            }
        } catch (Exception e) {
            logEtl.inserirLogEtl("404", "Erro ao processar validação das ocorrências mensais na linha %s: %s".formatted(sheet.getRow(0).getRowNum(), e.getMessage()),"LeitorExcel");

        }

        ocorrenciasDao.iniciarInserts();
        for (int i = 3; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                // Lê o código IBGE da coluna 0 (índice 0)
                String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
                Long codigoIbge = Long.parseLong(valorIbgeStr);


                for (int d = 0; d < doencas.length; d++) {
                    Integer fkDoenca = doencasFK.get(doencas[d]); // Está buscando o id das doenças a cell, pode-se buscar isso antes num for de 3 iterações (por nome de doenca) e salvar num array ou num key value com os nomes das doenças
                    Integer baseColunaDoenca = colunaInicial + (1 + d * 2);

                    for (int a = 0; a < anos.length; a++) {
                        Integer baseColunaAno = baseColunaDoenca + (a * totalMeses_X_colunasPorMes);

                        for (int m = 0; m < totalMeses; m++) {
                            // Posição do mês dentro do ano, conta refatorada para ser mais performático
                            // Integer coluna = colunaInicial + a * totalMeses * colunasPorMes + m * colunasPorMes + (1 + d * 2); - conta não refatorada
                            Integer coluna = baseColunaAno + (m * colunasPorMes);

                            Cell cell2 = row.getCell(coluna);
                            if ( isNull(cell2) || formatter.formatCellValue(cell2).trim().isEmpty()) {
                                continue;
                            }

                            Double coberturaVacinal;
                            try {
                                String valorFormatado = formatter.formatCellValue(cell2).replace(",", ".").trim();
                                coberturaVacinal = Double.parseDouble(valorFormatado);
                            } catch (NumberFormatException ex) {
                                logEtl.inserirLogEtl(
                                        "400", "Erro ao converter valor na linha %d, coluna %d: %s".formatted(row.getRowNum(), coluna, ex.getMessage()), "LeitorExcel"
                                );
                                continue;
                            }

                            ocorrenciasDao.inserirOcorrenciaMensal(fkDoenca, codigoIbge, meses[m], anos[a], coberturaVacinal);
                        }
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl("400", "Erro ao processar linha %d: %s".formatted(row.getRowNum(), e.getMessage()),"LeitorExcel");
            }
        }
        ocorrenciasDao.finalizarInserts();
        logEtl.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }

    // metodo para inserir numero de casos de cada doença
    private void processarCasosDoencas(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl("200", "Iniciando leitura do arquivo: %s".formatted(nomeArquivo), "leitorExcel");

        OcorrenciasDao ocorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências
        DoencasDao doencasDao = new DoencasDao(connection); // conexão com o banco para as doenças

        DataFormatter formatter = new DataFormatter();

        Integer[] anos = {2019, 2020, 2021, 2022, 2023, 2024};
        String[] doencas = {"Coqueluche", "Meningite", "Poliomielite"};
        HashMap<String, Integer> doencasFK = new HashMap<>();

        // Busca as FKs das doenças e as relaciona num HashMap
        for (String doencaDaVez : doencas) {
            doencasFK.put(doencaDaVez, getFkDoenca(doencaDaVez, doencasDao));
        }

        Integer colunaInicial = 1;

        Sheet sheet = workbook.getSheetAt(0);

        if (!ocorrenciasDao.verificarCasoAnualInserido()) {
            logEtl.inserirLogEtl("204", "Planilha do %s já inserida".formatted(nomeArquivo), "LeitorExcel.processarCasosDoencas");
            return;
        }

        ocorrenciasDao.iniciarInserts();

        for (int i = 2; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
                Integer codigoIbge = Integer.parseInt(valorIbgeStr);

                for (int d = 0; d < doencas.length; d++) {
                    Integer fkDoenca = doencasFK.get(doencas[d]);
                    Integer colunaBase = colunaInicial + (d * 6);

                    for (int a = 0; a < anos.length; a++) {
                        // Conta refatorada para ser mais performático
                        // Integer coluna = colunaInicial + d * 6 + a; -> calcula a coluna correta de acordo com a doença e o ano
                        Integer coluna = colunaBase + a;

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
                            logEtl.inserirLogEtl("400", "Erro ao ler valor da célula (linha %d, coluna %d): %s".formatted(row.getRowNum(), coluna), ex.getMessage());
                            continue;
                        } // trata a exceção de erro da leitura do arquivo

                        ocorrenciasDao.inserirCasos(fkDoenca, codigoIbge, anos[a], numCasos);
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl("400", "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()),"LeitorExcel");
            }
        }
        ocorrenciasDao.finalizarInserts();
        logEtl.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
    }
}