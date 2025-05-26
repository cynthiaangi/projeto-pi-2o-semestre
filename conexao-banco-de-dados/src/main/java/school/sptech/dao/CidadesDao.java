package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;


public class CidadesDao extends Dao{
    public CidadesDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    // insere as cidades no banco de dados
    public void inserirCidade(Long codigoIbge, String nomeCidade, Float qtdPopulacional) {
        String sql = "INSERT IGNORE INTO cidades (codigoIbge, nome, qtdPopulacional) VALUES (?, ?, ?)";
        getJdbcTemplate().update(sql, codigoIbge, nomeCidade, qtdPopulacional);
    }
}