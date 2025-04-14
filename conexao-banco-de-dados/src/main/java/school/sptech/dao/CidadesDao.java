package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Cidades;

import java.util.List;

public class CidadesDao {

    private final JdbcTemplate jdbcTemplate;

    public CidadesDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Cidades> findAll(){
        List<Cidades> cidades = jdbcTemplate.query(
                "SELECT * FROM cidades", new BeanPropertyRowMapper<>(Cidades.class)
        );

        return cidades;
    }

    public void inserirCidade (Integer codigoIbge, String nome, Double qtdPopulacional){
        jdbcTemplate.update("INSERT INTO cidades (codigoIbge, nome, qtdPopulacional) VALUES (?, ?, ?)," +
                " codigoIbge, nome, qtdPopulacional");

    }

    public Cidades existsById(Integer codigoIbge) {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT codigoIbge FROM cidades WHERE codigoIbge = ?) AS ja_existe", Cidades.class, codigoIbge);
    }
}