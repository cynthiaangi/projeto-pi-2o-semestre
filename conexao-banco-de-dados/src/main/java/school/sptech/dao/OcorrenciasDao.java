package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Ocorrencias;

public class OcorrenciasDao {
    private final JdbcTemplate jdbcTemplate;

    public OcorrenciasDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Insere as ocorrências no banco de dados
    public void inserirOcorrencia(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT INTO ocorrencias (fkDoenca, fkCidade, anoReferencia, coberturaVacinal) VALUES (?, ?, ?, ?) ",
                fkDoenca, fkCidade, anoReferencia, coberturaVacinal);
    }

    // busca todas as ocorrências
    public void findAll() {
        jdbcTemplate.query("SELECT * FROM ocorrencias", new BeanPropertyRowMapper<>(Ocorrencias.class));

    }

    // busca 1 ocorrência pelos campos fkDoenca, fkCidade e anoReferencia
    public Integer existsByFks(int codigoIbge, int ano, int fkDoenca) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM ocorrencias WHERE fkCidade = ? AND anoReferencia = ? AND fkDoenca = ?) AS existe",
                Integer.class, codigoIbge, ano, fkDoenca
        );
    }
}