package school.sptech.models;

import org.springframework.jdbc.core.JdbcTemplate;

public class Doencas {
    // essa classe só é usada para buscar os dados do banco
    // não é inserido nada no banco

    public Integer idDoenca;
    public String nomeDoenca;
    public String nomeVacina;

    public Doencas() {
    }

    public Doencas(Integer idDoenca, String nomeDoenca, String nomeVacina) {
        this.idDoenca = idDoenca;
        this.nomeDoenca = nomeDoenca;
        this.nomeVacina = nomeVacina;
    }

    public Doencas(JdbcTemplate connection) {
    }

    public Integer getIdDoenca() {
        return idDoenca;
    }

    public void setIdDoenca(Integer idDoenca) {
        this.idDoenca = idDoenca;
    }

    public String getNomeDoenca() {
        return nomeDoenca;
    }

    public void setNomeDoenca(String nomeDoenca) {
        this.nomeDoenca = nomeDoenca;
    }

    public String getNomeVacina() {
        return nomeVacina;
    }

    public void setNomeVacina(String nomeVacina) {
        this.nomeVacina = nomeVacina;
    }

    @Override
    public String toString() {
        return "Doencas{" +
                "idDoenca=" + idDoenca +
                ", nomeDoenca='" + nomeDoenca + '\'' +
                ", nomeVacina='" + nomeVacina + '\'' +
                '}';
    }
}
