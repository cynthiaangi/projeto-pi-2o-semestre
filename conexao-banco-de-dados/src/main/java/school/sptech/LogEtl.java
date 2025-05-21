package school.sptech;

// LOGS: 200 - OK; 201 - Criado; 204 sucesso mas sem resposta ou sem ação mas tudo bem;
// 400 - requisição mal formatada; 403 - acesso negado; 404 - recurso não encontrado
// 503 - serviço não encontrado; 500 - erro inesperado; 504 - timeout

import school.sptech.dao.LogEtlDao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LogEtl {
    private final LogEtlDao logEtlDao;

    public LogEtl(LogEtlDao logEtlDao) {
        this.logEtlDao = logEtlDao;
    }

    public void inserirLogEtl(String status, String detalhes, String classeQueOcorreu) {
        DateTimeFormatter formatoData = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String dateTimeAgora = LocalDateTime.now().format(formatoData);

        // Printa log no terminal
        System.out.printf("\n[LOG] [%s] [%s] - %s (%s)%n", status, dateTimeAgora, detalhes, classeQueOcorreu);

        // Insere log no banco de dados
        logEtlDao.inserirLogBD(dateTimeAgora, status, detalhes, classeQueOcorreu);
    }
}
