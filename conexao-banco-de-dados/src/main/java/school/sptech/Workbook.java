package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.apachePoi.LeitorExcel;
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
import java.sql.SQLException;
import java.util.List;

import static school.sptech.LogEtl.iniciarLog;

public class Workbook{
    public static LogEtl iniciarAplicacaoJava(JdbcTemplate connection) {
        LogEtl logEtl = iniciarLog(connection);

        return logEtl;
    }

    public static JdbcTemplate conectarBanco () {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        return connection;
    }

    public static void apagarArquivosAntigos(LogEtl logEtl, String[] nomeArquivos) {
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
        S3Client s3Client = new school.sptech.S3Provider().getS3Client();
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

    public static void executarProcessoETL(LogEtl logEtl, String[] nomeArquivos) {
        for (String arquivoNome : nomeArquivos) {
            logEtl.inserirLogEtl("200", "Início da leitura do arquivo: %s %n".formatted(arquivoNome), "Main.executarProcessoETL");

            // Inicializa métodos de leitura do arquivo
            LeitorExcel leitor = new LeitorExcel();
            leitor.extrairDados(logEtl, arquivoNome);
        }
    }

    public static void finalizarAplicacaoJava(LogEtl logEtl) {
        logEtl.encerrarLog();
    }

    public static void main(String[] args) throws IOException, SQLException {
        // Arquivos que serão extraídos
        String[] nomeArquivos = {"cidades-sp.xlsx", "estadoSP_vacinas-19-22.xlsx", "estadoSP_vacinas-23-24.xlsx", "estadoSP_doencas.xlsx"};

        // Conexão com o Banco de Dados
        JdbcTemplate connection = conectarBanco();

        // Inicializa a aplicação Java
        LogEtl logEtl = iniciarAplicacaoJava(connection);
        logEtl.inserirLogEtl("200", "Inicializado a aplicação Java de ETL", "Main");
        logEtl.inserirLogEtl("200", "Conectado com o Banco de Dados", "Main");

        // Apagar arquivos antigos remanescentes
        apagarArquivosAntigos(logEtl, nomeArquivos);

        //Fazendo download dos arquivos do Bucket
        baixarArquivosParaExtracao(logEtl);
        logEtl.inserirLogEtl("200", "Arquivos baixados xlsx do S3", "Main");

        // Executa o processo de ETL
        logEtl.inserirLogEtl("200", "Inicializado processo de ETL", "Main");
        executarProcessoETL(logEtl, nomeArquivos);
        logEtl.inserirLogEtl("200", "Finalizado processo de ETL", "Main");

        // Apaga os arquivos xlsx após execução do ETL
        apagarArquivosAntigos(logEtl, nomeArquivos);

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
