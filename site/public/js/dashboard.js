var idUsuario = sessionStorage.ID_USUARIO;
var nomeUser = sessionStorage.NOME_USUARIO;
var bemVinda = document.getElementById("nome_usuario");
bemVinda.innerHTML = `${nomeUser}`;

// graficos Coqueluche
var ctx = myChartCanvas
var cty = myChartCanvas2
var ctz = myChartCanvas3
var ctw = myChartCanvas4

// graficos Meningite
var cta = myChartCanvas5
var ctb = myChartCanvas6
var ctc = myChartCanvas7
var ctd = myChartCanvas8

// graficos Poliomielite
var cti = myChartCanvas9
var ctj = myChartCanvas10
var ctk = myChartCanvas11
var ctl = myChartCanvas12

const codigosCidade = ["", 3500105, 3500204, 3500303, 3500402, 3500501, 3500550, 3500600, 3500709, 3500758, 3500808, 3500907, 3501004, 3501103, 3501152, 3501202, 3501301, 3501400,
    3501509, 3501608, 3501707, 3501806, 3501905, 3502002, 3502101, 3502200, 3502309, 3502408, 3502507, 3502606, 3502705, 3502754, 3502804, 3502903, 3503000, 3503109, 3503158, 3503208, 3503307,
    3503356, 3503406, 3503505, 3503604, 3503703, 3503802, 3503901, 3503950, 3504008, 3504107, 3504206, 3504305, 3504404, 3504503, 3504602, 3504701, 3504800, 3504909, 3505005, 3505104,
    3505203, 3505302, 3505351, 3505401, 3505500, 3505609, 3505708, 3505807, 3505906, 3506003, 3506102, 3506201, 3506300, 3506359, 3506409, 3506508, 3506607, 3506706, 3506805, 3506904, 3507001,
    3507100, 3507159, 3507209, 3507308, 3507407, 3507456, 3507506, 3507605, 3507704, 3507753, 3507803, 3507902, 3508009, 3508108, 3508207, 3508306, 3508405, 3508504, 3508603, 3508702,
    3508801, 3508900, 3509007, 3509106, 3509205, 3509254, 3509304, 3509403, 3509452, 3509502, 3509601, 3509700, 3509809, 3509908, 3509957, 3510005, 3510104, 3510153, 3510203, 3510302,
    3510401, 3510500, 3510609, 3510708, 3510807, 3510906, 3511003, 3511102, 3511201, 3511300, 3511409, 3511508, 3511607, 3511706, 3511904, 3512001, 3512100, 3512209, 3512308, 3512407,
    3512506, 3512605, 3512704, 3512803, 3512902, 3513009, 3513108, 3513207, 3513306, 3513405, 3513504, 3513603, 3513702, 3513801, 3513850, 3513900, 3514007, 3514106, 3514205, 3514304,
    3514403, 3514502, 3514601, 3514700, 3514809, 3514908, 3514924, 3514957, 3515004, 3515103, 3515129, 3515152, 3515186, 3515194, 3515202, 3515301, 3515350, 3515400, 3515509, 3515608,
    3515657, 3515707, 3515806, 3515905, 3516002, 3516101, 3516200, 3516309, 3516408, 3516507, 3516606, 3516705, 3516804, 3516853, 3516903, 3517000, 3517109, 3517208, 3517307, 3517406,
    3517505, 3517604, 3517703, 3517802, 3517901, 3518008, 3518107, 3518206, 3518305, 3518404, 3518503, 3518602, 3518701, 3518800, 3518859,
    3518909, 3519006, 3519055, 3519071, 3519105, 3519204, 3519253, 3519303, 3519402, 3519501, 3519600, 3519709, 3519808, 3519907, 3520004,
    3520103, 3520202, 3520301, 3520400, 3520426, 3520442, 3520509, 3520608, 3520707, 3520806, 3520905, 3521002, 3521101, 3521150, 3521200,
    3521309, 3521408, 3521507, 3521606, 3521705, 3521804, 3521903, 3522000, 3522109, 3522158, 3522208, 3522307, 3522406, 3522505, 3522604,
    3522653, 3522703, 3522802, 3522901, 3523008, 3523107, 3523206, 3523305, 3523404, 3523503, 3523602, 3523701, 3523800, 3523909, 3524006,
    3524105, 3524204, 3524303, 3524402, 3524501, 3524600, 3524709, 3524808, 3524907, 3525003, 3525102, 3525201, 3525300, 3525409, 3525508,
    3525607, 3525706, 3525805, 3525854, 3525904, 3526001, 3526100, 3526209, 3526308, 3526407, 3526506, 3526605, 3526704, 3526803, 3526902,
    3527009, 3527108, 3527207, 3527256, 3527306, 3527405, 3527504, 3527603, 3527702, 3527801, 3527900, 3528007, 3528106, 3528205, 3528304,
    3528403, 3528502, 3528601, 3528700, 3528809, 3528858, 3528908, 3529005, 3529104, 3529203, 3529302, 3529401, 3529500, 3529609, 3529658,
    3529708, 3529807, 3529906, 3530003, 3530102, 3530201, 3530300, 3530409, 3530508, 3530607, 3530706, 3530805, 3530904, 3531001, 3531100,
    3531209, 3531308, 3531407, 3531506, 3531605, 3531704, 3531803, 3531902, 3532009, 3532058, 3532108, 3532157, 3532207, 3532306, 3532405,
    3532504, 3532603, 3532702, 3532801, 3532827, 3532843, 3532868, 3532900, 3533007, 3533106, 3533205, 3533254, 3533304, 3533403, 3533502,
    3533601, 3533700, 3533809, 3533908, 3534005, 3534104, 3534203, 3534302, 3534401, 3534500, 3534609, 3534708, 3534757, 3534807, 3534906,
    3535002, 3535101, 3535200, 3535309, 3535408, 3535507, 3535606, 3535705, 3535804, 3535903, 3536000, 3536109, 3536208, 3536257, 3536307,
    3536406, 3536505, 3536570, 3536604, 3536703, 3536802, 3536901, 3537008, 3537107, 3537156, 3537206, 3537305, 3537404, 3537503, 3537602,
    3537701, 3537800, 3537909, 3538006, 3538105, 3538204, 3538303, 3538501, 3538600, 3538709, 3538808, 3538907, 3539004, 3539103, 3539202,
    3539301, 3539400, 3539509, 3539608, 3539707, 3539806, 3539905, 3540002, 3540101, 3540200, 3540259, 3540309, 3540408, 3540507, 3540606,
    3540705, 3540754, 3540804, 3540853, 3540903, 3541000, 3541059, 3541109, 3541208, 3541307, 3541406, 3541505, 3541604, 3541653, 3541703,
    3541802, 3541901, 3542008, 3542107, 3542206, 3542305, 3542404, 3542503, 3542602, 3542701, 3542800, 3542909, 3543006, 3543105, 3543204,
    3543238, 3543253, 3543303, 3543402, 3543501, 3543600, 3543709, 3543808, 3543907, 3544004, 3544103, 3544202, 3544251, 3544301, 3544400,
    3544509, 3544608, 3544707, 3544806, 3544905, 3545001, 3545100, 3545159, 3545209, 3545308, 3545407, 3545506, 3545605, 3545704, 3545803,
    3546009, 3546108, 3546207, 3546256, 3546306, 3546405, 3546504, 3546603, 3546702, 3546801, 3546900, 3547007, 3547106, 3547205, 3547304,
    3547403, 3547502, 3547601, 3547650, 3547700, 3547809, 3547908, 3548005, 3548054, 3548104, 3548203, 3548302, 3548401, 3548500, 3548609,
    3548708, 3548807, 3548906, 3549003, 3549102, 3549201, 3549250, 3549300, 3549409, 3549508, 3549607, 3549706, 3549805, 3549904, 3549953,
    3550001, 3550100, 3550209, 3550308, 3550407, 3550506, 3550605, 3550704, 3550803, 3550902, 3551009, 3551108, 3551207, 3551306, 3551405,
    3551504, 3551603, 3551702, 3551801, 3551900, 3552007, 3552106, 3552205, 3552304, 3552403, 3552502, 3552551, 3552601, 3552700, 3552809,
    3552908, 3553005, 3553104, 3553203, 3553302, 3553401, 3553500, 3553609, 3553658, 3553708, 3553807, 3553856, 3553906, 3553955, 3554003,
    3554102, 3554201, 3554300, 3554409, 3554508, 3554607, 3554656, 3554706, 3554755, 3554805, 3554904, 3554953, 3555000, 3555109, 3555208,
    3555307, 3555356, 3555406, 3555505, 3555604, 3555703, 3555802, 3555901, 3556008, 3556107, 3556206, 3556305, 3556354, 3556404, 3556453,
    3556503, 3556602, 3556701, 3556800, 3556909, 3556958, 3557006, 3557105, 3557154, 3557204, 3557303];

