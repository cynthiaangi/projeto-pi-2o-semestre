package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.apachePoi.LeitorExcel;
import school.sptech.dao.LogEtlDao;
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

public class Workbook{
    public static void apagarArquivos(LogEtl logEtl, String[] nomeArquivos) {
        for (String nomeArquivo : nomeArquivos) {
            Path caminhoGet = Path.of(nomeArquivo);

            if (Files.exists(caminhoGet)) {
                try {
                    // Deleta o arquivo
                    Files.delete(caminhoGet);
                } catch (IOException e) {
                    logEtl.inserirLogEtl("503", "Erro ao deletar o arquivo %s: %s %n".formatted(nomeArquivo, e.getMessage()), "Main");

                }
            }
        }
    }

    public static void main(String[] args) throws IOException, SQLException {
        // Inicializando o Log e a conexão do Log com BD
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate(); // conexão com o banco
        LogEtlDao logEltDao = new LogEtlDao(connection); // conexão com o banco para os logs
        LogEtl logEtl = new LogEtl(logEltDao);

        logEtl.inserirLogEtl("200", "Inicializado a aplicação Java de ETL", "Main");
        logEtl.inserirLogEtl("200", "Conectado com o Banco de Dados", "Main");

        String bucketNome = "bucket-immunodata"; // TO DO: Mudar para .env
        // String bucketName = System.getenv("BUCKET_NAME");
        S3Client s3Client = new school.sptech.S3Provider().getS3Client();

        // Lista dos nomes dos arquivos
        String[] nomeArquivos = {"cidades-sp.xlsx", "estadoSP_vacinas-19-22.xlsx", "estadoSP_vacinas-23-24.xlsx", "estadoSP_doencas.xlsx"};
        // Verificando se xlsx já estão presentes, e apagar
        apagarArquivos(logEtl, nomeArquivos);
        //Fazendo download dos arquivos do Bucket
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
                System.out.printf("Arquivo baixado: %s %n", arquivoS3.key());
            }
            logEtl.inserirLogEtl("200", "Arquivos baixados xlsx do S3", "Main");
        } catch (S3Exception e) {
            logEtl.inserirLogEtl("503", "Erro ao fazer download dos arquivos:%s %n".formatted(e.getMessage()), "Main");
        }

        // Inicializa a leitura dos arquivos
        for (String arquivoNome : nomeArquivos) {
            logEtl.inserirLogEtl("200", "Início da leitura do arquivo: %s %n".formatted(arquivoNome), "Main");

            // Inicializa métodos de leitura do arquivo
            LeitorExcel leitor = new LeitorExcel();
            leitor.extrairDados(logEtl, arquivoNome);
        }

        // Apaga os arquivos xlsx após execução do ETL
        apagarArquivos(logEtl, nomeArquivos);

        logEtl.inserirLogEtl("200", "Finalizado a aplicação Java de ETL", "Main");
    }
}

// Esse arquivo faz a conexão como banco de dados
// Configure as variaveis de ambiente no IntelliJ
// A pasta models é onde estão os objetos (tabelas do banco de dados que vamos usar)
// A pasta dao é onde estão os métodos que interajem com o banco de dados dos objetos
// O Workook é o executavel do projeto, ele é quem chama o LeitorExcel
// O LeitorExcel é quem extrai os dados do arquivos .xlsx e insere no banco de dados, juntamente com os logs
