package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class OcorrenciasDao {
    private final JdbcTemplate jdbcTemplate;

    public OcorrenciasDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void iniciarInserts() {
        jdbcTemplate.update("START TRANSACTION");
    }

    public void finalizarInserts() {
        jdbcTemplate.update("COMMIT");
    }

    public void inserirOcorrencia(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT IGNORE INTO ocorrencias (fkDoenca, fkCidade, anoReferencia, coberturaVacinal) VALUES (?, ?, ?, ?) ",
                fkDoenca, fkCidade, anoReferencia, coberturaVacinal);
    }

    public void inserirOcorrenciaMensal(Integer fkDoenca, Long fkCidade, String mesReferencia, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT IGNORE INTO ocorrencias (fkDoenca, fkCidade, mesReferencia, anoReferencia, coberturaVacinal) VALUES (?, ?, ?, ?, ?) ",
                fkDoenca, fkCidade, mesReferencia, anoReferencia, coberturaVacinal);
    }

    public void inserirCasos(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Integer quantidadeCasosNoAno) {
        jdbcTemplate.update(
                "INSERT IGNORE INTO casos (fkCasos_Doenca, fkCasos_Cidade, anoReferencia, quantidadeCasos) VALUES (?, ?, ?, ?)",
                fkDoenca, fkCidade, anoReferencia, quantidadeCasosNoAno
        );
    }

    public Boolean existsByFksAnual(Integer codigoIbge, Integer ano, Integer fkDoenca) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM ocorrencias WHERE fkCidade = ? AND anoReferencia = ? AND fkDoenca = ?) ",
                Boolean.class, codigoIbge, ano, fkDoenca
        );
    }

    public Boolean existsByFksMensal(Long codigoIbge, String mesReferencia, Integer anoReferencia, Integer fkDoenca) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM ocorrencias WHERE fkCidade = ? AND mesReferencia = ? AND anoReferencia = ? AND fkDoenca = ?)",
                Boolean.class, codigoIbge, mesReferencia, anoReferencia, fkDoenca
        );
    }

    public Boolean verificarCasoAnualInserido() {
        return jdbcTemplate.queryForObject(
                "SELECT NOT EXISTS(SELECT 1 FROM casos)", Boolean.class);
    }
}