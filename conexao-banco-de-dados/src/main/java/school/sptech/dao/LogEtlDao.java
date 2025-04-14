package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.LogEtl;

import java.time.LocalDateTime;
import java.util.List;

public class LogEtlDao {
        private final JdbcTemplate jdbcTemplate;

        public LogEtlDao(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public void inserirLogEtl(Integer idLog, String status, LocalDateTime dataHora, String detalhes, String classeQueOcorreu) {
            jdbcTemplate.update("INSERT INTO logEtl (status, dataHora, detalhes, classeQueOcorreu) VALUES (?, ?, ?, ?)",
                    status, dataHora, detalhes, classeQueOcorreu);
        }

        public List<LogEtl> findAll() {
            List<LogEtl> logs = jdbcTemplate.query(
                    "SELECT * FROM logEtl", new BeanPropertyRowMapper<>(LogEtl.class)
            );

            return logs;
        }
}
