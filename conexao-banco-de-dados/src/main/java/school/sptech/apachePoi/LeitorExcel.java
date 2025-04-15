package school.sptech.apachePoi;

import java.io.InputStream;
import java.time.LocalDateTime;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DBConnectionProvider;
import school.sptech.dao.CidadesDao;
import school.sptech.dao.DoencasDao;
import school.sptech.dao.LogEtlDao;
import school.sptech.dao.OcorrenciasDao;

public class LeitorExcel {

    public void extrairDados(String nomeArquivo, InputStream arquivo) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        DoencasDao doencasDao = new DoencasDao(connection);
        CidadesDao cidadesDao = new CidadesDao(connection);
        OcorrenciasDao ocorrenciasDao = new OcorrenciasDao(connection);
        LogEtlDao logDao = new LogEtlDao(connection);

        try (Workbook workbook = nomeArquivo.endsWith(".xlsx") ? new XSSFWorkbook(arquivo) : new HSSFWorkbook(arquivo)) {
            System.out.println("\nIniciando leitura do arquivo: " + nomeArquivo);

            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 1) {
                    System.out.println("\nLendo cabeçalho");
                    continue;
                }

                if (nomeArquivo.contains("doencas")) {
                    processarDoencas(row, doencasDao, logDao, nomeArquivo);
                } else if (nomeArquivo.contains("cidades")) {
                    processarCidades(row, cidadesDao, logDao, nomeArquivo);
                } else if (nomeArquivo.contains("ocorrencias")) {
                    processarOcorrencias(row, ocorrenciasDao, logDao, nomeArquivo);
                }
            }

            logDao.inserirLogEtl(1, "200", LocalDateTime.now(), "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
            System.out.println("\nLeitura do arquivo finalizada\n");
        } catch (Exception e) {
            logDao.inserirLogEtl(1, "500", LocalDateTime.now(), e.getMessage(), "LeitorExcel");
            throw new RuntimeException(e);
        }
    }

    private void processarDoencas(Row row, DoencasDao doencasDao, LogEtlDao logDao, String nomeArquivo) {
        try {
            Integer idDoenca = (int) row.getCell(0).getNumericCellValue();
            String nomeDoenca = row.getCell(1).getStringCellValue();
            String nomeVacina = row.getCell(2).getStringCellValue();

            if (doencasDao.existsById(idDoenca) == 0) {
                doencasDao.inserirDoenca(idDoenca, nomeDoenca, nomeVacina);
                logDao.inserirLogEtl(1, "200", LocalDateTime.now(), "Linha %s do arquivo %s processada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
            } else {
                System.out.println("Linha " + row.getRowNum() + " já existe no banco");
            }
        } catch (Exception e) {
            logDao.inserirLogEtl(1, "500", LocalDateTime.now(), "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
        }
    }

    private void processarCidades(Row row, CidadesDao cidadesDao, LogEtlDao logDao, String nomeArquivo) {
        try {
            Integer codigoIbge = (int) row.getCell(0).getNumericCellValue();
            String nomeCidade = row.getCell(1).getStringCellValue();
            Double qtdPopulacional = (double) row.getCell(2).getNumericCellValue();

            if (cidadesDao.existsById(codigoIbge) == null) {
                cidadesDao.inserirCidade(codigoIbge, nomeCidade, qtdPopulacional);
                logDao.inserirLogEtl(1, "200", LocalDateTime.now(), "Linha %s do arquivo %s processada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
            } else {
                System.out.println("Linha " + row.getRowNum() + " já existe no banco");
            }
        } catch (Exception e) {
            logDao.inserirLogEtl(1, "500", LocalDateTime.now(), "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
        }
    }

    private void processarOcorrencias(Row row, OcorrenciasDao ocorrenciasDao, LogEtlDao logDao, String nomeArquivo) {
        try {

            //Integer idOcorrencia = (int) row.getCell(0).getNumericCellValue();
            //Integer fkDoenca = (int) row.getCell(0).getNumericCellValue();
            Integer fkCidade = (int) row.getCell(0).getNumericCellValue();
            Integer anoReferencia = (int) row.getCell(1).getNumericCellValue();
//            Integer quantidadeCasos = (int) row.getCell(3).getNumericCellValue();
            String coberturaVacinal = row.getCell(2).getStringCellValue().replace(",",".");

            Double coberturaVacinalDouble = 0.0;

            if (ocorrenciasDao.existsByFks(fkCidade, anoReferencia) == null) {
                ocorrenciasDao.inserirOcorrencia(fkCidade, anoReferencia, coberturaVacinalDouble);
                logDao.inserirLogEtl(1, "200", LocalDateTime.now(), "Linha %s do arquivo %s processada".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
            } else {
                System.out.println("Linha " + row.getRowNum() + " já existe no banco");
            }
        } catch (Exception e) {
            logDao.inserirLogEtl(1, "500", LocalDateTime.now(), "Erro ao processar linha %s: %s".formatted(row.getRowNum(), e.getMessage()), "LeitorExcel");
        }
    }
}

//Coluna 0: Código IBGE
//Coluna 1: Nome da cidade
//Colunas 2–5: Meningite 2019–2022
//Colunas 6–9: Poliomielite 2019–2022
//Colunas 10–13: Coqueluche 2019–2022

// Mapeamento dos anos por posição
int[] anos = {2019, 2020, 2021, 2022};
String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"}; // mapear depois para ID
int colunaInicial = 2; // começa na Meningite 2019

for (int rowIndex = 3; rowIndex <= sheet.getLastRowNum(); rowIndex++) { // começa da linha 4
Row row = sheet.getRow(rowIndex);
    if (row == null) continue;

int codigoIbge = (int) row.getCell(0).getNumericCellValue();

    for (int d = 0; d < doencas.length; d++) {
        for (int a = 0; a < anos.length; a++) {
int coluna = colunaInicial + d * 4 + a;
Cell cell = row.getCell(coluna);
double cobertura = 0.0;

            if (cell != null) {
        switch (cell.getCellType()) {
        case NUMERIC:
cobertura = cell.getNumericCellValue();
                        break;
                                case STRING:
String valor = cell.getStringCellValue().replace(",", ".");
cobertura = Double.parseDouble(valor);
                        break;
                                }
                                }

int fkDoenca = getFkDoenca(doencas[d]); // implementa essa função pra mapear a string para ID

// monta o insert
String sql = "INSERT INTO ocorrencias (fkDoenca, fkCidade, anoReferencia, quantidadeCasos, coberturaVacinal) " +
        "VALUES (?, ?, ?, ?, ?)";
PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1, fkDoenca);
            ps.setInt(2, codigoIbge);
            ps.setInt(3, anos[a]);
            ps.setInt(4, 0); // quantidadeCasos está faltando, assume 0
            ps.setDouble(5, cobertura);
            ps.executeUpdate();
        }
                }
                }
