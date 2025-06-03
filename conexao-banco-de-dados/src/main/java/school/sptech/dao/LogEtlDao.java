package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.utils.Status;

public class LogEtlDao extends Dao {

    public LogEtlDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void inserirLogBD(String dateTimeAgora, String status, String detalhes, String metodoQueOcorreu, String classeQueOcorreu, String idDaExecucaoEtl) {
            // Insere log no banco de dados
            getJdbcTemplate().
                    update("INSERT INTO logetl (status, dataHora, detalhes, metodoQueOcorreu, classeQueOcorreu, idDaExecucaoEtl)" + " VALUES (?, ?, ?, ?, ?, ?)",
                    status, dateTimeAgora, detalhes, metodoQueOcorreu, classeQueOcorreu, idDaExecucaoEtl);
        }
}
