package school.sptech.transform;

import org.apache.poi.ss.usermodel.*;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.dao.CasosDao;
import school.sptech.dao.DoencasDao;
import school.sptech.dao.OcorrenciasDao;
import school.sptech.utils.LogEtl;
import school.sptech.utils.Status;

import java.util.HashMap;

import static java.util.Objects.isNull;

public class CasosTransform extends Transform{
    private DoencasDao doencasDao;
    private CasosDao casosDao;

    @Override
    public void conectarAoBanco(JdbcTemplate connection) {
        this.doencasDao = new DoencasDao(connection);
        this.casosDao = new CasosDao(connection);
    }

    public void processarCasosDoencas(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl(Status.S_200, String.format("Iniciando leitura do arquivo: %s", nomeArquivo), "processarCasosDoencas", "CasosTransform");

        conectarAoBanco(connection);

        Integer[] anos = {2019, 2020, 2021, 2022, 2023, 2024};

        HashMap<String, Integer> doencasFK = listarFkDoencas(doencasDao);

        Integer colunaInicial = 1;

        Sheet sheet = workbook.getSheetAt(0);

        if (!casosDao.verificarCasoAnualInserido()) {
            logEtl.inserirLogEtl(Status.S_204, String.format("Planilha do %s já inserida", nomeArquivo), "processarCasosDoencas", "CasosTransform");
            return;
        }

        casosDao.iniciarInserts();

        for (int i = 2; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                Long codigoIbge = lerCodigoIbge(row);

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
                            logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao ler valor da célula (linha %d, coluna %d): %s", row.getRowNum(), coluna, ex.getMessage()), "processarCasosDoencas", "CasosTransform");
                            continue;
                        }
                        casosDao.inserirCasos(fkDoenca, codigoIbge, anos[a], numCasos);
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao processar linha %s: %s", row.getRowNum(), e.getMessage()),"processarCasosDoencas", "CasosTransform");
            }
        }
        casosDao.finalizarInserts();
        logEtl.inserirLogEtl(Status.S_200, String.format("Leitura do arquivo %s completa", nomeArquivo), "processarCasosDoencas", "CasosTransform");
    }
}