const cidadesSP = ["Selecione a cidade",
    "Adamantina", "Adolfo", "Aguaí", "Águas da Prata", "Águas de Lindóia", "Águas de Santa Bárbara", "Águas de São Pedro", "Agudos", "Alambari", "Alfredo Marcondes", "Altair", "Altinópolis", "Alto Alegre", "Alumínio", "Álvares Florence", "Álvares Machado", "Álvaro de Carvalho", "Alvinlândia", "Americana", "Américo Brasiliense",
    "Américo de Campos", "Amparo", "Analândia", "Andradina", "Angatuba", "Anhembi", "Anhumas", "Aparecida", "Aparecida d'Oeste", "Apiaí", "Araçariguama", "Araçatuba", "Araçoiaba da Serra", "Aramina", "Arandu", "Arapeí", "Araraquara", "Araras", "Arco-Íris", "Arealva", "Areias",
    "Areiópolis", "Ariranha", "Artur Nogueira", "Arujá", "Aspásia", "Assis", "Atibaia", "Auriflama", "Avaí", "Avanhandava", "Avaré", "Bady Bassitt", "Balbinos", "Bálsamo", "Bananal", "Barão de Antonina", "Barbosa", "Bariri", "Barra Bonita", "Barra do Chapéu", "Barra do Turvo", "Barretos", "Barrinha", "Barueri", "Bastos", "Batatais", "Bauru", "Bebedouro", "Bento de Abreu", "Bernardino de Campos",
    "Bertioga", "Bilac", "Birigui", "Biritiba Mirim", "Boa Esperança do Sul", "Bocaina", "Bofete", "Boituva", "Bom Jesus dos Perdões", "Bom Sucesso de Itararé", "Borá", "Boracéia", "Borborema", "Borebi", "Botucatu", "Bragança Paulista", "Braúna", "Brejo Alegre", "Brodowski", "Brotas", "Buri", "Buritama", "Buritizal", "Cabrália Paulista", "Cabreúva", "Caçapava", "Cachoeira Paulista", "Caconde", "Cafelândia", "Caiabu", "Caieiras", "Caiuá", "Cajamar", "Cajati", "Cajobi", "Cajuru", "Campina do Monte Alegre", "Campinas", "Campo Limpo Paulista", "Campos do Jordão", "Campos Novos Paulista", "Cananéia", "Canas", "Cândido Mota", "Cândido Rodrigues", "Canitar", "Capão Bonito", "Capela do Alto", "Capivari", "Caraguatatuba", "Carapicuíba", "Cardoso", "Casa Branca", "Cássia dos Coqueiros", "Castilho", "Catanduva", "Catiguá", "Cedral", "Cerqueira César", "Cerquilho", "Cesário Lange", "Charqueada", "Clementina", "Colina", "Colômbia", "Conchal", "Conchas", "Cordeirópolis", "Coroados", "Coronel Macedo", "Corumbataí", "Cosmópolis", "Cosmorama", "Cotia", "Cravinhos", "Cristais Paulista", "Cruzália", "Cruzeiro", "Cubatão", "Cunha", "Descalvado", "Diadema", "Dirce Reis", "Divinolândia", "Dobrada", "Dois Córregos", "Dolcinópolis", "Dourado", "Dracena", "Duartina", "Dumont", "Echaporã", "Eldorado", "Elias Fausto", "Elisiário", "Embaúba", "Embu das Artes", "Embu-Guaçu", "Emilianópolis", "Engenheiro Coelho", "Espírito Santo do Pinhal", "Espírito Santo do Turvo", "Estrela d'Oeste", "Estrela do Norte", "Euclides da Cunha Paulista", "Fartura", "Fernando Prestes", "Fernandópolis", "Fernão", "Ferraz de Vasconcelos", "Flora Rica", "Floreal", "Flórida Paulista", "Florínia", "Franca", "Francisco Morato", "Franco da Rocha", "Gabriel Monteiro", "Gália", "Garça", "Gastão Vidigal", "Gavião Peixoto", "General Salgado", "Getulina", "Glicério", "Guaiçara", "Guaimbê", "Guaíra", "Guapiaçu",
    "Guapiara", "Guará", "Guaraçaí", "Guaraci", "Guarani d'Oeste", "Guarantã", "Guararapes", "Guararema", "Guaratinguetá", "Guareí",
    "Guariba", "Guarujá", "Guarulhos", "Guatapará", "Guzolândia", "Herculândia", "Holambra", "Hortolândia", "Iacanga", "Iacri",
    "Iaras", "Ibaté", "Ibirá", "Ibirarema", "Ibitinga", "Ibiúna", "Icém", "Iepê", "Igaraçu do Tietê", "Igarapava",
    "Igaratá", "Iguape", "Ilha Comprida", "Ilha Solteira", "Ilhabela", "Indaiatuba", "Indiana", "Indiaporã", "Inúbia Paulista", "Ipaussu",
    "Iperó", "Ipeúna", "Ipiguá", "Iporanga", "Ipuã", "Iracemápolis", "Irapuã", "Irapuru", "Itaberá", "Itaí",
    "Itajobi", "Itaju", "Itanhaém", "Itaóca", "Itapecerica da Serra", "Itapetininga", "Itapeva", "Itapevi", "Itapira", "Itapirapuã Paulista",
    "Itápolis", "Itaporanga", "Itapuí", "Itapura", "Itaquaquecetuba", "Itararé", "Itariri", "Itatiba", "Itatinga", "Itirapina", "Itirapuã", "Itobi", "Itu",
    "Itupeva", "Ituverava", "Jaborandi", "Jaboticabal", "Jacareí", "Jaci", "Jacupiranga", "Jaguariúna", "Jales", "Jambeiro",
    "Jandira", "Jardinópolis", "Jarinu", "Jaú", "Jeriquara", "Joanópolis", "João Ramalho", "José Bonifácio", "Júlio Mesquita", "Jumirim",
    "Jundiaí", "Junqueirópolis", "Juquiá", "Juquitiba", "Lagoinha", "Laranjal Paulista", "Lavínia", "Lavrinhas", "Leme", "Lençóis Paulista",
    "Limeira", "Lindóia", "Lins", "Lorena", "Lourdes", "Louveira", "Lucélia", "Lucianópolis", "Luís Antônio", "Luiziânia",
    "Lupércio", "Lutécia", "Macatuba", "Macaubal", "Macedônia", "Magda", "Mairinque", "Mairiporã", "Manduri", "Marabá Paulista",
    "Maracaí", "Marapoama", "Mariápolis", "Marília", "Marinópolis", "Martinópolis", "Matão", "Mauá", "Mendonça", "Meridiano",
    "Mesópolis", "Miguelópolis", "Mineiros do Tietê", "Mira Estrela", "Miracatu", "Mirandópolis", "Mirante do Paranapanema", "Mirassol", "Mirassolândia", "Mococa",
    "Mogi das Cruzes", "Mogi Guaçu", "Mogi Mirim", "Mombuca", "Monções", "Mongaguá", "Monte Alegre do Sul", "Monte Alto", "Monte Aprazível", "Monte Azul Paulista",
    "Monte Castelo", "Monte Mor", "Monteiro Lobato", "Morro Agudo", "Morungaba", "Motuca", "Murutinga do Sul", "Nantes", "Narandiba", "Natividade da Serra",
    "Nazaré Paulista", "Neves Paulista", "Nhandeara", "Nipoã", "Nova Aliança", "Nova Campina", "Nova Canaã Paulista", "Nova Castilho", "Nova Europa", "Nova Granada",
    "Nova Guataporanga", "Nova Independência", "Nova Luzitânia", "Nova Odessa", "Novais", "Novo Horizonte", "Nuporanga", "Ocauçu", "Óleo", "Olímpia",
    "Onda Verde", "Oriente", "Orindiúva", "Orlândia", "Osasco", "Oscar Bressane", "Osvaldo Cruz", "Ourinhos", "Ouro Verde", "Ouroeste",
    "Pacaembu", "Palestina", "Palmares Paulista", "Palmeira d'Oeste", "Palmital", "Panorama", "Paraguaçu Paulista", "Paraibuna", "Paraíso", "Paranapanema",
    "Paranapuã", "Parapuã", "Pardinho", "Pariquera-Açu", "Parisi", "Patrocínio Paulista", "Paulicéia", "Paulínia", "Paulistânia", "Paulo de Faria",
    "Pederneiras", "Pedra Bela", "Pedranópolis", "Pedregulho", "Pedreira", "Pedrinhas Paulista", "Pedro de Toledo", "Penápolis", "Pereira Barreto", "Pereiras",
    "Peruíbe", "Piacatu", "Piedade", "Pilar do Sul", "Pindamonhangaba", "Pindorama", "Pinhalzinho", "Piquerobi", "Piquete", "Piracaia",
    "Piracicaba", "Piraju", "Pirajuí", "Pirangi", "Pirapora do Bom Jesus", "Pirapozinho", "Pirassununga", "Piratininga", "Pitangueiras", "Planalto",
    "Platina", "Poá", "Poloni", "Pompéia", "Pongaí", "Pontal", "Pontalinda", "Pontes Gestal", "Populina", "Porangaba",
    "Porto Feliz", "Porto Ferreira", "Potim", "Potirendaba", "Pracinha", "Pradópolis", "Praia Grande", "Pratânia", "Presidente Alves", "Presidente Bernardes",
    "Presidente Epitácio", "Presidente Prudente", "Presidente Venceslau", "Promissão", "Quadra", "Quatá", "Queiroz", "Queluz", "Quintana", "Rafard",
    "Rancharia", "Redenção da Serra", "Regente Feijó", "Reginópolis", "Registro", "Restinga", "Ribeira", "Ribeirão Bonito", "Ribeirão Branco", "Ribeirão Corrente",
    "Ribeirão do Sul", "Ribeirão dos Índios", "Ribeirão Grande", "Ribeirão Pires", "Ribeirão Preto", "Rifaina", "Rincão", "Rinópolis", "Rio Claro", "Rio das Pedras",
    "Rio Grande da Serra", "Riolândia", "Riversul", "Rosana", "Roseira", "Rubiácea", "Rubinéia", "Sabino", "Sagres", "Sales",
    "Sales Oliveira", "Salesópolis", "Salmourão", "Saltinho", "Salto", "Salto de Pirapora", "Salto Grande", "Sandovalina", "Santa Adélia", "Santa Albertina",
    "Santa Bárbara d'Oeste", "Santa Branca", "Santa Clara d'Oeste", "Santa Cruz da Conceição", "Santa Cruz da Esperança", "Santa Cruz das Palmeiras", "Santa Cruz do Rio Pardo", "Santa Ernestina", "Santa Fé do Sul", "Santa Gertrudes",
    "Santa Isabel", "Santa Lúcia", "Santa Maria da Serra", "Santa Mercedes", "Santa Rita d'Oeste", "Santa Rita do Passa Quatro", "Santa Rosa de Viterbo", "Santa Salete", "Santana da Ponte Pensa", "Santana de Parnaíba",
    "Santo Anastácio", "Santo André", "Santo Antônio da Alegria", "Santo Antônio de Posse", "Santo Antônio do Aracanguá", "Santo Antônio do Jardim",
    "Santo Antônio do Pinhal", "Santo Expedito", "Santópolis do Aguapeí", "Santos", "São Bento do Sapucaí", "São Bernardo do Campo",
    "São Caetano do Sul", "São Carlos", "São Francisco", "São João da Boa Vista", "São João das Duas Pontes", "São João de Iracema",
    "São João do Pau d'Alho", "São Joaquim da Barra", "São José da Bela Vista", "São José do Barreiro", "São José do Rio Pardo",
    "São José do Rio Preto", "São José dos Campos", "São Lourenço da Serra", "São Luís do Paraitinga", "São Manuel", "São Miguel Arcanjo",
    "São Paulo", "São Pedro", "São Pedro do Turvo", "São Roque", "São Sebastião", "São Sebastião da Grama", "São Simão", "São Vicente",
    "Sarapuí", "Sarutaiá", "Sebastianópolis do Sul", "Serra Azul", "Serra Negra", "Serrana", "Sertãozinho", "Sete Barras", "Severínia",
    "Silveiras", "Socorro", "Sorocaba", "Sud Mennucci", "Sumaré", "Suzanápolis", "Suzano", "Tabapuã", "Tabatinga", "Taboão da Serra",
    "Taciba", "Taguaí", "Taiaçu", "Taiúva", "Tambaú", "Tanabi", "Tapiraí", "Tapiratiba", "Taquaral", "Taquaritinga", "Taquarituba",
    "Taquarivaí", "Tarabai", "Tarumã", "Tatuí", "Taubaté", "Tejupá", "Teodoro Sampaio", "Terra Roxa", "Tietê", "Timburi", "Torre de Pedra",
    "Torrinha", "Trabiju", "Tremembé", "Três Fronteiras", "Tuiuti", "Tupã", "Tupi Paulista", "Turiúba", "Turmalina", "Ubarana",
    "Ubatuba", "Ubirajara", "Uchoa", "União Paulista", "Urânia", "Uru", "Urupês", "Valentim Gentil", "Valinhos", "Valparaíso",
    "Vargem", "Vargem Grande do Sul", "Vargem Grande Paulista", "Várzea Paulista", "Vera Cruz", "Vinhedo", "Viradouro", "Vista Alegre do Alto",
    "Vitória Brasil", "Votorantim", "Votuporanga", "Zacarias", "Chavantes", "Estiva Gerbi"];

