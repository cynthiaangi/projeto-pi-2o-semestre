package school.sptech.models;

public class Cidades {

    public Integer codigoIbge;
    public String nome;
    public Float qtdPopulacional;

    public Cidades() {
    }

    public Cidades(Integer codigoIbge, String nome, Float qtdPopulacional) {
        this.codigoIbge = codigoIbge;
        this.nome = nome;
        this.qtdPopulacional = qtdPopulacional;
    }

    public Integer getCodigoIbge() {
        return codigoIbge;
    }

    public void setCodigoIbge(Integer codigoIbge) {
        this.codigoIbge = codigoIbge;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Float getQtdPopulacional() {
        return qtdPopulacional;
    }

    public void setQtdPopulacional(Float qtdPopulacional) {
        this.qtdPopulacional = qtdPopulacional;
    }

    @Override
    public String toString() {
        return "Cidades{" +
                "codigoIbge=" + codigoIbge +
                ", nome='" + nome + '\'' +
                ", qtdPopulacional=" + qtdPopulacional +
                '}';
    }
}

