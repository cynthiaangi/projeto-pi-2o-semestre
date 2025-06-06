package school.sptech.infraestrutura;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Slack {

    public void enviarMensagem(String mensagem) throws IOException,InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        String url = System.getenv("SLACK_URL");

        String jsonMensagem = String.format("{\"text\":\"%s\"}", mensagem.replace("\"", "\\\""));
        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                .header("accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonMensagem))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(String.format("Envio mensagem Slack - Status: %s", response.statusCode()));
    }
}
