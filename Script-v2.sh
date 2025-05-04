#!/bin/bash

echo "limpando containers parados"
sudo docker container prune -f

echo "excluindo imagens sem utilizar"
sudo docker image prune -a -f

echo "reiniciando docker network"
sudo docker network rm network-immuno

# Docker network para os containers se comunicarem
echo "iniciando docker network"
sudo docker network create network-immuno

# Verificando se o Banco está rodando
sudo docker ps --filter "name=ContainerBanco" --filter "status=running" | grep "ContainerBanco" > /dev/null

if [ $? = 0 ];
	then
		echo "container BD rodando"

	else
		echo "container BD não rodando"

		echo "buildando docker BD"
		sudo docker build -f ./projeto-pi-2o-semestre/script_banco/Dockerfile-Sql -t imagem-bancoimmuno ./projeto-pi-2o-semestre/script_banco

		echo "rodando imagem docker"
		sudo docker run -d --name ContainerBanco --network network-immuno -p 3306:3306 imagem-bancoimmuno
fi

# Verificando se o Site está rodando
sudo docker ps --filter "name=ContainerSite" --filter "status=running" | grep "ContainerSite" > /dev/null

if [ $? = 0 ];
	then
		echo "container site rodando"

	else
		echo "container site não rodando"

		echo "definindo ipv4 da instancia"
		echo "APP_HOST=$(curl -s ifconfig.me)"
		echo "APP_HOST=$(curl -s ifconfig.me)" >> ./projeto-pi-2o-semestre/script_site/config.txt

		echo "buildando site"
		sudo docker build -f ./projeto-pi-2o-semestre/script_site/Dockerfile-Site -t imagem-siteimmuno ./projeto-pi-2o-semestre/script_site

		echo "rodando imagem docker site"
		sudo docker run -d --name ContainerSite --network network-immuno -p 80:80 imagem-siteimmuno
fi

# Verificando a presença do Java

if [[ -f "conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar" ]];
        then
                echo "arquivo java presente"

        else
                echo "arquivo java ausente"
                git checkout main

		# Verificando se o Maven está instalado
		mvn --version

		if [ $? = 0 ];
			then
				echo "maven instalado"

			else
				echo "maven não instalado"
				echo "instalando maven"
				sudo apt install maven
		fi

		cd conexao-banco-de-dados
		echo "compilando java"
		mvn clean install

		cp ./target/conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar ../../conexao-banco-de-dados-1.0-SNAPSHOT-jar-with-dependencies.jar

fi

echo "processo finalizado"
