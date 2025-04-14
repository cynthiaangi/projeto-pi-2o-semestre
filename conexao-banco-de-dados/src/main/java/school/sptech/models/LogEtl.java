package school.sptech.models;

import java.time.LocalDateTime;

public class LogEtl {
    public Integer idLog;
    public String status;
    public LocalDateTime dataHora;
    public String detalhes;
    public String classeQueOcorreu;

    public LogEtl() {
    }

    public LogEtl(Integer idLog, String status, LocalDateTime dataHora, String detalhes, String classeQueOcorreu) {
        this.idLog = idLog;
        this.status = status;
        this.dataHora = dataHora;
        this.detalhes = detalhes;
        this.classeQueOcorreu = classeQueOcorreu;
    }

    public Integer getIdLog() {
        return idLog;
    }

    public void setIdLog(Integer idLog) {
        this.idLog = idLog;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getDetalhes() {
        return detalhes;
    }

    public void setDetalhes(String detalhes) {
        this.detalhes = detalhes;
    }

    public String getClasseQueOcorreu() {
        return classeQueOcorreu;
    }

    public void setClasseQueOcorreu(String classeQueOcorreu) {
        this.classeQueOcorreu = classeQueOcorreu;
    }

    @Override
    public String toString() {
        return "LogEtl{" +
                "idLog=" + idLog +
                ", status='" + status + '\'' +
                ", dataHora=" + dataHora +
                ", detalhes='" + detalhes + '\'' +
                ", classeQueOcorreu='" + classeQueOcorreu + '\'' +
                '}';
    }
}
