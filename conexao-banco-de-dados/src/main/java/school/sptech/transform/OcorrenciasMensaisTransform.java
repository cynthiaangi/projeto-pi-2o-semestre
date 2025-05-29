package school.sptech.transform;

import org.apache.poi.ss.usermodel.*;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.dao.DoencasDao;
import school.sptech.dao.OcorrenciasDao;
import school.sptech.utils.LogEtl;

import java.util.HashMap;

import static java.util.Objects.isNull;

public class OcorrenciasMensaisTransform extends Transform{
    private DoencasDao doencasDao;
    private OcorrenciasDao ocorrenciasDao;

    @Override
    public void conectarAoBanco(JdbcTemplate connection) {
        this.doencasDao = new DoencasDao(connection);
        this.ocorrenciasDao = new OcorrenciasDao(connection);
    }

    public void processarOcorrenciasMensais(LogEtl logEtl, JdbcTemplate connection, String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl("200", String.format("Iniciando leitura do arquivo: %s", nomeArquivo), "leitorExcel");

        conectarAoBanco(connection);

        // Mapeamento das variáveis da planilha
        String[] doencas = {"Meningite", "Poliomielite", "Coqueluche"};
        HashMap<String, Integer> doencasFK = listarFkDoencas(doencasDao);

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
            Row row = sheet.getRow(3);
            for (String doencaDaVez : doencas) {
                Long codigoIbge = lerCodigoIbge(row);

                if (ocorrenciasDao.existsByFksMensal(codigoIbge, meses[11], anos[1], doencasFK.get(doencaDaVez))) {
                    logEtl.inserirLogEtl("204", String.format("Arquivo já inserido anteriormente: %s", nomeArquivo), "LeitorExcel");
                    return;
                }
            }
        } catch (Exception e) {
            logEtl.inserirLogEtl("404", String.format("Erro ao processar validação das ocorrências mensais na linha %s: %s", sheet.getRow(3).getRowNum(), e.getMessage()) ,"LeitorExcel");
        }

        ocorrenciasDao.iniciarInserts();
        for (int i = 3; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                Long codigoIbge = lerCodigoIbge(row);

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
                                        "400", String.format("Erro ao converter valor na linha %d, coluna %d: %s", row.getRowNum(), coluna, ex.getMessage()), "LeitorExcel"
                                );
                                continue;
                            }

                            ocorrenciasDao.inserirOcorrenciaMensal(fkDoenca, codigoIbge, meses[m], anos[a], coberturaVacinal);
                        }
                    }
                }
            } catch (Exception e) {
                logEtl.inserirLogEtl("400", String.format("Erro ao processar linha %d: %s", row.getRowNum(), e.getMessage()),"LeitorExcel");
            }
        }
        ocorrenciasDao.finalizarInserts();
        logEtl.inserirLogEtl("200", String.format("Leitura do arquivo %s completa", nomeArquivo), "LeitorExcel");
    }

}
