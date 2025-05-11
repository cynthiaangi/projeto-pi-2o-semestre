package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LogEtlDao {
        private final JdbcTemplate jdbcTemplate;

        public LogEtlDao(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        // Insere os logs no banco de dados
        public void inserirLogEtl(String status, String detalhes, String classeQueOcorreu) {
            DateTimeFormatter formatoData = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String dateTimeAgora = LocalDateTime.now().format(formatoData);

            // Printa log no terminal
            System.out.printf("[LOG] [%s] [%s] - %s (%s)%n", status, dateTimeAgora, detalhes, classeQueOcorreu);

            // Insere log no banco de dados
            jdbcTemplate.
                    update("INSERT INTO logetl (status, dataHora, detalhes, classeQueOcorreu)" + " VALUES (?, ?, ?, ?)",
                    status, dateTimeAgora, detalhes, classeQueOcorreu);
        }
}