const cidadeInput = document.getElementById('ipt_cidades');

const cidadeSelect = document.createElement('select');
cidadeSelect.name = 'cidades';
cidadeSelect.id = 'sel_cidade';
cidadeSelect.className = 'select-ano';

cidadesSP.forEach((cidade) => {
    const escolhaCidade = document.createElement("option");
    escolhaCidade.value = cidade;
    escolhaCidade.textContent = cidade;
    cidadeSelect.appendChild(escolhaCidade);
});

cidadeInput.replaceWith(cidadeSelect);

const doencas = ['Coqueluche', 'Meningite', 'Poliomielite'];

const doencaInput = document.getElementById('ipt_doencas');

const doencaSelect = document.createElement("select");
doencaSelect.name = 'doencas';
doencaSelect.id = 'sel_doenca';
doencaSelect.className = 'select-ano';

doencas.forEach((doenca) => {
    const escolha = document.createElement("option");
    escolha.value = doenca;
    escolha.textContent = doenca;
    doencaSelect.appendChild(escolha);
});

doencaInput.replaceWith(doencaSelect);

// const anos = ["Selecione o ano", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

// const anoAntesInput = document.getElementById("ipt_ano_antes");
// const anoDepoisInput = document.getElementById("ipt_ano_depois");

// const selectAnoAntes = document.createElement("select");
// const selectAnoDepois = document.createElement("select");
// selectAnoAntes.name = "ano_antes";
// selectAnoAntes.id = "sel_ano_antes";
// selectAnoAntes.className = "select-ano";
// selectAnoDepois.name = "ano";
// selectAnoDepois.id = "sel_ano_depois";
// selectAnoDepois.className = "select-ano";

