package slack;

import org.json.JSONObject;
import software.amazon.ion.IonException;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject;

public class Slack {
    private static HttpClient client = HttpClient.newHttpClient(); //instanciando a requisição http
    private static final String url = "https://hooks.slack.com/services/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";

    public static void enviarMensagem(JSONObject content) throws IOException,InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                .header("accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(String.format("Status: %s", response.statusCode())); //descobrir o erro http
        System.out.println(String.format("Response: %s", response.body())); //alguns requests retornam um corpo, um json com todas as informações
    }
}
