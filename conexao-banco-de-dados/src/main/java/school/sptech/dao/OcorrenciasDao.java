package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Ocorrencias;

public class OcorrenciasDao {
    private final JdbcTemplate jdbcTemplate;

    public OcorrenciasDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void inserirOcorrencia(Integer fkCidade, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT INTO ocorrencias (fkCidade, anoReferencia, coberturaVacinal) VALUES (?, ?, ?), ",
                fkCidade, anoReferencia, coberturaVacinal);
    }

    public void findAll() {
        jdbcTemplate.query("SELECT * FROM ocorrencias", new BeanPropertyRowMapper<>(Ocorrencias.class));

    }

    public Integer existsByFks(Integer fkCidade, Integer anoReferencia) {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT idOcorrencia FROM ocorrencias WHERE fkCidade = ? and anoReferencia = ?) AS ja_existe", Integer.class, fkCidade, anoReferencia);
    }
}