// anos.forEach((ano) => {
//     const opcao = document.createElement("option");
//     opcao.value = ano;
//     opcao.textContent = ano;
//     selectAnoAntes.appendChild(opcao);
// });

// anos.forEach((ano) => {
//     const opcao = document.createElement("option");
//     opcao.value = ano;
//     opcao.textContent = ano;
//     selectAnoDepois.appendChild(opcao);
// });

// anoAntesInput.replaceWith(selectAnoAntes);
// anoDepoisInput.replaceWith(selectAnoDepois);

let myChart2 = new Chart(cty, {
    type: 'doughnut',
    data: {
        labels: ['Onde estamos %'],
        datasets: [{
            data: [75, 100 - 75],
            backgroundColor: ['#0A4D68', '#E0E0E0'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
            cutout: '70%',
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Meta vacinal para Coqueluche',
                color: '#2e2e2e',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            },
            tooltip: { enabled: true }
        }
    },
    plugins: [{
        id: 'marcadorMeta',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return; // garante que o gráfico será desenhado apenas após a caixa dele estiver pronta

            const posicao = 85; // ajuste na inclinação e posição da marca no gráfico
            const angle = Math.PI * (1 - posicao / 100); // Invertido (vai de 0% à esquerda até 100% à direita)

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = chartArea.bottom;
            const radius = (chartArea.right - chartArea.left) / 2 * 0.8;

            const x = centerX + radius * Math.cos(angle - 0.5);
            const y = centerY - radius * Math.cos(angle + 0.5);

            const marcadorComprimento = 30; // comprimento da marca da meta
            const inclinacao = 0.5; // controla a inclinação da marca da meta

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(
                x - marcadorComprimento * Math.cos(angle - inclinacao),
                y + marcadorComprimento * Math.sin(angle - inclinacao)
            ); // de onde começa
            ctx.lineTo(
                x + marcadorComprimento * Math.cos(angle + inclinacao),
                y - marcadorComprimento * Math.sin(angle + inclinacao)
            ); // onde termina
            ctx.strokeStyle = 'limegreen';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#444';
            ctx.font = 'bold 14px Arial';

            // Posição meta
            const posicaoMeta = Math.PI;
            const xMeta = x + marcadorComprimento * Math.cos(angle + inclinacao);
            const yMeta = y - marcadorComprimento * Math.sin(angle + inclinacao);
            ctx.fillText('95', xMeta - 5, yMeta - 10);

            // Posição do 0 (lado esquerdo)
            const posicao0 = Math.PI;
            const x0 = centerX + (radius + 30) * Math.cos(posicao0);
            const y0 = (centerY - 20) - (radius + 15) * Math.sin(posicao0);
            ctx.fillText('0', x0, y0); // ajustezinho fino

            // Posição do 100 (lado direito)
            const posicao100 = 0;
            const x100 = centerX + (radius + 20) * Math.cos(posicao100);
            const y100 = (centerY - 25) - (radius + 15) * Math.sin(posicao100);
            ctx.fillText('100', x100 - 15, y100 + 5); // ajustezinho fino

            ctx.restore();
        }
    }]


});
let myChart6 = new Chart(ctb, {
    type: 'doughnut',
    data: {
        labels: ['Onde estamos %'],
        datasets: [{
            data: [75, 100 - 75],
            backgroundColor: ['#99ccff', '#E0E0E0'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
            cutout: '70%',
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Meta vacinal para Meningite',
                color: '#2e2e2e',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            },
            tooltip: { enabled: true }
        }
    },
    plugins: [{
        id: 'marcadorMeta',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return; // garante que o gráfico será desenhado apenas após a caixa dele estiver pronta

            const posicao = 85; // ajuste na inclinação e posição da marca no gráfico
            const angle = Math.PI * (1 - posicao / 100); // Invertido (vai de 0% à esquerda até 100% à direita)

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = chartArea.bottom;
            const radius = (chartArea.right - chartArea.left) / 2 * 0.8;

            const x = centerX + radius * Math.cos(angle - 0.5);
            const y = centerY - radius * Math.cos(angle + 0.5);

            const marcadorComprimento = 30; // comprimento da marca da meta
            const inclinacao = 0.5; // controla a inclinação da marca da meta

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(
                x - marcadorComprimento * Math.cos(angle - inclinacao),
                y + marcadorComprimento * Math.sin(angle - inclinacao)
            ); // de onde começa
            ctx.lineTo(
                x + marcadorComprimento * Math.cos(angle + inclinacao),
                y - marcadorComprimento * Math.sin(angle + inclinacao)
            ); // onde termina
            ctx.strokeStyle = 'limegreen';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#444';
            ctx.font = 'bold 14px Arial';

            // Posição meta
            const posicaoMeta = Math.PI;
            const xMeta = x + marcadorComprimento * Math.cos(angle + inclinacao);
            const yMeta = y - marcadorComprimento * Math.sin(angle + inclinacao);
            ctx.fillText('95', xMeta - 5, yMeta - 10);

            // Posição do 0 (lado esquerdo)
            const posicao0 = Math.PI;
            const x0 = centerX + (radius + 30) * Math.cos(posicao0);
            const y0 = (centerY - 20) - (radius + 15) * Math.sin(posicao0);
            ctx.fillText('0', x0, y0); // ajustezinho fino

            // Posição do 100 (lado direito)
            const posicao100 = 0;
            const x100 = centerX + (radius + 20) * Math.cos(posicao100);
            const y100 = (centerY - 25) - (radius + 15) * Math.sin(posicao100);
            ctx.fillText('100', x100 - 15, y100 + 5); // ajustezinho fino

            ctx.restore();
        }
    }]


});

