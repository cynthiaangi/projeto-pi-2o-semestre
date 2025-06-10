package school.sptech.transform;

import org.apache.poi.ss.usermodel.*;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.dao.CidadesDao;
import school.sptech.utils.LogEtl;
import school.sptech.utils.Status;

public class CidadesTransform extends Transform {
    private CidadesDao cidadesDao;

    public CidadesTransform(LogEtl logEtl, JdbcTemplate connection) {
        super(logEtl, connection);
    }

    @Override
    public void conectarAoBanco() {
        this.cidadesDao = new CidadesDao(connection);
    }

    public void processarCidades(String nomeArquivo, Workbook workbook) {
        logEtl.inserirLogEtl(Status.S_200, String.format("Iniciando leitura do arquivo: %s", nomeArquivo) , "processarCidades", "CidadesTransform");

        conectarAoBanco();

        // Busca a primeira planilha do excel
        Sheet sheet = workbook.getSheetAt(0);

        cidadesDao.iniciarInserts();
        for (int i = 2; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            try {
                Long codigoIbge = lerCodigoIbge(row);

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
                // if (!cidadesDao.buscarPorId(codigoIbge)) {
                cidadesDao.inserirCidade(codigoIbge, nomeCidade, qtdPopulacional);
                //} else {
                    //logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao processar linha %s: Cidade já exist no banco", row.getRowNum()) ,"processarCidades", "CidadesTransform");

                //}
            } catch (Exception e) {
                logEtl.inserirLogEtl(Status.S_400, String.format("Erro ao processar linha %s: %s", row.getRowNum(), e.getMessage()),"processarCidades", "CidadesTransform");
            }
        }
        cidadesDao.finalizarInserts();

        logEtl.inserirLogEtl(Status.S_200, String.format("Leitura do arquivo %s completa", nomeArquivo), "processarCidades", "CidadesTransform");
    }
}
