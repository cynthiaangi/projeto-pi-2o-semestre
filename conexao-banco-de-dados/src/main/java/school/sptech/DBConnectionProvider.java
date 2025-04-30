package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;


public class DBConnectionProvider {
    public JdbcTemplate getJdbcTemplate() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl("jdbc:mysql://localhost:3306/immunodata");
        basicDataSource.setUsername("root");
        basicDataSource.setPassword("urubu100@");
        basicDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return new JdbcTemplate(basicDataSource);
    }

    public JdbcTemplate getConnection() {
        return null;
    }
}
//public class DBConnectionProvider {
//
//    private final JdbcTemplate jdbcTemplate;
//    private final BasicDataSource basicDataSource;
//
//    public DBConnectionProvider() {
//        BasicDataSource basicDataSource = new BasicDataSource();
//        basicDataSource.setUrl(System.getenv("DB_HOST"));
//        basicDataSource.setUsername(System.getenv("DB_USERNAME"));
//        basicDataSource.setPassword(System.getenv("DB_PASSWORD"));
//        basicDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//
//        this.basicDataSource = basicDataSource;
//        this.jdbcTemplate = new JdbcTemplate(basicDataSource);
//    }
//
//    public BasicDataSource getBasicDataSource() {
//        return basicDataSource;
//    }
//
//    public JdbcTemplate getJdbcTemplate(){ return jdbcTemplate; }
//}