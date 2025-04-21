package school.sptech.models;

public class Ocorrencias {

    public Integer idOcorrencia;
    public Integer fkDoenca;
    public Long fkCidade;
    public String mesReferencia;
    public Integer anoReferencia;
    public Integer quantidadeCasos;
    public Double coberturaVacinal;

    public Ocorrencias() {
    }

    public Ocorrencias(Integer idOcorrencia, Integer fkDoenca, Long fkCidade, String mesReferencia, Integer anoReferencia, Integer quantidadeCasos, Double coberturaVacinal) {
        this.idOcorrencia = idOcorrencia;
        this.fkDoenca = fkDoenca;
        this.fkCidade = fkCidade;
        this.mesReferencia = mesReferencia;
        this.anoReferencia = anoReferencia;
        this.quantidadeCasos = quantidadeCasos;
        this.coberturaVacinal = coberturaVacinal;
    }

    public Integer getFkDoenca() {
        return fkDoenca;
    }

    public void setFkDoenca(Integer fkDoenca) {
        this.fkDoenca = fkDoenca;
    }

    public Long getFkCidade() {
        return fkCidade;
    }

    public void setFkCidade(Long fkCidade) {
        this.fkCidade = fkCidade;
    }

    public String getMesReferencia() { return mesReferencia;}

    public void setMesReferencia(String mesReferencia) { this.mesReferencia = mesReferencia;}

    public Integer getAnoReferencia() {
        return anoReferencia;
    }

    public void setAnoReferencia(Integer anoReferencia) {
        this.anoReferencia = anoReferencia;
    }

    public Integer getQuantidadeCasos() {
        return quantidadeCasos;
    }

    public void setQuantidadeCasos(Integer quantidadeCasos) {
        this.quantidadeCasos = quantidadeCasos;
    }

    public Double getCoberturaVacinal() {
        return coberturaVacinal;
    }

    public void setCoberturaVacinal(Double coberturaVacinal) {
        this.coberturaVacinal = coberturaVacinal;
    }

    public Integer getIdOcorrencia() {
        return idOcorrencia;
    }

    public void setIdOcorrencia(Integer idOcorrencia) {
        this.idOcorrencia = idOcorrencia;
    }

    @Override
    public String toString() {
        return "Ocorrencias{" +
                "idOcorrencia=" + idOcorrencia +
                ", fkDoenca=" + fkDoenca +
                ", fkCidade=" + fkCidade +
                ", mesReferencia='" + mesReferencia +
                ", anoReferencia=" + anoReferencia +
                ", quantidadeCasos=" + quantidadeCasos +
                ", coberturaVacinal=" + coberturaVacinal +
                '}';
    }
}
