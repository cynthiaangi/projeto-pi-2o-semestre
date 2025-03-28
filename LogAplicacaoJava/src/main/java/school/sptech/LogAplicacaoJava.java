package school.sptech;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class LogAplicacaoJava {
        public static void main(String[] args) {
            Scanner leitor = new Scanner(System.in);
            String dataHora = "";

            String login = "immuno@data.com";
            String password = "123456";
            Integer id = 1000;

            System.out.println("Login: ");
            String entrada = leitor.nextLine();

            System.out.println("Senha: ");
            String senha = leitor.nextLine();

            if (login.equals(entrada) && password.equals(senha)) {
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " - " + "Iniciando o programa.");
            } else {
                System.out.println("Login ou senha incorretos. Tente novamente.");
            }

            System.out.println("Deseja acessar Dashboard? (S/N)");
            String dash = leitor.nextLine();

            if (dash.equals("S") || dash.equals("s")) {
                System.out.println("Digite sua matrícula: ");
                String matricula = leitor.nextLine();
                if (matricula.equals(id.toString())) {
                    dataHora = obterDataHoraAtual();
                    System.out.println(dataHora + " - " + "Acesso à Dashbard liberado!");
                } else {
                    dataHora = obterDataHoraAtual();
                    System.out.println(dataHora + "Acesso negado!");
                }
            } else {
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " - " + "Entendido com sucesso! Aproveite a sessão!");
            }

//       Thread.sleep(60000);
            System.out.println("Deseja finalizar o programa? (S/N)");
            String finalizar = leitor.nextLine();

            if (finalizar.equals("S") || finalizar.equals("s")) {
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " - " + "Finalizando o programa.");
            } else {
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " - " + "Entendido! Aproveite a sessão!");
            }
        }

        private static String obterDataHoraAtual() {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            return LocalDateTime.now().format(formatter);
        }
}