package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class CasosDao extends Dao {
    public CasosDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public Boolean verificarCasoAnualInserido() {
        return getJdbcTemplate().queryForObject(
                "SELECT NOT EXISTS(SELECT 1 FROM casos)", Boolean.class);
    }

    public void inserirCasos(Integer fkDoenca, Long fkCidade, Integer anoReferencia, Integer quantidadeCasosNoAno) {
        getJdbcTemplate().update(
                "INSERT INTO casos (fkCasos_Doenca, fkCasos_Cidade, anoReferencia, quantidadeCasos) VALUES (?, ?, ?, ?)",
                fkDoenca, fkCidade, anoReferencia, quantidadeCasosNoAno
        );
    }
}
