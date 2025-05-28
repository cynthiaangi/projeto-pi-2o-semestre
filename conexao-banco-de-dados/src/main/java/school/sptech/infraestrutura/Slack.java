package school.sptech.infraestrutura;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.h2.util.json.JSONObject;

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

        System.out.println(String.format("Status: %s", response.statusCode())); //descobrir o erro http
        System.out.println(String.format("Response: %s", response.body())); //alguns requests retornam um corpo, um json com todas as informações
    }
}
