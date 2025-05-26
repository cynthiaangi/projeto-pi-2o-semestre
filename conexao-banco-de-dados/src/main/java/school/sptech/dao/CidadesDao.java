package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;


public class CidadesDao extends Dao{
    public CidadesDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    // insere as cidades no banco de dados
    public void inserirCidade(Long codigoIbge, String nomeCidade, Float qtdPopulacional) {
        getJdbcTemplate().update("INSERT IGNORE INTO cidades (codigoIbge, nome, qtdPopulacional) VALUES (?, ?, ?)", codigoIbge, nomeCidade, qtdPopulacional);
    }


    public Boolean buscarPorId(Long codigoIbge) {
        try {
            return getJdbcTemplate().queryForObject("SELECT 1 FROM cidades WHERE codigoIbge = ?", Boolean.class, codigoIbge);
        } catch (Exception e) {
            return null;
        }
    }
}