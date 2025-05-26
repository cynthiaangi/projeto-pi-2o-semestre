package school.sptech.dao;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Cidades;


public class CidadesDao extends Dao{
    public CidadesDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    // insere as cidades no banco de dados
    public void inserirCidade(Long codigoIbge, String nomeCidade, Float qtdPopulacional) {
        String sql = "INSERT IGNORE INTO cidades (codigoIbge, nome, qtdPopulacional) VALUES (?, ?, ?)";
        getJdbcTemplate().update(sql, codigoIbge, nomeCidade, qtdPopulacional);
    }

    // busca a cidade pelo id (codigoIbge)
    public Cidades buscarPorId(Long codigoIbge) {
        // esse try trata o erro caso a cidade não seja encontrada
        try {
            String sql = "SELECT * FROM cidades WHERE codigoIbge = ?";
            return getJdbcTemplate().queryForObject(sql, new Object[]{codigoIbge}, new BeanPropertyRowMapper<>(Cidades.class));
        } catch (EmptyResultDataAccessException e) {
            return null; // Retorna null se a cidade não for encontrada
        }
    }
}