#!/bin/bash

# TODO: Também adicionar função log nos outros scripts
# TODO: Adicionar arquivo .txt com todos na função log. Diretorio com logs, com titulo do horario da execução
# TODO: Validar as permissões dentro da instância. Para não precisar rodar tudo com sudo
# TODO: Adicionar container do Java
# TODO: Adcionar buscar arquivos xlsx e subir automanticamente na S3 durante a primeira execução da instância
# TODO: ScriptStart atualizar a versão do ScriptSetup.sh
# TODO: Definir versão sql no Dockerfile, lastest não é bom
# TODO: Verificar se docker network está rodando, antes de iniciar outra - Verificar como ficará o Docker Network com o Docker Compose
# TODO: Terminar de comentar código do ScriptStar.sh

#########################################################
#                                                       #
#     Ínicio do Script de Configuração da Instância     #
#                                                       #
#########################################################

cat << 'EOF'
________ _______  _______           _        _______  ______   _______ _________ _______ 
\__   __/(       )(       )|\     /|( (    /|(  ___  )(  __  \ (  ___  )\__   __/(  ___  )
   ) (   | () () || () () || )   ( ||  \  ( || (   ) || (  \  )| (   ) |   ) (   | (   ) |
   | |   | || || || || || || |   | ||   \ | || |   | || |   ) || (___) |   | |   | (___) |
   | |   | |(_)| || |(_)| || |   | || (\ \) || |   | || |   | ||  ___  |   | |   |  ___  |
   | |   | |   | || |   | || |   | || | \   || |   | || |   ) || (   ) |   | |   | (   ) |
___) (___| )   ( || )   ( || (___) || )  \  || (___) || (__/  )| )   ( |   | |   | )   ( |
\_______/|/     \||/     \|(_______)|/    )_)(_______)(______/ |/     \|   )_(   |/     \|
                                                                                          
EOF # Printa Immunodata
sleep 2 # Aguarda alguns segundos para o usuário apreciar a logo


#############################
#                           #
#     Define função log     #
#                           #
#############################

log() {
  horario=$(date +"%Y-%m-%d %T")
  mensagem="[LOG SHELL] [$horario] - $@"
  echo "$mensagem"
}

log "Inicializado o Script de Instalação"


############################################################
#                                                          #
#     Verifica se o usuário adm-immunodata está criado     #
#                                                          #
############################################################

if id "adm-immunodata" &>/dev/null;
	then
		log "Usuário adm-immunodata encontrado"

	else
                log "Configurando EC2 pela primeira vez"
                sudo apt update && sudo apt upgrade -y

                log "Definindo senhas do sistema"
                echo "ubuntu:urubu100" | sudo chpasswd
                echo "root:urubu100" | sudo chpasswd


		log "Usuário adm-immunodata não encontrado"
		log "Criando usuário adm-immunodata"
		sudo adduser --disabled-password --gecos "" adm-immunodata
		echo "Adm-immunodata:urubu100" | sudo chpasswd
		sudo usermod -aG sudo adm-immunodata
		log "Usuário adm-immunodata criado"
fi


##############################################
#                                            #
#     Verifica se AWS CLI está instalado     #
#                                            #
##############################################

aws --version

if [ $? = 0 ];
	then
		log "Ferramenta AWS CLI encontrada"

	else
                log "Ferramenta AWS CLI  não encontrada"
                log "inicializando instalação AWS CLI"

		curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

		unzip --version

		if [ $? != 0 ];
			then
				log "Utilidade Unzip não encontrada"
				log "Instalando Unzip"
				sudo apt install unzip

		fi

		unzip awscliv2.zip
		rm awscliv2.zip
		sudo ./aws/install
fi


#############################################
#                                           #
#     Verifica se o Java está instalado     #
#                                           #
#############################################

java -version

if [ $? = 0 ];
	then
		log "Kit Java encontrado"

	else
		log "Kit Java não encontrado"
		log "Instalando o Java"
		sudo apt install openjdk-21-jre

fi


###############################################
#                                             #
#     Verificando se o Git está instalado     #
#                                             #
###############################################

git --version

if [ $? = 0 ];
	then
		log "Ferramenta Git encontrada"

	else
		log "Ferramenta Git não encontrada"

		log "Instalando Git"
		sudo apt install -y git
fi


##################################################
#                                                #
#     Verificando se o Docker está instalado     #
#                                                #
##################################################

docker --version

if [ $? = 0 ];
	then
		log "Ferramenta Docker encontrada"

	else
		log "Ferramenta Docker não encontrada"

		log "Instalando Docker"
		sudo apt install docker.io
		sudo systemctl start docker
		sudo systemctl enable docker
fi


##########################################################
#                                                        #
#     Verificando se o Docker-Compose está instalado     #
#                                                        #
##########################################################

docker-compose -version

if [ $? = 0 ];
	then
		log "Ferramenta Docker-compose encontrada"

	else
		log "Ferramenta docker-compose não instalado"
		sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose
fi


##############################################
#                                            #
#     Busca as novas versões dos scripts     #
#                                            #
##############################################

log "Apagando versão antiga dos scripts"
rm -r ./projeto-pi-2o-semestre

log "Baixando nova versão dos scripts"
git clone --branch release/deployment https://github.com/cynthiaangi/projeto-pi-2o-semestre.git


###########################################################
#                                                         #
#     Inicializa o Script de Configuração dos Dockers     #
#                                                         #
###########################################################

log "Inicializado script de construção dos dockers"
sudo bash ./projeto-pi-2o-semestre/ScriptStart.sh
