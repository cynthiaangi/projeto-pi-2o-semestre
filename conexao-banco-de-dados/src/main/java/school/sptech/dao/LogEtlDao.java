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

        // Insere os logs no banco de dados
        public void inserirLogEtl(String status, String detalhes, String classeQueOcorreu) {
            jdbcTemplate.update("INSERT INTO logetl (status, dataHora, detalhes, classeQueOcorreu) VALUES (?, ?, ?, ?)",
                    status, LocalDateTime.now(), detalhes, classeQueOcorreu);
        }

        // Busca todos os logs
        public List<LogEtl> findAll() {
            List<LogEtl> logs = jdbcTemplate.query(
                    "SELECT * FROM logEtl", new BeanPropertyRowMapper<>(LogEtl.class)
            );

            return logs;
        }
}
