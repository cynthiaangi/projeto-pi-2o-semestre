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

echo "atualizando instância"
sudo apt-get update

echo "instalando o git"
sudo apt-get install -y git

echo "baixando repositorio"
git clone "git@github.com:cynthiaangi/projeto-pi-2o-semestre.git"

echo "extraindo arquivos docker"

echo "limpando containers parados"
sudo docker container prune -f

echo "excluindo imagens"
sudo docker image prune -a -f

echo "buildando docker BD"
sudo docker build -f ./script_banco/Dockerfile-Sql -t imagem-bancoimmuno .

echo "rodando imagem docker"
sudo docker run -d --name ContainerBanco -p 3306:3306 imagem-bancoimmuno

echo "buildando site"
sudo docker build -f ./script_site/Dockerfile-Site -t imagem-siteimmuno .

echo "rodando imagem docker site"
sudo docker run -d --name ContainerSite -p 3333:3333 imagem-siteimmuno
