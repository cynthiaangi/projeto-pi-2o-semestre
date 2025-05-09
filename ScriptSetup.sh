#!/bin/bash

# Define função log

log() {
  horario=$(date +"%Y-%m-%d %T")
  mensagem="$horario - $@"
  echo "$mensagem"
}

# Verifica se o usuário adm-immunodata está criado
if id "adm-immunodata" &>/dev/null;
	then
		log "usuário adm-immunodata existe"

	else
		echo "usuário adm-immunodata não existe"
		echo "criando usuário adm-immunodata"
		sudo adduser --disabled-password --gecos "" adm-immunodata
		echo "adm-immunodata:urubu100" | sudo chpasswd
		sudo usermod -aG sudo adm-immunodata
		echo "usuário adm-immunodata criado"
fi


# Verifica se AWS CLI está instalado
aws --version

if [ $? = 0 ];
	then
		log "aws cli instalado"

	else
		# Se não tiver instalado, logo é o primeiro login
                echo "configurando EC2 pela primeira vez"
                sudo apt update && sudo apt upgrade -y

		echo "definindo senhas do sistema"
                echo "ubuntu:urubu100" | sudo chpasswd
                echo "root:urubu100" | sudo chpasswd

                echo "aws cli não instalado"
                echo "inicializando instalação AWS CLI"

		curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

		unzip --version

		if [ $? != 0 ];
			then
				echo "unzip não instalado"
				echo "instalando unzip"
				sudo apt install unzip

		fi

		unzip awscliv2.zip
		rm awscliv2.zip
		sudo ./aws/install
fi

# Verificando se o Java está instalado
java -version

if [ $? = 0 ];
	then
		echo "java instalado"

	else
		echo "java não instalado"
		echo "gostaria de instalar o java? [s/n]"

		read get

		if [ \"$get\" == \"s\" ];
			then
				sudo apt install openjdk-21-jre

		fi
fi

# Verificando se o Git está instalado
git --version

if [ $? = 0 ];
	then
		echo "git instalado"

	else
		echo "git não instalado"
		echo "instalando git"

		sudo apt install -y git
fi

# Verificando se o Docker está instalado
docker --version

if [ $? = 0 ];
	then
		echo "docker instalado"

	else
		echo "docker não instalado"

		sudo apt install docker.io
		sudo systemctl start docker
		sudo systemctl enable docker
fi

# Verificando se o Docker-Compose está instalado
docker-compose -version

if [ $? = 0];
	then
		echo "docker-compose instalado"

	else
		echo "docker-compose não instalado"
		sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose
fi

echo "apagando versão antiga dos scripts"
rm -r ./projeto-pi-2o-semestre

echo "baixando nova versão"
git clone --branch release/deployment https://github.com/cynthiaangi/projeto-pi-2o-semestre.git

echo "rodando script inicialização dos dockers"
sudo bash ./projeto-pi-2o-semestre/ScriptStart.sh
