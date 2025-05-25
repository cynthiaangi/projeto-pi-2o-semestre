#!/bin/bash

#############################
#                           #
#     Define função log     #
#                           #
#############################

log() {
 	horario=$(date +"%Y-%m-%d %T")
 	mensagem="[LOG SHELL] [$horario] - $@"
	echo ""
	echo -e "\e[92m$mensagem \e[0m"
}

log "Inicializado o Script de Instalação"


#############################################################
#                                                           #
#     Atualizando o ScritpSetup (presença temp no repo)     #
#                                                           #
#############################################################

log "Atualizando o ScriptSetup"
sudo cp ./projeto-pi-2o-semestre/ScriptSetup.sh ./ScriptSetup.sh


#######################################################
#                                                     #
#     Apaga containers parados para atualizar-los     #
#                                                     #
#######################################################

log "Limpando containers parados"
sudo docker container prune -f

log "Excluindo imagens sem utilizar"
sudo docker image prune -a -f


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
				DOCKER_TOKEN_INSERIDO=$(grep '^DOCKER_TOKEN=' ./vars/env.txt | cut -d'=' -f2-)
				export DOCKER_TOKEN=$DOCKER_TOKEN_INSERIDO
				log "Configurando o Docker Token na instância"
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
		sudo docker build -f ./projeto-pi-2o-semestre/script_banco/Dockerfile-Sql -t imagem-bancoimmuno:latest ./projeto-pi-2o-semestre/script_banco

		log "Atribuindo tag à imagem banco"
		sudo docker image tag imagem-bancoimmuno:latest fabiamdamaceno/projeto-pi-2o-semestre:banco-latest

		log "Subindo imagem no docker hub"
		sudo docker push fabiamdamaceno/projeto-pi-2o-semestre:banco-latest
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
		sudo docker build -f ./projeto-pi-2o-semestre/script_site/Dockerfile-Site -t imagem-siteimmuno:latest ./projeto-pi-2o-semestre/script_site

		log "Atribuindo tag à imagem site"
		sudo docker image tag imagem-siteimmuno:latest fabiamdamaceno/projeto-pi-2o-semestre:site-latest

		log "Subindo imagem no docker hub"
		sudo docker push fabiamdamaceno/projeto-pi-2o-semestre:site-latest
fi


####################################################
#                                                   #
#     Verifica se o Container Java está rodando     #
#                                                   #
#####################################################

log "Acessando o diretório do projeto"
cd ./projeto-pi-2o-semestre

# sudo docker ps --filter name=ContainerJava --filter status=running | grep ContainerJava > /dev/null - codigo antigo, apaguei as aspas
ls ../conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar > /dev/null 2>&1

if [ $? = 0 ];
	then
		log "JAR encontrado na instância"

	else
        	log "JAR não encontrado na instância"
        	git checkout -f release/java

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

		# Retorna para o inicio do repositório
		cd ../
		git checkout -f release/deployment
		cp ../conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar ./script_java/conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar

		log "Buildando docker Java"
		ls
		sudo docker build -f ./script_java/Dockerfile-Java -t imagem-javaimmuno:latest ./script_java

		log "Atribuindo tag à imagem java"
		sudo docker image tag imagem-javaimmuno:latest fabiamdamaceno/projeto-pi-2o-semestre:java-latest

		log "Subindo imagem no docker hub"
		sudo docker push fabiamdamaceno/projeto-pi-2o-semestre:java-latest
fi


####################################
#                                  #
#     Executa o Docker Compose     #
#                                  #
####################################

if docker-compose ps --status running | grep -q "Up";
	then
		log "Docker Compose está rodando."

		log "Verificando quais serviços que estão rodando"
		SERVICO=mysql
		STATUS=$(docker-compose ps --status running --services | grep -w "$SERVICO")

		if [ "$STATUS" = "$SERVICO" ];
			then
				log "Serviço $SERVICO está rodando."

			else
				log "Serviço $SERVICO não está rodando."
				log "Inicializando o serviço $SERVICO"
				sudo docker-compose up -d "$SERVICO"
		fi

		SERVICO=web
		STATUS=$(docker-compose ps --status running --services | grep -w "$SERVICO")

		if [ "$STATUS" = "$SERVICO" ]; then
			log "Serviço $SERVICO está rodando."

		else
			log "Serviço $SERVICO não está rodando."
			log "Inicializando o serviço $SERVICO"
			sudo docker-compose up -d "$SERVICO"
		fi
	else
		log "Docker Compose não está rodando."
		log "Executando Docker-Compose com o comando up"
		sudo docker-compose up -d mysql
		sudo docker-compose up -d web
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

EOF
