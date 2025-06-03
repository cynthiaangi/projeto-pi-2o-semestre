package school.sptech.transform;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.dao.DoencasDao;

import java.util.HashMap;

public abstract class Transform {
    protected DataFormatter formatter;
    protected String[] doencas;

    public abstract void conectarAoBanco(JdbcTemplate connection);

    public Transform () {
        this.formatter = new DataFormatter();
        this.doencas = new String[]{"Meningite", "Poliomielite", "Coqueluche"};
    }

    public Integer getFkDoenca(String nomeDoenca, DoencasDao doencasDao) {
        Integer id = doencasDao.buscarIdDoenca(nomeDoenca); // busca a doença pelo nome
        if (id != null) {
            return id; // retorna o ID da doença
        } else {
            // TODO: Adicionar log
            throw new RuntimeException("Doença não encontrada no banco: " + nomeDoenca);
        }
    }

    public HashMap<String, Integer> listarFkDoencas (DoencasDao doencasDao) {
        HashMap<String, Integer> hashFkDoencas = new HashMap<>();

        for (String doencaDaVez : doencas) {
            hashFkDoencas.put(doencaDaVez, getFkDoenca(doencaDaVez, doencasDao));
        }

        return hashFkDoencas;
    }

    public Long lerCodigoIbge(Row row) {
        String valorIbgeStr = formatter.formatCellValue(row.getCell(0)).trim();
        return Long.parseLong(valorIbgeStr);
    }
}
