package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Doencas;

import java.util.List;

public class DoencasDao {
    private final JdbcTemplate jdbcTemplate;

    public DoencasDao(JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }

    public Integer buscarIdDoenca(String nomeDoenca) {
        return jdbcTemplate.queryForObject("SELECT idDoenca FROM doencas WHERE nomeDoenca = ?", Integer.class, nomeDoenca);
    }

//    public Integer existsById(Integer idDoenca) {
//        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT idDoenca FROM doencas WHERE idDoenca = ?) AS ja_existe", Integer.class, idDoenca);
//    }
}
