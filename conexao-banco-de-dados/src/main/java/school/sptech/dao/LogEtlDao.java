package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class LogEtlDao extends Dao {

    public LogEtlDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void inserirLogBD(String dateTimeAgora, String status, String detalhes, String metodoQueOcorreu) {
            // Insere log no banco de dados
            getJdbcTemplate().
                    update("INSERT INTO logetl (status, dataHora, detalhes, metodoQueOcorreu)" + " VALUES (?, ?, ?, ?)",
                    status, dateTimeAgora, detalhes, metodoQueOcorreu);
        }
}
