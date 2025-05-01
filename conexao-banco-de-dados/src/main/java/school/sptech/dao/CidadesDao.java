package school.sptech.dao;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.models.Cidades;

import java.util.List;

public class CidadesDao {

    private final JdbcTemplate jdbcTemplate;

    public CidadesDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // lista todas as cidades
    public List<Cidades> findAll(){
        List<Cidades> cidades = jdbcTemplate.query(
                "SELECT * FROM cidades", new BeanPropertyRowMapper<>(Cidades.class)
        );

        return cidades;
    }

    // insere as cidades no banco de dados
    public void inserirCidade(Long codigoIbge, String nomeCidade, Float qtdPopulacional) {
        String sql = "INSERT IGNORE INTO cidades (codigoIbge, nome, qtdPopulacional) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, codigoIbge, nomeCidade, qtdPopulacional);
    }

    // busca a cidade pelo id (codigoIbge)
    public Cidades buscarPorId(Long codigoIbge) {
        // esse try trata o erro caso a cidade não seja encontrada
        try {
            String sql = "SELECT * FROM cidades WHERE codigoIbge = ?";
            return jdbcTemplate.queryForObject(sql, new Object[]{codigoIbge}, new BeanPropertyRowMapper<>(Cidades.class));
        } catch (EmptyResultDataAccessException e) {
            return null; // Retorna null se a cidade não for encontrada
        }
    }

    public Integer buscarCodigoIbgePorNome(String nomeCidade) {
        try {
            String sql = "SELECT codigoIbge FROM cidades WHERE LOWER(nome) = LOWER(?)";
            return jdbcTemplate.queryForObject(sql, Integer.class, nomeCidade);
        } catch (EmptyResultDataAccessException e) {
            return null; // cidade não encontrada
        }
    }


}