package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class DoencasDao {
    private final JdbcTemplate jdbcTemplate;

    public DoencasDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Integer buscarIdDoenca(String nomeDoenca) {
        return jdbcTemplate.queryForObject("SELECT idDoenca FROM doencas WHERE nomeDoenca = ?", Integer.class, nomeDoenca);
    }
}
