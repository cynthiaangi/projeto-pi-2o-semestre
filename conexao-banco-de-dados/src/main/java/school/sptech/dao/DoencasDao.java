package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Doencas;

import java.util.List;

public class DoencasDao {
    private final JdbcTemplate jdbcTemplate;

//    public DoencasDao(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }

    public DoencasDao(JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }

    public void inserirDoenca(Integer idDoenca, String nome, String descricao) {
        jdbcTemplate.update("INSERT INTO doencas (nomeDoenca, nomeVacina) VALUES (?, ?)",
                nome, descricao);
    }

    public List<Doencas> findAll() {
        List<Doencas> doencas = jdbcTemplate.query(
                "SELECT * FROM doencas", new BeanPropertyRowMapper<>(Doencas.class)
        );

        return doencas;
    }

    public Integer existsById(Integer idDoenca) {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT idDoenca FROM doencas WHERE idDoenca = ?) AS ja_existe", Integer.class, idDoenca);
    }
}
