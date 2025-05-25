package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class DBConnectionProvider {
    public JdbcTemplate getJdbcTemplate() {
        System.out.println(System.getenv("MYSQL_URL"));
        System.out.println(System.getenv("MYSQL_USERNAME"));
        System.out.println(System.getenv("MYSQL_PASSWORD"));
        System.out.println(System.getenv("MYSQL_CLASS_NAME"));
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(System.getenv("MYSQL_URL"));
        basicDataSource.setUsername(System.getenv("MYSQL_USERNAME"));
        basicDataSource.setPassword(System.getenv("MYSQL_PASSWORD"));
        basicDataSource.setDriverClassName(System.getenv("MYSQL_CLASS_NAME"));
        return new JdbcTemplate(basicDataSource);
    }
}
