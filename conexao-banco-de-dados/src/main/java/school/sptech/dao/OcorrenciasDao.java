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

    public void inserirOcorrenciaMensal(Integer fkDoenca, Long fkCidade, String mesReferencia, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT INTO ocorrencias (fkDoenca, fkCidade, mesReferencia, anoReferencia, coberturaVacinal) VALUES (?, ?, ?, ?, ?) ",
                fkDoenca, fkCidade, mesReferencia, anoReferencia, coberturaVacinal);
    }

    //inserindo casos no banco de dadoskkkk
    public void inserirCasos(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Integer quantidadeCasos) {
        jdbcTemplate.update("UPDATE ocorrencias SET quantidadeCasos = ? WHERE fkDoenca = ? AND fkCidade = ? AND anoReferencia = ?",
                quantidadeCasos, fkDoenca, fkCidade, anoReferencia);
    }

    //verificando se é isso mesmo
    public void atualizarCasos(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Integer quantidadeCasos) {
        jdbcTemplate.update(
                "UPDATE ocorrencias SET quantidadeCasos = ? WHERE fkDoenca = ? AND fkCidade = ? AND anoReferencia = ?",
                quantidadeCasos, fkDoenca, fkCidade, anoReferencia
        );
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

    public Boolean existsByFksMensal(Long codigoIbge, String mesReferencia, int anoReferencia, int fkDoenca) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM ocorrencias WHERE fkCidade = ? AND mesReferencia = ? AND anoReferencia = ? AND fkDoenca = ?) AS existe2",
                Boolean.class, codigoIbge, mesReferencia, anoReferencia, fkDoenca
        );
    }

}