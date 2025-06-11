package school.sptech.transform;

import org.apache.poi.ss.usermodel.*;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.dao.DoencasDao;
import school.sptech.dao.OcorrenciasDao;
import school.sptech.utils.LogEtl;
import school.sptech.utils.Status;

import java.util.HashMap;

import static java.util.Objects.isNull;

public class OcorrenciasAnuaisTransform extends Transform {
    private DoencasDao doencasDao;
    private OcorrenciasDao ocorrenciasDao;

    public OcorrenciasAnuaisTransform(LogEtl logEtl, JdbcTemplate connection) {
        super(logEtl, connection);
    }

    @Override
    public void conectarAoBanco() {
        this.doencasDao = new DoencasDao(connection);
        this.ocorrenciasDao = new OcorrenciasDao(connection);
    }

    public void processarOcorrenciasAnuais(String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl(Status.S_200, String.format("Iniciando leitura do arquivo: %s", nomeArquivo), "processarOcorrenciasAnuais", "OcorrenciasAnuaisTransform");

        conectarAoBanco();

        // Mapeamento dos anos, doenças e a coluna inicial da planilha
        Integer[] anos = {2019, 2020, 2021, 2022};

        HashMap<String, Integer> doencasFK = listarFkDoencas(doencasDao);

        Integer colunaInicial = 2;

        // Busca a primeira planilha do excel
        Sheet sheet = workbook.getSheetAt(0);

        for (String doencaDaVez : doencas) {
            try {
                Long codigoIbge = lerCodigoIbge(sheet.getRow(1));

                if (ocorrenciasDao.existsByFksAnual(codigoIbge, anos[3], doencasFK.get(doencaDaVez))) {
                    logEtl.inserirLogEtl(Status.S_204, String.format("Arquivo já inserido anteriormente: %s", nomeArquivo), "processarOcorrenciasAnuais", "OcorrenciasAnuaisTransform");
                    return;
                }

            } catch (Exception e) {
                logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao processar validação das ocorrências anuais na linha %s: %s", sheet.getRow(1).getRowNum(), e.getMessage()),"processarOcorrenciasAnuais", "OcorrenciasAnuaisTransform");
            }
        }

        ocorrenciasDao.iniciarInserts();
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                Long codigoIbge = lerCodigoIbge(row);

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
                                    if (cobertura > 100.00) {
                                        cobertura = 100.00;
                                    }
                                }
                            } catch (NumberFormatException ex) {
                                logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao ler valor da célula (linha %d, coluna %d): %s", row.getRowNum(), coluna, ex.getMessage()), "processarOcorrenciasAnuais", "OcorrenciasAnuaisTransform");
                                continue;
                            }
                        }

                        ocorrenciasDao.inserirOcorrencia(fkDoenca, codigoIbge, anos[a], cobertura);
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao processar linha %d: %s", row.getRowNum(), e.getMessage()),"processarOcorrenciasAnuais", "OcorrenciasAnuaisTransform");
            }

        }
        ocorrenciasDao.finalizarInserts();
        logEtl.inserirLogEtl(Status.S_200, String.format("Leitura do arquivo %s completa", nomeArquivo), "processarOcorrenciasAnuais", "OcorrenciasAnuaisTransform");
    }
}
