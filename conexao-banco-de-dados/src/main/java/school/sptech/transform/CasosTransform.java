package school.sptech.transform;

import org.apache.poi.ss.usermodel.*;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.apachePoi.LeitorExcel;
import school.sptech.dao.CasosDao;
import school.sptech.dao.DoencasDao;
import school.sptech.utils.LogEtl;

import java.util.HashMap;

import static java.util.Objects.isNull;

public class CasosTransform {
    private final LeitorExcel leitor;

    public CasosTransform(LeitorExcel leitor) {
        this.leitor = leitor;
    }

    public void processarCasosDoencas(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl("200", String.format("Iniciando leitura do arquivo: %s", nomeArquivo), "leitorExcel");

        DoencasDao doencasDao = new DoencasDao(connection); // conexão com o banco para as doenças
        CasosDao casosDao = new CasosDao(connection);

        DataFormatter formatter = new DataFormatter();

        Integer[] anos = {2019, 2020, 2021, 2022, 2023, 2024};
        String[] doencas = {"Coqueluche", "Meningite", "Poliomielite"};
        HashMap<String, Integer> doencasFK = new HashMap<>();

        // Busca as FKs das doenças e as relaciona num HashMap
        for (String doencaDaVez : doencas) {
            doencasFK.put(doencaDaVez, leitor.getFkDoenca(doencaDaVez, doencasDao));
        }

        Integer colunaInicial = 1;

        Sheet sheet = workbook.getSheetAt(0);

        if (!casosDao.verificarCasoAnualInserido()) {
            logEtl.inserirLogEtl("204", String.format("Planilha do %s já inserida", nomeArquivo), "LeitorExcel.processarCasosDoencas");
            return;
        }

        casosDao.iniciarInserts();

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
                            logEtl.inserirLogEtl("400", String.format("Erro ao ler valor da célula (linha %d, coluna %d): %s", row.getRowNum(), coluna), ex.getMessage());
                            continue;
                        }
                        casosDao.inserirCasos(fkDoenca, codigoIbge, anos[a], numCasos);
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl("400", String.format("Erro ao processar linha %s: %s", row.getRowNum(), e.getMessage()),"LeitorExcel");
            }
        }
        casosDao.finalizarInserts();
        logEtl.inserirLogEtl("200", String.format("Leitura do arquivo %s completa", nomeArquivo), "LeitorExcel");
    }
}
