const cidadesSP = [
    "Adamantina", "Adolfo", "Aguaí", "Águas da Prata", "Águas de Lindóia", "Alambari", "Alfredo Marcondes", "Altair", "Altinópolis", 
    "Alto Alegre", "Alumínio", "Álvares Florence", "Álvares Machado", "Amparo", "Anaurilândia", "Andradina", "Angatuba", "Anhembi", 
    "Anhumas", "Aparecida", "Arapicu", "Araraquara", "Araras", "Arapeí", "Arco-Íris", "Arealva", "Areias", "Areiópolis", "Ariranha", 
    "Artur Nogueira", "Arujá", "Aspásia", "Assis", "Atibaia", "Auriflama", "Avaré", "Bady Bassitt", "Balbinos", "Balsamo", "Bananal", 
    "Barão de Antonina", "Barbosa", "Bariri", "Barra Bonita", "Barra do Chapéu", "Barra do Turvo", "Barretos", "Bastos", "Batatais", 
    "Bauru", "Bebedouro", "Bento de Abreu", "Birigüi", "Boa Esperança do Sul", "Bocaina", "Bofete", "Boituva", "Bom Jesus dos Perdões", 
    "Bom Sucesso de Itararé", "Borá", "Boracéia", "Borborema", "Brade", "Bragança Paulista", "Buri", "Buritama", "Cabreúva", "Caiuá", 
    "Caieiras", "Cajamar", "Cajati", "Cajobi", "Campinas", "Campo Limpo Paulista", "Campos do Jordão", "Cananéia", "Cândido Motta", 
    "Cândido Motta", "Capela do Alto", "Capivari", "Caraguatatuba", "Carapicuíba", "Cardoso", "Casa Branca", "Castilho", "Catanduva", 
    "Catiguá", "Cedral", "Cerqueira César", "Cerquilho", "Cezar", "Chavantes", "Colina", "Colombo", "Conchal", "Conde", "Cordeirópolis",
    "Coroados", "Coronel Macedo", "Corumbataí", "Cosmorama", "Cotia", "Cravinhos", "Cristais Paulista", "Cubatão", "Cunha", "Descalvado",
    "Diadema", "Dirce Reis", "Divinolândia", "Dourado", "Dracena", "Dumont", "Echaporã", "Eldorado", "Embaúba", "Embu das Artes",
    "Embu-Guaçu", "Embu", "Enéas Marques", "Engenheiro Coelho", "Espírito Santo do Pinhal", "Espírito Santo do Turvo", "Estiva Gerbi",
    "Estrela do Norte", "Estremoz", "Euclides da Cunha Paulista", "Fartura", "Fernandópolis", "Ferraz de Vasconcelos", "Floreal",
    "Florínea", "Franca", "Gabriel Monteiro", "Gália", "Garça", "Gavião Peixoto", "General Salgado", "Getulina", "Glicério", "Guapiara",
    "Guaraci", "Guaratinguetá", "Guareí", "Guariba", "Guarujá", "Guaçui", "Guilherme", "Guizoni", "Guma", "Guapiara", "Holambra",
    "Iacanga", "Ibaté", "Ibiporã", "Ibiúna", "Ibitinga", "Ibirarema", "Ibirapuã", "Ibitinga", "Iguape", "Igarapava", "Igaratá", "Iguape",
    "Ilha Comprida", "Ilha Solteira", "Indaiatuba", "Iperó", "Ipiúna", "Iracemápolis", "Irapuã", "Itaberá", "Itápolis", "Itapeva", "Itapetininga",
    "Itapira", "Itapuí", "Itararé", "Itatiba", "Itu", "Itupeva", "Itaí", "Ibatiba", "Itaquaquecetuba", "Itinguará", "Ivo", "Jacareí"
];

// Cria um <select> para as cidades
const cidadeInput = document.getElementById("cidade");

const selectCidade = document.createElement("select");
selectCidade.name = "cidade";
selectCidade.id = "cidade";

// Adiciona as opções de cidades
cidadesSP.forEach((cidade) => {
    const option = document.createElement("option");
    option.value = cidade;
    option.textContent = cidade;
    selectCidade.appendChild(option);
});

// Substitui o campo de input por um <select> com as cidades
cidadeInput.replaceWith(selectCidade);