let myChart10 = new Chart(ctj, {
    type: 'doughnut',
    data: {
        labels: ['Onde estamos %'],
        datasets: [{
            data: [75, 100 - 75],
            backgroundColor: ['#8a8a8a', '#E0E0E0'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
            cutout: '70%',
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Meta vacinal para Poliomielite',
                color: '#2e2e2e',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            },
            tooltip: { enabled: true }
        }
    },
    plugins: [{
        id: 'marcadorMeta',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return; // garante que o gráfico será desenhado apenas após a caixa dele estiver pronta

            const posicao = 85; // ajuste na inclinação e posição da marca no gráfico
            const angle = Math.PI * (1 - posicao / 100); // Invertido (vai de 0% à esquerda até 100% à direita)

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = chartArea.bottom;
            const radius = (chartArea.right - chartArea.left) / 2 * 0.8;

            const x = centerX + radius * Math.cos(angle - 0.5);
            const y = centerY - radius * Math.cos(angle + 0.5);

            const marcadorComprimento = 30; // comprimento da marca da meta
            const inclinacao = 0.5; // controla a inclinação da marca da meta

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(
                x - marcadorComprimento * Math.cos(angle - inclinacao),
                y + marcadorComprimento * Math.sin(angle - inclinacao)
            ); // de onde começa
            ctx.lineTo(
                x + marcadorComprimento * Math.cos(angle + inclinacao),
                y - marcadorComprimento * Math.sin(angle + inclinacao)
            ); // onde termina
            ctx.strokeStyle = 'limegreen';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#444';
            ctx.font = 'bold 14px Arial';

            // Posição meta
            const posicaoMeta = Math.PI;
            const xMeta = x + marcadorComprimento * Math.cos(angle + inclinacao);
            const yMeta = y - marcadorComprimento * Math.sin(angle + inclinacao);
            ctx.fillText('95', xMeta - 5, yMeta - 10);

            // Posição do 0 (lado esquerdo)
            const posicao0 = Math.PI;
            const x0 = centerX + (radius + 30) * Math.cos(posicao0);
            const y0 = (centerY - 20) - (radius + 15) * Math.sin(posicao0);
            ctx.fillText('0', x0, y0); // ajustezinho fino

            // Posição do 100 (lado direito)
            const posicao100 = 0;
            const x100 = centerX + (radius + 20) * Math.cos(posicao100);
            const y100 = (centerY - 25) - (radius + 15) * Math.sin(posicao100);
            ctx.fillText('100', x100 - 15, y100 + 5); // ajustezinho fino

            ctx.restore();
        }
    }]


});

