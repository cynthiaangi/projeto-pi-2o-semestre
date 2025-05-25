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

    // Insere as ocorrências no banco de dados
    public void inserirOcorrencia(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT IGNORE INTO ocorrencias (fkDoenca, fkCidade, anoReferencia, coberturaVacinal) VALUES (?, ?, ?, ?) ",
                fkDoenca, fkCidade, anoReferencia, coberturaVacinal);
    }

    public void inserirOcorrenciaMensal(Integer fkDoenca, Long fkCidade, String mesReferencia, Integer anoReferencia, Double coberturaVacinal) {
        jdbcTemplate.update("INSERT IGNORE INTO ocorrencias (fkDoenca, fkCidade, mesReferencia, anoReferencia, coberturaVacinal) VALUES (?, ?, ?, ?, ?) ",
                fkDoenca, fkCidade, mesReferencia, anoReferencia, coberturaVacinal);
    }

    // atualiza os casos no banco de dados caso já exista
    public void inserirCasos(Integer fkDoenca, Integer fkCidade, Integer anoReferencia, Integer quantidadeCasosNoAno) {
        jdbcTemplate.update(
                "INSERT IGNORE INTO casos SET (fkCasos_Doenca, fkCasos_Cidade, anoReferencia, quantidadeCasos)",
                fkDoenca, fkCidade, anoReferencia, quantidadeCasosNoAno
        );
    }

    // busca 1 ocorrência pelos campos fkDoenca, fkCidade e anoReferencia
    public Boolean existsByFksAnual(Integer codigoIbge, Integer ano, Integer fkDoenca) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM ocorrencias WHERE fkCidade = ? AND anoReferencia = ? AND fkDoenca = ?) ",
                Boolean.class, codigoIbge, ano, fkDoenca
        );
    }

    // busca 1 ocorrência pelos campos fkDoenca, fkCidade, mesReferencia e anoReferencia
    public Boolean existsByFksMensal(Long codigoIbge, String mesReferencia, Integer anoReferencia, Integer fkDoenca) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM ocorrencias WHERE fkCidade = ? AND mesReferencia = ? AND anoReferencia = ? AND fkDoenca = ?)",
                Boolean.class, codigoIbge, mesReferencia, anoReferencia, fkDoenca
        );
    }

    public Boolean verificarCasoAnualInserido() {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT 1 FROM casos WHERE quantidadeCasos IS NULL)", Boolean.class);
    }

}