package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.apachePoi.LeitorExcel;
import school.sptech.infraestrutura.DBConnectionProvider;
import school.sptech.infraestrutura.S3Provider;
import school.sptech.utils.LogEtl;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static school.sptech.utils.LogEtl.iniciarLog;

public class Main {
    public static LogEtl iniciarAplicacaoJava(JdbcTemplate connection) {
        LogEtl logEtl = iniciarLog(connection);

        return logEtl;
    }

    public static JdbcTemplate conectarBanco () {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        return connection;
    }

    public static void apagarArquivosRemanescentes(LogEtl logEtl, String[] nomeArquivos) {
        for (String nomeArquivo : nomeArquivos) {
            Path caminhoGet = Path.of(nomeArquivo);

            if (Files.exists(caminhoGet)) {
                try {
                    // Deleta o arquivo
                    Files.delete(caminhoGet);
                } catch (IOException e) {
                    logEtl.inserirLogEtl("503", "Erro ao deletar o arquivo %s: %s %n".formatted(nomeArquivo, e.getMessage()), "Main.apagarArquivosAntigos");
                }
            }
        }
    }

    public static void baixarArquivosParaExtracao(LogEtl logEtl) {
        S3Client s3Client = new S3Provider().getS3Client();
        String bucketNome = System.getenv("BUCKET_NAME");

        try {
            // Lista de arquivos no S3
            List<S3Object> arquivos = s3Client.listObjects(ListObjectsRequest.builder().bucket(bucketNome).build()).contents();
            for (S3Object arquivoS3 : arquivos) {
                // Constroi requisição para buscar o arquivo
                GetObjectRequest requisicaoArquivo = GetObjectRequest.builder()
                        .bucket(bucketNome)
                        .key(arquivoS3.key())
                        .build();

                // Busca o arquivo S3 com base na requisição
                s3Client.getObject(requisicaoArquivo, ResponseTransformer.toFile(new File(arquivoS3.key())));
                logEtl.inserirLogEtl("200", "Arquivo baixado: %s %n".formatted(arquivoS3.key()), "Main.baixarArquivosParaExtracao");
            }
        } catch (S3Exception e) {
            logEtl.inserirLogEtl("503", "Erro ao fazer download dos arquivos:%s %n".formatted(e.getMessage()), "Main.baixarArquivosParaExtracao");
            throw new RuntimeException("Erro ao fazer download dos arquivos:%s %n".formatted(e.getMessage()));
        }
    }

    public static void executarProcessoETL(LogEtl logEtl, JdbcTemplate connection, String[] nomeArquivos) {
        LeitorExcel leitor = new LeitorExcel();
        leitor.extrairDados(logEtl, connection, nomeArquivos);
    }

    public static void finalizarAplicacaoJava(LogEtl logEtl) throws IOException, InterruptedException {
        logEtl.encerrarLog();
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        // Arquivos que serão extraídos
        String[] nomeArquivos = {"cidades-sp.xlsx", "estadoSP_vacinas-19-22.xlsx", "estadoSP_vacinas-23-24.xlsx", "estadoSP_doencas.xlsx"};

        // Conexão com o Banco de Dados
        JdbcTemplate connection = conectarBanco();

        // Inicializa a aplicação Java
        LogEtl logEtl = iniciarAplicacaoJava(connection);
        logEtl.inserirLogEtl("200", "Inicializado a aplicação Java de ETL", "Main");
        logEtl.inserirLogEtl("200", "Conectado com o Banco de Dados", "Main");

        // Apagar arquivos antigos remanescentes
        apagarArquivosRemanescentes(logEtl, nomeArquivos);

        //Fazendo download dos arquivos do Bucket
        baixarArquivosParaExtracao(logEtl);
        logEtl.inserirLogEtl("200", "Arquivos baixados xlsx do S3", "Main");

        // Executa o processo de ETL
        logEtl.inserirLogEtl("200", "Inicializado processo de ETL", "Main");
        executarProcessoETL(logEtl, connection, nomeArquivos);
        logEtl.inserirLogEtl("200", "Finalizado processo de ETL", "Main");

        // Apaga os arquivos xlsx após execução do ETL
        apagarArquivosRemanescentes(logEtl, nomeArquivos);

        // Finaliza a aplicação Java
        logEtl.inserirLogEtl("200", "Finalizado a aplicação Java de ETL", "Main");
        finalizarAplicacaoJava(logEtl);
    }
}

// Esse arquivo faz a conexão como banco de dados
// Configure as variaveis de ambiente no IntelliJ
// A pasta models é onde estão os objetos (tabelas do banco de dados que vamos usar)
// A pasta dao é onde estão os métodos que interajem com o banco de dados dos objetos
// O Workook é o executavel do projeto, ele é quem chama o LeitorExcel
// O LeitorExcel é quem extrai os dados do arquivos .xlsx e insere no banco de dados, juntamente com os logs
