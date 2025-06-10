package school.sptech.utils;

// LOGS: 200 - OK; 201 - Criado; 204 sucesso mas sem resposta ou sem ação mas tudo bem;
// 400 - requisição mal formatada; 403 - acesso negado; 404 - recurso não encontrado
// 503 - serviço não encontrado; 500 - erro inesperado; 504 - timeout

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.dao.LogEtlDao;
import school.sptech.infraestrutura.Slack;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LogEtl {
    private final LogEtlDao logEtlDao;
    private final DateTimeFormatter formatoHorarioLog;
    private final LocalDateTime horarioInicio;
    private final String idExecucao;

    private LogEtl(LogEtlDao logEtlDao, DateTimeFormatter formatoHorarioLog, LocalDateTime horarioInicio, String idExecucao) {
        this.logEtlDao = logEtlDao;
        this.formatoHorarioLog = formatoHorarioLog;
        this.horarioInicio = horarioInicio;
        this.idExecucao = idExecucao;
    }

    public void inserirLogEtl(Status status, String detalhes, String metodoQueOcorreu, String classeQueOcorreu) {

        String dateTimeAgora = LocalDateTime.now().format(formatoHorarioLog);
        String statusNumero = status.getNumero();

        // Printa log no terminal
        System.out.printf("\n[%s] [%s] - %s (%s) - %s%n", statusNumero, dateTimeAgora, detalhes, metodoQueOcorreu, classeQueOcorreu, this.idExecucao);

        // Insere log no banco de dados
        logEtlDao.inserirLogBD(statusNumero, dateTimeAgora, detalhes, metodoQueOcorreu, classeQueOcorreu, idExecucao);
    }

    public static String criarIdExecucao(LocalDateTime horarioInicio) {
        DateTimeFormatter formatoDataIdExecucao = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        String idExecucao = "J" + horarioInicio.format(formatoDataIdExecucao);

        return idExecucao;
    }

    public static LogEtl iniciarLog(JdbcTemplate connection) {
        LogEtlDao logEtlDao = new LogEtlDao(connection); // Conecta o log com o Banco
        LocalDateTime horarioInicio = LocalDateTime.now(); // Busca horario de início do processo de ETL
        DateTimeFormatter formatoHorarioLog = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // Usa o horario de início para criar um id para a execução do Java: J + horarioInicio
        String idExecucao = criarIdExecucao(horarioInicio);

        // Instancia o log
        LogEtl logEtl = new LogEtl(logEtlDao, formatoHorarioLog, horarioInicio, idExecucao);

        return logEtl;
    }

    public String calcularTempoExecucao(LocalDateTime horarioFim) {
        Duration tempoDeExecucao = Duration.between(this.horarioInicio, horarioFim);

        long minutos = tempoDeExecucao.toMinutes();
        long segundos = tempoDeExecucao.getSeconds() % 60;

        return "%02dm %02ds".formatted(minutos, segundos);
    }

    public void encerrarLog() throws IOException, InterruptedException {
        LocalDateTime horarioFim = LocalDateTime.now();

        Slack slack = new Slack();

        String textoTempoDeExecucao = this.calcularTempoExecucao(horarioFim);

        slack.enviarMensagem("Base de dados atualizada com sucesso!");
        slack.enviarMensagem(String.format("Tempo total de execução: %s%n", textoTempoDeExecucao));
        //System.out.println("Base de dados atualizada com sucesso!");
        //System.out.println("Tempo total de execução: %s%n".formatted(textoTempoDeExecucao));
    }
}