package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;


public class DBConnectionProvider {
    public JdbcTemplate getJdbcTemplate() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl("jdbc:mysql://localhost:3306/immunodata");
        basicDataSource.setUsername("immuno");
        basicDataSource.setPassword("urubu100@");
        basicDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return new JdbcTemplate(basicDataSource);
    }

    public JdbcTemplate getConnection() {
        return null;
    }
}