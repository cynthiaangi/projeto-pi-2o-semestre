package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class LogEtlDao {
        private final JdbcTemplate jdbcTemplate;

        public LogEtlDao(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        // Insere os logs no banco de dados
        public void inserirLogBD(String dateTimeAgora, String status, String detalhes, String classeQueOcorreu) {
            // Insere log no banco de dados
            jdbcTemplate.
                    update("INSERT INTO logetl (status, dataHora, detalhes, classeQueOcorreu)" + " VALUES (?, ?, ?, ?)",
                    status, dateTimeAgora, detalhes, classeQueOcorreu);
        }
}
