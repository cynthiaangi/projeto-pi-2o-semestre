package school.sptech;

import school.sptech.apachePoi.LeitorExcel;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Workbook{
    public static void main(String[] args) throws IOException, SQLException {
        String bucketNome = "bucket-immunodata"; // TO DO: Mudar para .env
        // String bucketName = System.getenv("BUCKET_NAME");
        S3Client s3Client = new school.sptech.S3Provider().getS3Client();

        // Lista dos nomes dos arquivos
        String[] nomeArquivos = {"cidades-sp.xlsx", "estadoSP_vacinas-19-22.xlsx", "estadoSP_vacinas-23-24.xlsx", "estadoSP_doencas.xlsx"};

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
        } catch (S3Exception e) {
            System.err.printf("Erro ao fazer download dos arquivos:%s %n", e.getMessage());
        }

        // Inicializa a leitura dos arquivos
        for (String arquivoNome : nomeArquivos) {
            System.out.printf("Início da leitura do arquivo: %s %n", arquivoNome);

            // Inicializa métodos de leitura do arquivo
            LeitorExcel leitor = new LeitorExcel();

            leitor.extrairDados(arquivoNome);

            // Fecha arquivo após leitura
            //arquivoLocal.close(); - C01 Provavelmente apagar
        }

        // Apaga os arquivos xlsx após execução do ETL
        for (String nomeArquivo : nomeArquivos) {
            Path caminhoGet = Path.of(nomeArquivo);

            if (Files.exists(caminhoGet)) {
                try {
                    // Deleta o arquivo
                    Files.delete(caminhoGet);
                    System.out.printf("Arquivo %s deletado com sucesso!%n", nomeArquivo);
                } catch (IOException e) {
                    System.out.printf("Erro ao deletar o arquivo %s: %s %n", nomeArquivo, e.getMessage());
                }
            }
        }

        // Esse arquivo faz a conexão como banco de dados
        // Configure as variaveis de ambiente no IntelliJ
        // A pasta models é onde estão os objetos (tabelas do banco de dados que vamos usar)
        // A pasta dao é onde estão os métodos que interajem com o banco de dados dos objetos
        // O Workook é o executavel do projeto, ele é quem chama o LeitorExcel
        // O LeitorExcel é quem extrai os dados do arquivos .xlsx e insere no banco de dados, juntamente com os logs
    }
}
