#!/bin/bash

java -version

if [ $? = 0 ];
	then
		echo "java instalado"

	else 
		echo "java não instalado"
		echo "gostaria de instalar o java [s/n]"

		read get

	if [ \"$get\" == \"s\" ];
		then
		sudo apt install openjdk-17-jre -y

	fi
fi


echo "limpando containers parados"
sudo docker container prune -f

echo "excluindo imagens"
sudo docker image prune -a -f

echo "reiniciando docker network"
sudo docker network rm network-immuno

echo "iniciando docker network"
sudo docker network create network-immuno

echo "buildando docker BD"
sudo docker build -f ./projeto-pi-2o-semestre/script_banco/Dockerfile-Sql -t imagem-bancoimmuno ./projeto-pi-2o-semestre/script_banco

echo "rodando imagem docker"
sudo docker run -d --name ContainerBanco --network network-immuno -p 3306:3306 imagem-bancoimmuno

echo "definindo ipv4 da instancia"
echo "APP_HOST=$(curl -s ifconfig.me)"
echo "APP_HOST=$(curl -s ifconfig.me)" >> ./projeto-pi-2o-semestre/script_site/config.txt

echo "buildando site"
sudo docker build -f ./projeto-pi-2o-semestre/script_site/Dockerfile-Site -t imagem-siteimmuno ./projeto-pi-2o-semestre/script_site

echo "rodando imagem docker site"
sudo docker run -d --name ContainerSite --network network-immuno -p 80:80 imagem-siteimmuno
