package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class DoencasDao extends Dao{

    public DoencasDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public Integer buscarIdDoenca(String nomeDoenca) {
        return getJdbcTemplate().queryForObject("SELECT idDoenca FROM doencas WHERE nomeDoenca = ?", Integer.class, nomeDoenca);
    }
}
