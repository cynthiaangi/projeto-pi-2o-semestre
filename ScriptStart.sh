#!/bin/bash

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

log "Limpando containers parados"
sudo docker container prune -f

log "Excluindo imagens sem utilizar"
sudo docker image prune -a -f

Log "Reiniciando docker network"
sudo docker network rm network-immuno


############################################################
#                                                          #
#     Docker network para os containers se comunicarem     #
#                                                          #
############################################################

log "Iniciando docker network"
sudo docker network create network-immuno


############################################
#                                          #
#     Verifica a conexão ao Docker Hub     #
#                                          #
############################################

if docker info | grep -q Username;
	then
		log "Conexão Docker Hub detectada"

	else
		log "Conexão Docker Hub não detectada"

		log "Logando no Docker"

		if [[ -n $DOCKER_TOKEN ]];
        		then
                		log "Docker Token encontrado na instância"

        		else
		                log "Docker Token não encontrado na instância"
                		read -p "Insira o docker token: " DOCKER_TOKEN_INSERIDO
				export DOCKER_TOKEN=$DOCKER_TOKEN_INSERIDO
l				log "Configurando o Docker Token na instância"
                		echo "export DOCKER_TOKEN=$DOCKER_TOKEN_INSERIDO" >> env.sh
		fi

		log "Estabelecendo conexão Docker Hub"
		echo "$DOCKER_TOKEN" | docker login -u fabiamdamaceno --password-stdin
fi


######################################################
#                                                    #
#     Verifica se o Container Banco está rodando     #
#                                                    #
######################################################

sudo docker ps --filter "name=ContainerBanco" --filter "status=running" | grep "ContainerBanco" > /dev/null

if [ $? = 0 ];
	then
		log "Container BD encontra-se em execução"

	else
		log "Container BD não encontra-se em execução"

		log "Buildando docker BD"
		sudo docker build -f ./projeto-pi-2o-semestre/script_banco/Dockerfile-Sql -t imagem-bancoimmuno ./projeto-pi-2o-semestre/script_banco

		log "Atribuindo tag à imagem site"
		sudo docker image tag imagem-bancoimmuno:latest fabiamdamaceno/imagem-bancoimmuno:latest

		log "Subindo imagem no docker hub"
		sudo docker push fabiamdamaceno/projeto-pi-2o-semestre:lastest

		# Comando 'outdated
		# log "Rodando imagem docker
		# sudo docker run -d --name ContainerBanco --network network-immuno -p 3306:3306 imagem-bancoimmuno
fi


#####################################################
#                                                   #
#     Verifica se o Container Site está rodando     #
#                                                   #
#####################################################

sudo docker ps --filter "name=ContainerSite" --filter "status=running" | grep "ContainerSite" > /dev/null

if [ $? = 0 ];
	then
		log "Container site encontra-se em execução"

	else
		log "Container site não encontra-se em execução"

		log "Definindo ipv4 da instancia"
		echo "APP_HOST=$(curl -s ifconfig.me)"
		echo "APP_HOST=$(curl -s ifconfig.me)" >> ./projeto-pi-2o-semestre/script_site/config.txt

		log "Buildando site"
		sudo docker build -f ./projeto-pi-2o-semestre/script_site/Dockerfile-Site -t imagem-siteimmuno ./projeto-pi-2o-semestre/script_site

		# Comando 'outdated
		# log "Rodando imagem docker site
		# sudo docker run -d --name ContainerSite --network network-immuno -p 80:80 imagem-siteimmuno
fi


##############################################
#                                            #
#     Verifica a presença do .JAR do ETL     #
#                                            #
##############################################

if [[ -f "conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar" ]];
        then
                log "Arquivo .JAR encontrado"

        else
                log "Arquivo .JAR naõ encontrado"
		cd ./projeto-pi-2o-semestre
                git checkout main

		# Verificando se o Maven está instalado
		mvn --version

		if [ $? = 0 ];
			then
				log "Ferramenta Maven encontrada"

			else
				log "Ferramenta Maven não encontrada"
				log "Instalando maven"
				sudo apt install maven
		fi

		cd ./conexao-banco-de-dados
		log "Compilando o código java para .JAR"
		mvn clean install

		cp ./target/conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar ../../conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar

fi

log "Processo finalizado"

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
