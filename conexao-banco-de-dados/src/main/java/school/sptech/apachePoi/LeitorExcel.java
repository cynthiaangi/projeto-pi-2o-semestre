package school.sptech.apachePoi;

// TODO: Criar ID de execução da aplicação para adicionar em todos os logs de uma mesma execução no banco de dados
// TODO: Refatorar os metodos de processar dados
// TODO: Adicionar Logs para linhas vazias
// TODO: Adicionar em todas as funções a função Log
// TODO: Criar o super método do Dao?
// TODO: Validar os try catch
// TODO: Testar validação de ocorrênciais mensais
// TODO: Validar Processar casos
// TODO: Mudar os numeros do status
// TODO: Criar ID por execução do ETL no LOG
// TODO: mudar rows para fori
// TODO: Mudar bucketname no Workbook para env
// TODO: Mudar de classe para metodo no log BD e no Java
// TODO: Adicionar ENUM para os status ?
// TODO: Corrigir antigo classQueOcorreu
// TODO: Corrigir planilhas de dados
// TODO: Adicionar classeQueOcorreu no banco de dados e no Java
// TODO: Adicionar verificar inserção cidade ??
// TODO: Validar os nomes dos metodos do log
// TODO: Adicionar ID execução na msg do Slack?

// TODO: ! Validar nomes dos métodos, com ajuda do Diagrama de Classes. Nomear os métodos para entender de forma intuitiva
// TODO: ! Validar se classes transform terão herança - mudar atributo leitor, por metodo getFkDoenca, e adicionar LogETl nesse metodo
// TODO: ! Adicionar ENUM para os status
// TODO: Trocar user banco para immuno

// Lembrete DEV:
// Leitura interna do arquivo, praticamente não mexer. Só precisa abrir o InputStream, com o Path do arquivo
// Criar instância workbook e fornecer o row pedido
// Após finalizar o For, fechar o InputStream desse arquivo metodo .close()
// Não esquecer de adicionar/validar o auto-commit
// O Main realmente é na classe workbook?
// Não esquecer de mexer com o log - criar classe log, e passar ela nos metodos, para poder
// imprimir log em qualquer parte do código
// verificar estr

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.transform.CasosTransform;
import school.sptech.transform.CidadesTransform;
import school.sptech.transform.OcorrenciasAnuaisTransform;
import school.sptech.transform.OcorrenciasMensaisTransform;
import school.sptech.utils.LogEtl;
import school.sptech.utils.Status;

public class LeitorExcel {
    private LogEtl logEtl;

    public LeitorExcel(LogEtl logEtl) {
        this.logEtl = logEtl;
    }

    public static InputStream abrirArquivo(String nomeArquivo) throws IOException {
        Path caminhoArquivo = Path.of(nomeArquivo);
        InputStream arquivoLocal = Files.newInputStream(caminhoArquivo);

        return arquivoLocal;
    }

    public void processarDadosDoArquivo(JdbcTemplate connection, Workbook planilhaExcel, String nomeArquivo) {
        switch (nomeArquivo) {
            case "cidades-sp.xlsx" -> {
                CidadesTransform cidadesTransform = new CidadesTransform(logEtl, connection);
                cidadesTransform.processarCidades(nomeArquivo, planilhaExcel);
            }
            case "estadoSP_vacinas-19-22.xlsx" -> {
                OcorrenciasAnuaisTransform ocorrenciasAnuaisTransform = new OcorrenciasAnuaisTransform(logEtl, connection);
                ocorrenciasAnuaisTransform.processarOcorrenciasAnuais(nomeArquivo, planilhaExcel);
            }
            case "estadoSP_vacinas-23-24.xlsx" -> {
                OcorrenciasMensaisTransform ocorrenciasMensaisTransform = new OcorrenciasMensaisTransform(logEtl, connection);
                ocorrenciasMensaisTransform.processarOcorrenciasMensais(nomeArquivo, planilhaExcel);
            }
            case "estadoSP_doencas.xlsx" -> {
                CasosTransform casosTransform = new CasosTransform(logEtl, connection);
                casosTransform.processarCasosDoencas(nomeArquivo, planilhaExcel);
            }
            default -> {
                logEtl.inserirLogEtl(Status.S_404, "Arquivo não reconhecido: %s".formatted(nomeArquivo), "processarDadosDoArquivo", "LeitorExcel");
            }
        }
    }

    // metodo para extrair os dados de todos os arquivos Excel
    public void extrairDados(JdbcTemplate connection, String[] nomeArquivos) {
        for (String nomeArquivo : nomeArquivos) {
            logEtl.inserirLogEtl(Status.S_200, "Início da leitura do arquivo: %s %n".formatted(nomeArquivo), "extrairDados", "LeitorExcel");

            try {
                // Abre arquivo
                InputStream arquivoLocal = abrirArquivo(nomeArquivo);

                Workbook planilhaExcel = new XSSFWorkbook(arquivoLocal);

                this.processarDadosDoArquivo(connection, planilhaExcel, nomeArquivo);

                arquivoLocal.close();

            } catch (Exception e) {
                logEtl.inserirLogEtl(Status.S_500, e.getMessage(),"extrairDados", "LeitorExcel");
                throw new RuntimeException(e);
            }
        }
    }

}