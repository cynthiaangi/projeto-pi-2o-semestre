package school.sptech.apachePoi;

import java.io.InputStream;
import java.sql.PreparedStatement;
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

    // método para buscar o ID da doença no banco
    private int getFkDoenca(String nomeDoenca, DoencasDao doencasDao) {
        Integer id = doencasDao.buscarIdDoenca(nomeDoenca); // busca a doença pelo nome
        if (id != null) {
            return id; // retorna o ID da doença
        } else {
            throw new RuntimeException("Doença não encontrada no banco: " + nomeDoenca);
        }
    }

    // método para extrair os dados do arquivo Excel
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

//                if (nomeArquivo.contains("doencas")) {
//                   processarDoencas(row, doencasDao, logDao, nomeArquivo, cidadesDao);
                if (nomeArquivo.contains("cidades")) {
                    processarCidades(row, cidadesDao, logDao, nomeArquivo); // processa as cidades
                } else if (nomeArquivo.contains("vacinas")) {
                    processarOcorrencias(row, ocorrenciasDao, logDao, nomeArquivo, doencasDao); // processa as ocorrências
                }
            }

            logDao.inserirLogEtl( "200", LocalDateTime.now(), "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
            System.out.println("\nLeitura do arquivo finalizada\n");
        } catch (Exception e) {
            logDao.inserirLogEtl( "500", LocalDateTime.now(), e.getMessage(), "LeitorExcel");
            throw new RuntimeException(e); // trata a exceção de erro da leitura do arquivo
        }
  }
    // método para processar e inserir as doenças/ depois vamos alterar para inserir os casos
//    private void processarDoencas(Row row, DoencasDao doencasDao, LogEtlDao logDao, String nomeArquivo) {
//        try {
//            Integer idDoenca = (int) row.getCell(0).getNumericCellValue();
//            String nomeDoenca = row.getCell(1).getStringCellValue();
//            String nomeVacina = row.getCell(2).getStringCellValue();
//
//            if (doencasDao.existsById(idDoenca) == 0) {
//                doencasDao.inserirDoenca(idDoenca, nomeDoenca, nomeVacina);
//                logDao.inserirLogEtl("200", LocalDateTime.now(), "Linha %s do arquivo %s processada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
//            } else {
//                System.out.println("Linha " + row.getRowNum() + " já existe no banco");
//            }
//        } catch (Exception e) {
//            logDao.inserirLogEtl("500", LocalDateTime.now(), "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
//        }
//    }

    // método para processar e inserir as cidades
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
                logDao.inserirLogEtl( "200", LocalDateTime.now(),
                        "Linha %s do arquivo %s processada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
            } else {
                System.out.println("Linha " + row.getRowNum() + " já existe no banco");
            }
        } catch (Exception e) {
            logDao.inserirLogEtl( "500", LocalDateTime.now(),
                    "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
        } // trata a exceção de erro da leitura do arquivo
    }

    // método para processar e inserir as ocorrências
    private void processarOcorrencias(Row row, OcorrenciasDao ocorrenciasDao, LogEtlDao logDao, String nomeArquivo, DoencasDao doencasDao) {
        try {
            // mapeamento dos anos, doenças e a coluna inicial da planilha
            int[] anos = {2019, 2020, 2021, 2022};
            String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"};
            int colunaInicial = 2;

            // Obtendo o valor do código IBGE e convertendo para inteiro
            // (não tenho certeza se isso é necessário, vou verificar depois)
            DataFormatter formatter = new DataFormatter();
            String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
            int codigoIbge = Integer.parseInt(valorIbgeStr); // código IBGE

            // for para percorrer as doenças e anos
            for (int d = 0; d < doencas.length; d++) {
                for (int a = 0; a < anos.length; a++) {
                    int coluna = colunaInicial + d * 4 + a;
                    Cell cell = row.getCell(coluna);
                    double cobertura = 0.0;

                    // Verificando se a célula está vazia ou inválida
                    if (cell == null || cell.toString().trim().isEmpty()) {
                        continue; // logar o erro e pular
                    }
                    if (cell != null) {
                        // try para converter o valor da célula para Double e retirar a vírgula
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
                    int fkDoenca = getFkDoenca(doencas[d], doencasDao);

                    // Verificando se a ocorrência já existe no banco
                    if (ocorrenciasDao.existsByFks(codigoIbge, anos[a], fkDoenca) == 0) {
                        // Inserindo a ocorrência no banco
                        ocorrenciasDao.inserirOcorrencia(fkDoenca, codigoIbge, anos[a], cobertura);
                        logDao.inserirLogEtl( "200", LocalDateTime.now(),
                                "Linha %s do arquivo %s processada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
                        System.out.println("Ocorrência inserida no banco (linha " + row.getRowNum() + ")");
                    } else {
                        System.out.println("Ocorrência já existe no banco (linha " + row.getRowNum() + ")");
                    }
                }
            }
        } catch (Exception e) {
            logDao.inserirLogEtl( "500", LocalDateTime.now(),
                    "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
            System.out.println("Erro ao processar linha " + row.getRowNum() + ": " + e.getMessage());
        }
    }

}

// falta o arquivo de doenças de 23-24
// falta inserir os números de casos por cidades e anos


//Coluna 0: Código IBGE
//Coluna 1: Nome da cidade
//Colunas 2–5: Meningite 2019–2022
//Colunas 6–9: Poliomielite 2019–2022
//Colunas 10–13: Coqueluche 2019–2022