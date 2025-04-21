package school.sptech;

import school.sptech.apachePoi.LeitorExcel;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class Workbook {
    public static void main(String[] args) {
        // Criação do leitor de arquivos Excel
        LeitorExcel leitor = new LeitorExcel();

        // Caminhos dos arquivos que serão usados
        Path caminhoCidades = Path.of("src/main/java/school/sptech/apachePoi/arquivos-dados/cidades-sp.xlsx");
        Path caminhoVacinas = Path.of("src/main/java/school/sptech/apachePoi/arquivos-dados/estadoSP_vacinas-19-22.xlsx");
        Path caminhoDoencas = Path.of("src/main/java/school/sptech/apachePoi/arquivos-dados/estadoSP_doencas.xlsx");
        Path caminhoVacinasMensal = Path.of("src/main/java/school/sptech/apachePoi/arquivos-dados/estadoSP_vacinas-23-24.xlsx");

        // Leitura dos arquivos
        // o try é para tratar a excessão de erro, caso o arquivo não seja encontrado ou não possa ser lido
        try (InputStream arquivoCidades = Files.newInputStream(caminhoCidades);
             InputStream arquivoVacinas = Files.newInputStream(caminhoVacinas);
             InputStream arquivoDoencas = Files.newInputStream(caminhoDoencas);
             InputStream arquivoVacinasMensal = Files.newInputStream(caminhoVacinasMensal) // arquivo de vacinas mensal
             ) {

            leitor.extrairDados("cidades-sp.xlsx", arquivoCidades); // chama processarCidades
            leitor.extrairDados("estadoSP_vacinas-19-22.xlsx", arquivoVacinas);// chama processarOcorrencias
            leitor.extrairDados("estadoSP_vacinas-23-24.xlsx", arquivoVacinasMensal); // chama processarOcorrenciasMensal
            leitor.extrairDados("estadoSP_doencas.xlsx", arquivoDoencas); // chama processarDoencas

            System.out.println("Arquivos processados com sucesso!"); // mensagem de sucesso

        } catch (IOException e) {
            System.err.println("Erro ao ler os arquivos: " + e.getMessage());
            e.printStackTrace(); // mensagem de erro
        }

        // Esse arquivo faz a conexão como banco de dados
        // Configure as variaveis de ambiente no IntelliJ
        // A pasta models é onde estão os objetos (tabelas do banco de dados que vamos usar)
        // A pasta dao é onde estão os métodos que interajem com o banco de dados dos objetos
        // O Workook é o executavel do projeto, ele é quem chama o LeitorExcel
        // O LeitorExcel é quem extrai os dados do arquivos .xlsx e insere no banco de dados, juntamente com os logs

    }
}
