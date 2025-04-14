package school.sptech;

import school.sptech.apachePoi.LeitorExcel;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class Workbook{
    public static void main(String[] args) throws IOException {
        String nomeArquivo = "estadoSP_doencas.xlsx";
        // Coloque o caminho para a pasta que estão os arquivos
        Path caminho = Path.of("C:\\lp-java\\conexao-banco-de-dados\\src\\main\\java\\school\\sptech\\apachePoi\\arquivos-dados\\estadoSP_doencas.xlsx");
        InputStream arquivo = Files.newInputStream(caminho);

        LeitorExcel leitor = new LeitorExcel();
        leitor.extrairDados(nomeArquivo, arquivo);

        // Para quando parar de ler
        arquivo.close();

        // Esse arquivo faz a conexão como banco de dados
        // Configure as variaveis de ambiente no IntelliJ
        // A pasta models é onde estão os objetos (tabelas do banco de dados que vamos usar)
        // A pasta dao é onde estão os métodos que interajem com o banco de dados dos objetos
        // O Workook é o executavel do projeto, ele é quem chama o LeitorExcel
        // O LeitorExcel é quem extrai os dados do arquivos .xlsx e insere no banco de dados, juntamente com os logs
    }
}