// Adicionando gráfico criado em div na tela
let myChart = new Chart(ctx,
    {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Coqueluche',
                data: ['100', '400', '342', '298', '792'],
                fill: false,
                borderColor: '#0A4D68',
                backgroundColor: '#0A4D68',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de casos de Coqueluche por ano',
                    color: '#2e2e2e',
                    font: {
                        size: 24
                    }
                },
                legend: {
                    labels: {
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'anos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'qtde. casos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });

let myChart5 = new Chart(cta,
    {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Meningite',
                data: ['100', '400', '342', '298', '792'],
                borderColor: "#99ccff",
                backgroundColor: "#99ccff",
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de casos de Meningite por ano',
                    color: '#2e2e2e',
                    font: {
                        size: 24
                    }
                },
                legend: {
                    labels: {
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'anos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'qtde. casos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });

let myChart9 = new Chart(cti,
    {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Poliomielite',
                data: ['100', '400', '342', '298', '792'],
                borderColor: "#8a8a8a",
                backgroundColor: "#8a8a8a",
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de casos de Poliomielite por ano',
                    color: '#2e2e2e',
                    font: {
                        size: 24
                    }
                },
                legend: {
                    labels: {
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'anos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'qtde. casos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });

let myChart3 = new Chart(ctz, {
    type: 'bar',
    data: {
        labels: ['Acima da meta', 'Abaixo sem risco', 'Risco epidemiológico'],
        datasets: [{
            data: ['152', '403', '90'],
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30'],
            borderWidth: 1,
            borderColor: ['#0A4D68', '#EBCF1C', '#EB3B30']
        }]
    },
    options: {
        responsive: true,
        barThickness: 30,
        maxBarThickness: 30,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Situação da cobertura vacinal no estado',
                color: '#2e2e2e',
                font: {
                    size: 20
                },
                padding: {
                    bottom: 20
                }
            },
            legend: {
                display: false
            },
            
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: {
                    minRotation: 30,
                    maxRotation: 30,
                    color: '#2e2e2e',
                    align: 'center',
                }
            },
            y: {
                ticks: {
                    color: '#2e2e2e'
                },
                title: {
                    display: true,
                    text: 'qtd. de cidades',
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            }
        }  
    }

});

let myChart7 = new Chart(ctc, {
    type: 'bar',
    data: {
        labels: ['Acima da meta', 'Abaixo sem risco', 'Risco epidemiológico'],
        datasets: [{
            data: ['152', '403', '90'],
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30'],
            borderWidth: 1,
            borderColor: ['#0A4D68', '#EBCF1C', '#EB3B30']
        }]
    },
    options: {
        responsive: true,
        barThickness: 30,
        maxBarThickness: 30,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Situação da cobertura vacinal no estado',
                color: '#2e2e2e',
                font: {
                    size: 20
                },
                padding: {
                    bottom: 20
                }
            },
            legend: {
                display: false
            },
            
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: {
                    minRotation: 30,
                    maxRotation: 30,
                    color: '#2e2e2e',
                    align: 'center',
                }
            },
            y: {
                ticks: {
                    color: '#2e2e2e'
                },
                title: {
                    display: true,
                    text: 'qtd. de cidades',
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            }
        }  
    }

});

