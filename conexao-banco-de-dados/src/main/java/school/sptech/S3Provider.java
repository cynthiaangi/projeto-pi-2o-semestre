package school.sptech;

import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

public class S3Provider {
    //private final AwsSessionCredentials credentials;

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }

    //public S3Provider() {
    //    this.credentials = AwsSessionCredentials.create(
    //            // Buscar as variáveis de ambiente na instância para poder acessar o S3
    //            System.getenv("AWS_ACCESS_KEY_ID"),
    //            System.getenv("AWS_SECRET_ACCESS_KEY"),
    //            System.getenv("AWS_SESSION_TOKEN")
    //    );
    //}

    //public S3Client getS3Client() {
    //    return S3Client.builder()
    //            .region(Region.US_EAST_1)
    //            .credentialsProvider(() -> credentials)
    //            // .credentialsProvider(DefaultCredentialsProvider.create()) - Metodo para buscar variaveis de ambiente
     //           .build();
    //}
}
