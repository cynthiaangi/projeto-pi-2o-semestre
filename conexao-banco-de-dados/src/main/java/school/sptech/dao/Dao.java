package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public abstract class Dao {
    private final JdbcTemplate jdbcTemplate;

    protected Dao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void iniciarInserts() {
        jdbcTemplate.update("START TRANSACTION");
    }

    public void finalizarInserts() {
        jdbcTemplate.update("COMMIT");
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}