let myChart11 = new Chart(ctk, {
    type: 'bar',
    data: {
        labels: ['Acima da meta', 'Abaixo sem risco', 'Risco epidemiológico'],
        datasets: [{
            data: ['152', '403', '90'],
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30'],
            borderWidth: 1,
            borderColor: ['#0A4D68', '#EBCF1C', '#EB3B30']
        }]
    },
    options: {
        responsive: true,
        barThickness: 30,
        maxBarThickness: 30,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Situação da cobertura vacinal no estado',
                color: '#2e2e2e',
                font: {
                    size: 20
                },
                padding: {
                    bottom: 20
                }
            },
            legend: {
                display: false
            },
            
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: {
                    minRotation: 30,
                    maxRotation: 30,
                    color: '#2e2e2e',
                    align: 'center',
                }
            },
            y: {
                ticks: {
                    color: '#2e2e2e'
                },
                title: {
                    display: true,
                    text: 'qtd. de cidades',
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            }
        }  
    }

});


// Adicionando gráfico criado em div na tela
let myChart4 = new Chart(ctw, {
    type: 'bar',
    data: {
        labels: ['Piracicaba', 'São José do Rio Preto', 'Franca', 'Jundiaí', 'Guararema', 'Santa Isabel', 'Mairiporá', 'São Caetano do Sul', 'Sorocaba', 'Ribeirão Preto'],
        datasets: [{
            data: ['37', '38', '39', '41', '42', '42', '43', '46', '47', '48' ],
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFC133", "#8DFF33", "#FF3333", "#33A1FF"],
            borderColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFC133", "#8DFF33", "#FF3333", "#33A1FF"],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        barThickness: 15,
        maxBarThickness: 20,
        plugins: {
            title: {
                display: true,
                text: 'Ranking de alerta na vacinação',
                color: '#2e2e2e',
                font: {
                    size: 20
                }
            },
            legend: {
                display: false
            },
            tooltip: { enabled: true }
        }
    }

});

let myChart8 = new Chart(ctd, {
    type: 'bar',
    data: {
        labels: ['Piracicaba', 'São José do Rio Preto', 'Franca', 'Jundiaí', 'Guararema', 'Santa Isabel', 'Mairiporá', 'São Caetano do Sul', 'Sorocaba', 'Ribeirão Preto'],
        datasets: [{
            data: ['37', '38', '39', '41', '42', '42', '43', '46', '47', '48' ],
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFC133", "#8DFF33", "#FF3333", "#33A1FF"],
            borderColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFC133", "#8DFF33", "#FF3333", "#33A1FF"],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        barThickness: 15,
        maxBarThickness: 20,
        plugins: {
            title: {
                display: true,
                text: 'Ranking de alerta na vacinação',
                color: '#2e2e2e',
                font: {
                    size: 20
                }
            },
            legend: {
                display: false
            },
            tooltip: { enabled: true }
        }
    }

});

let myChart12 = new Chart(ctl, {
    type: 'bar',
    data: {
        labels: ['Piracicaba', 'São José do Rio Preto', 'Franca', 'Jundiaí', 'Guararema', 'Santa Isabel', 'Mairiporá', 'São Caetano do Sul', 'Sorocaba', 'Ribeirão Preto'],
        datasets: [{
            data: ['37', '38', '39', '41', '42', '42', '43', '46', '47', '48' ],
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFC133", "#8DFF33", "#FF3333", "#33A1FF"],
            borderColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFC133", "#8DFF33", "#FF3333", "#33A1FF"],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        barThickness: 15,
        maxBarThickness: 20,
        plugins: {
            title: {
                display: true,
                text: 'Ranking de alerta na vacinação',
                color: '#2e2e2e',
                font: {
                    size: 20
                }
            },
            legend: {
                display: false
            },
            tooltip: { enabled: true }
        }
    }

});

const help1 = "Exibe a divisão percentual entre pessoas vacinadas e não vacinadas, apresentando um comparativo direto da cobertura vacinal na população."; 
const titulo1 = "Total de vacinados e não vacinados";
const help2 = "Mostra o percentual de aumento ou redução da cobertura vacinal em relação a um período anterior, indicando a tendência de adesão à vacina."; 
const titulo2 = "Variação da cobertura vacinal";
const help3 = "Apresenta a mudança percentual no número de casos registrados da doença em relação ao período anterior, indicando aumento ou redução."; 
const titulo3 = "Variação da quantidade de casos";
const help4 = "Indica a porcentagem atual da população vacinada em comparação à meta estabelecida, exibindo se o objetivo foi atingido ou não."; 
const titulo4 = "Meta vacinal para coqueluche";
const help5 = "Exibe a porcentagem de cidades que atingiram a meta de cobertura vacinal, segmentando os dados por níveis de risco epidemiológico."; 
const titulo5 = "Situação da cobertura vacinal no estado (%)"
const help6 = "Gráfico que apresenta a evolução do número de casos ao longo do tempo, exibindo comparativos mensais e tendências da doença."; 
const titulo6 = "Quantidade de casos por ano";
const help7 = "Exibe as 10 cidades com menor valor de cobertura vacinal atualmente.";
const titulo7 = "Ranking de alerta na vacinação"; 

var idEmpresa = sessionStorage.ID_USUARIO;

function abrirMensagem(mensagem){
    var mensagemTitulo = document.getElementsByClassName('titulo-mensagem')[0];
    var mensagemCorpo = document.getElementsByClassName('corpo-mensagem')[0];
    var bottomsheet = document.getElementsByClassName('mensagem')[0];
    var fundo = document.getElementsByClassName('area-mensagem')[0];

    bottomsheet.style.display = 'flex';
    fundo.style.display = 'flex';
    
    if(mensagem == 'help1'){
        mensagemTitulo.innerHTML = titulo1; 
        mensagemCorpo.innerHTML = help1;
    }
    if(mensagem == 'help2'){
        mensagemTitulo.innerHTML = titulo2; 
        mensagemCorpo.innerHTML = help2;
               
    }
    if(mensagem == 'help3'){
        mensagemTitulo.innerHTML = titulo3; 
        mensagemCorpo.innerHTML = help3;
               
    }
    if(mensagem == 'help4'){
        mensagemTitulo.innerHTML = titulo4; 
        mensagemCorpo.innerHTML = help4;
               
    }
    if(mensagem == 'help5'){
        mensagemTitulo.innerHTML = titulo5; 
        mensagemCorpo.innerHTML = help5;
               
    }
    if(mensagem == 'help6'){
        mensagemTitulo.innerHTML = titulo6; 
        mensagemCorpo.innerHTML = help6;
               
    }
    if(mensagem == 'help7'){
        mensagemTitulo.innerHTML = titulo7; 
        mensagemCorpo.innerHTML = help7;
       
    }
}

function fecharMensagem() {
    var bottomsheet = document.getElementsByClassName('mensagem')[0];
    var fundo = document.getElementsByClassName('area-mensagem')[0];

    bottomsheet.style.display = 'none';
    fundo.style.display = 'none';
}

function voltarHome() {
    window.location = "index.html";
}

function abrirMenuExtendido() {
    var lateral = document.getElementsByClassName('lateral')[0];
    var lateralExtendido = document.getElementsByClassName('lateral-extendido')[0];
    var dashboard = document.getElementsByClassName('dashboard-conteudo')[0];

    lateralExtendido.style.display = 'flex';
    lateral.style.display = 'none';
    dashboard.style.marginLeft = '20%';
}

function recolherMenu() {
    var lateral = document.getElementsByClassName('lateral')[0];
    var lateralExtendido = document.getElementsByClassName('lateral-extendido')[0];
    var dashboard = document.getElementsByClassName('dashboard-conteudo')[0];
    var notificacao = document.getElementsByClassName('notificacoes')[0];

    lateral.style.display = 'flex';
    lateralExtendido.style.display = 'none';
    dashboard.style.marginLeft = '5%';
    notificacao.style.display = 'none';
}

function fecharNotificacao(){
    var notificacao = document.getElementsByClassName('notificacoes')[0];

    notificacao.style.display = 'none';
}

function abrirNotificacao(){
    var notificacao = document.getElementsByClassName('notificacoes')[0];

    notificacao.style.display = 'flex';
}

function alterarCidade(){
    window.location = 'dash-medico.html';
}

function alterarDoenca(){
    var doenca = doencaSelect.value;
    var coqueluche = document.getElementsByClassName('coqueluche');
    var meningite = document.getElementsByClassName('meningite');
    var poliomielite = document.getElementsByClassName('poliomielite');
    console.log(doenca);

if(doenca == 'Coqueluche'){
    for(var i = 0; i < coqueluche.length; i++){
        coqueluche[i].style.display = 'flex';
        meningite[i].style.display = 'none';
        poliomielite[i].style.display = 'none';
    }
}else if(doenca == 'Meningite'){
    for(var j = 0; j < meningite.length; j++){
        coqueluche[j].style.display = 'none';
        meningite[j].style.display = 'flex';
        poliomielite[j].style.display = 'none';
    }
}else{
    for(var k = 0; k < poliomielite.length; k++){
        coqueluche[k].style.display = 'none';
        meningite[k].style.display = 'none';
        poliomielite[k].style.display = 'flex';
    }
}

}