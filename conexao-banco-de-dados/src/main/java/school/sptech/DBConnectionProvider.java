package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class DBConnectionProvider {
    public JdbcTemplate getJdbcTemplate() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(System.getenv("JAVA_URL"));
        System.out.println(System.getenv("JAVA_URL"));
        basicDataSource.setUsername(System.getenv("JAVA_USERNAME"));
        System.out.println(System.getenv("JAVA_USERNAME"));
        basicDataSource.setPassword(System.getenv("JAVA_PASSWORD"));
        System.out.println(System.getenv("JAVA_PASSWORD"));
        basicDataSource.setDriverClassName(System.getenv("JAVA_CLASS_NAME"));
        System.out.println(System.getenv("JAVA_CLASS_NAME"));
        return new JdbcTemplate(basicDataSource);
    }

    public JdbcTemplate getConnection() {
        return null;
    }
}
