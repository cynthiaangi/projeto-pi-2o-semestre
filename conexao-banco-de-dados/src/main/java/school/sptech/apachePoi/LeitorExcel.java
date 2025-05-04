package school.sptech.apachePoi;

import java.io.InputStream;
import java.time.LocalDateTime;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DBConnectionProvider;
import school.sptech.dao.CidadesDao;
import school.sptech.dao.DoencasDao;
import school.sptech.dao.LogEtlDao;
import school.sptech.dao.OcorrenciasDao;

public class LeitorExcel {

    // metodo para buscar o ID da doença no banco pelo nome
    private Integer getFkDoenca(String nomeDoenca, DoencasDao doencasDao) {
        Integer id = doencasDao.buscarIdDoenca(nomeDoenca); // busca a doença pelo nome
        if (id != null) {
            return id; // retorna o ID da doença
        } else {
            throw new RuntimeException("Doença não encontrada no banco: " + nomeDoenca);
        }
    }

    // metodo para extrair os dados de todos os arquivos Excel
    public void extrairDados(String nomeArquivo, InputStream arquivo) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate(); // conexão com o banco

        DoencasDao doencasDao = new DoencasDao(connection); // conexão com o banco para as doenças
        CidadesDao cidadesDao = new CidadesDao(connection); // conexão com o banco para as cidades
        OcorrenciasDao ocorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências
        LogEtlDao logDao = new LogEtlDao(connection); // conexão com o banco para os logs

        // Verifica se o arquivo é do tipo Excel ou não
        try (Workbook workbook = nomeArquivo.endsWith(".xlsx") ? new XSSFWorkbook(arquivo) : new HSSFWorkbook(arquivo)) {
            System.out.println("\nIniciando leitura do arquivo: " + nomeArquivo); // mensagem de início da leitura

            // Cria um objeto Workbook a partir do arquivo recebido
            // Workbook é a classe base para trabalhar com arquivos Excel
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 1) {
                    System.out.println("\nLendo cabeçalho");
                    continue;
                } // pula a primeira linha (cabeçalho)

