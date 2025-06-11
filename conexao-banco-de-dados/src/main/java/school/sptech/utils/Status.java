package school.sptech.utils;

public enum Status {
    S_200("200", "Ok"),
    S_201("201", "Recurso criado"),
    S_204("204", "Sem ação, mas bem-sucedido"),
    S_400("400", "Requisição mal formatada"),
    S_403("403", "Acesso negado"),
    S_404("404", "Recurso não encontrado"),
    S_500("500", "Erro inesperado"),
    S_503("503", "Serviço não encontrado"),
    S_504("504", "Timeout");

    private String numero;
    private String descricao;

    Status (String numero, String descricao) {
        this.numero = numero;
        this.descricao = descricao;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
