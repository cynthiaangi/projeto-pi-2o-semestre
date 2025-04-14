package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getConnection();

        //Inserindo alguns filmes

        connection.update("INSERT INTO cidades (codigoIbge, nome, qtdPopulacional) VALUES (?, ?, ?)",
                123486, "Osasco", 700.000);
    }
}