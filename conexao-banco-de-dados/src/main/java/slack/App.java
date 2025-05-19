package slack;

import org.json.JSONObject;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.io.IOException;

public class App {
    public static void main(String[] args) throws IOException, InterruptedException {
        JSONObject json = new JSONObject();

        json.put("text", "Olá, equipe :relaxed:");
        Slack.enviarMensagem(json);

    }
}