                if (nomeArquivo.contains("doencas")) {
                    inserirCasos(row, ocorrenciasDao, logDao, nomeArquivo, doencasDao);
                } else if (nomeArquivo.contains("cidades")) {
                    processarCidades(row, cidadesDao, logDao, nomeArquivo); // processa as cidades
                } else if (nomeArquivo.contains("vacinas") && nomeArquivo.contains("19-22")) {
                    processarOcorrencias(row, ocorrenciasDao, logDao, nomeArquivo, doencasDao); // processa as ocorrências
                } else if (nomeArquivo.contains("vacinas") && nomeArquivo.contains("23-24")) {
                    processarOcorrenciasMensais(row, ocorrenciasDao, logDao, nomeArquivo, doencasDao); // processa as ocorrências mensais
                }
            }
            logDao.inserirLogEtl("200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
            System.out.println("\nLeitura do arquivo finalizada\n");

        } catch (Exception e) {
            logDao.inserirLogEtl("500", e.getMessage(), "LeitorExcel");
            throw new RuntimeException(e); // trata a exceção de erro da leitura do arquivo
        }
    }

    // metodo para processar e inserir as cidades
    private void processarCidades(Row row, CidadesDao cidadesDao, LogEtlDao logDao, String nomeArquivo) {
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
        } catch (Exception e) {
            logDao.inserirLogEtl("500",
                    "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
            System.out.printf("Erro ao processar linha %s: %s%n", row.getRowNum(), e.getMessage());
        } // trata a exceção de erro da leitura do arquivo
    }

    // metodo para processar e inserir as ocorrências anuais
    private void processarOcorrencias(Row row, OcorrenciasDao ocorrenciasDao, LogEtlDao logDao, String nomeArquivo, DoencasDao doencasDao) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();
        try {
            // mapeamento dos anos, doenças e a coluna inicial da planilha
            Integer[] anos = {2019, 2020, 2021, 2022};
            String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"};
            Integer colunaInicial = 2;

            // Obtendo o valor do código IBGE e convertendo para inteiro
            // (não tenho certeza se isso é necessário, vou verificar depois)
            DataFormatter formatter = new DataFormatter();
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            Integer codigoIbge = Integer.parseInt(valorIbgeStr); // código IBGE

            OcorrenciasDao OcorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências
            OcorrenciasDao.iniciarInserts();
            // for para percorrer as doenças e anos
            for (int d = 0; d < doencas.length; d++) {
                for (int a = 0; a < anos.length; a++) {
                    Integer coluna = colunaInicial + d * 4 + a;
                    Cell cell = row.getCell(coluna);
                    Double cobertura = 0.0;

                    // Verificando se a célula está vazia ou inválida
                    if (cell == null || cell.toString().trim().isEmpty()) {
                        continue; // logar o erro e pular
                    }
                    if (cell != null) {

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
                    if (ocorrenciasDao.existsByFks(codigoIbge, anos[a], fkDoenca) == false) {
                        ocorrenciasDao.inserirOcorrencia(fkDoenca, codigoIbge, anos[a], cobertura);
                        System.out.println("Ocorrência anual inserida no banco (linha " + row.getRowNum() + ")");
                    } else {
                        System.out.println("Ocorrência anual já existe no banco (linha " + row.getRowNum() + ")");
                    }
                } OcorrenciasDao.finalizarInserts();
            }
        } catch (Exception e) {
            logDao.inserirLogEtl("500",
                    "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
            System.out.println("Erro ao processar linha " + row.getRowNum() + ": " + e.getMessage());
        }
    }

    // metodo para processar e inserir as ocorrências mensais
    private void processarOcorrenciasMensais(Row row, OcorrenciasDao ocorrenciasDao, LogEtlDao logDao, String nomeArquivo, DoencasDao doencasDao) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();
        try {
            DataFormatter formatter = new DataFormatter();
            String[] doencas = {"Meningite", "Poliomielite", "Coqueluche",};
            String[] meses = {"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
                    "Setembro", "Outubro", "Novembro", "Dezembro"};
            Integer[] anos = {2023, 2024};
            Integer totalMeses = 12;

            // Lê o código IBGE da coluna 0 (índice 0)
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            Long codigoIbge = Long.parseLong(valorIbgeStr);

            Integer colunaInicial = 1;

            Integer colunasPorMes = 7; // 1 população + 3 doenças x (cobertura + doses)
            Integer colunasPorDoenca = 2; // cobertura + doses

            OcorrenciasDao OcorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências
            OcorrenciasDao.iniciarInserts();
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

                        if (ocorrenciasDao.existsByFksMensal(codigoIbge, mesReferencia, anoReferencia, fkDoenca) == false) {
                            ocorrenciasDao.inserirOcorrenciaMensal(fkDoenca, codigoIbge, mesReferencia, anoReferencia, coberturaVacinal);
                            System.out.println("Ocorrência mensal inserida no banco (linha " + row.getRowNum() + ")");

                      } else {
                            logDao.inserirLogEtl("200",
                                    "Ocorrência já existe no banco (linha %s, coluna %s, doenca %s, mesReferencia %s, anoReferencia %d, codigoIbge %d)".formatted(
                                            row.getRowNum(), coluna, doencas[d], mesReferencia, anoReferencia, codigoIbge), "LeitorExcel");
                            System.out.println("Ocorrência mensal já existe no banco (linha " + row.getRowNum() + ")");
                        }
                    }
                } OcorrenciasDao.finalizarInserts();
            }
        } catch (Exception e) {
            logDao.inserirLogEtl("500",
                    "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
        }
    }

    // metodo para inserir numero de casos de cada doença
    private void inserirCasos(Row row, OcorrenciasDao ocorrenciasDao, LogEtlDao logDao, String nomeArquivo, DoencasDao doencasDao) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();
        try {
            Integer[] anos = {2019, 2020, 2021, 2022, 2023, 2024};
            String[] doencas = {"Coqueluche", "Meningite", "Poliomielite"};
            Integer colunaInicial = 1;

            DataFormatter formatter = new DataFormatter();
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            Integer codigoIbge = Integer.parseInt(valorIbgeStr);

            OcorrenciasDao OcorrenciasDao = new OcorrenciasDao(connection); // conexão com o banco para as ocorrências
            OcorrenciasDao.iniciarInserts();
            for (int d = 0; d < doencas.length; d++) {
                Integer fkDoenca = doencasDao.buscarIdDoenca(doencas[d]);

                for (int a = 0; a < anos.length; a++) {
                    Integer coluna = colunaInicial + d * 6 + a; // calcula a coluna correta de acordo com a doença e o ano
                    Cell cell = row.getCell(coluna);
                    Integer numCasos = 0; // variável para armazenar o número de casos

                    if (cell == null || cell.toString().trim().isEmpty()) {
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
            } OcorrenciasDao.finalizarInserts();

        } catch (Exception e) {
            System.out.println("Erro ao inserir casos: " + e.getMessage());
            e.printStackTrace();
            logDao.inserirLogEtl("500",
                    "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
        }
    }
}