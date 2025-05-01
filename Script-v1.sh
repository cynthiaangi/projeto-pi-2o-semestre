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

echo "buildando docker BD"
sudo docker build -f ./projeto-pi-2o-semestre/script_banco/Dockerfile-Sql -t imagem-bancoimmuno ./projeto-pi-2o-semestre/script_banco

echo "rodando imagem docker"
sudo docker run -d --name ContainerBanco -p 3306:3306 imagem-bancoimmuno

echo "buildando site"
sudo docker build -f ./projeto-pi-2o-semestre/script_site/Dockerfile-Site -t imagem-siteimmuno ./projeto-pi-2o-semestre/script_site

echo "rodando imagem docker site"
sudo docker run -d --name ContainerSite -p 3333:3333 imagem-siteimmuno
