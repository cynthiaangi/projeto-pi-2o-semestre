package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class DBConnectionProvider {
    public JdbcTemplate getJdbcTemplate() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(System.getenv("JAVA_URL"));
        basicDataSource.setUsername(System.getenv("JAVA_USERNAME"));
        basicDataSource.setPassword(System.getenv("JAVA_PASSWORD"));
        basicDataSource.setDriverClassName(System.getenv("JAVA_CLASS_NAME"));
        return new JdbcTemplate(basicDataSource);
    }
}
