#!/bin/bash

# TODO: Capitalizar a primeira letra de todos os logs
# TODO: Substituir (programa instalado) para (programa já está instalado) e (programa não está instalado)
# TODO: Também adicionar função log nos outros scripts
# TODO: Adicionar arquivo .txt com todos na função log. Diretorio com logs, com titulo do horario da execução 
# TODO: Validar as permissões dentro da instância. Para não precisar rodar tudo com sudo
# TODO: Adicionar container do Java
# TODO: Adcicionar buscar arquivos xlsx e subir automanticamente na S3 durante a primeira execução da instância
# TODO: 'Deixar o código mais bonito

# Define função log

log() {
  horario=$(date +"%Y-%m-%d %T")
  mensagem="[LOG] [$horario] - $@"
  echo "$mensagem"
}

# Verifica se o usuário adm-immunodata está criado
if id "adm-immunodata" &>/dev/null;
	then
		log "usuário adm-immunodata existe"

	else
		log "usuário adm-immunodata não existe"
		log "criando usuário adm-immunodata"
		sudo adduser --disabled-password --gecos "" adm-immunodata
		log "adm-immunodata:urubu100" | sudo chpasswd
		sudo usermod -aG sudo adm-immunodata
		log "usuário adm-immunodata criado"
fi


# Verifica se AWS CLI está instalado
aws --version

if [ $? = 0 ];
	then
		log "aws cli instalado"

	else
		# Se não tiver instalado, logo é o primeiro login
                log "configurando EC2 pela primeira vez"
                sudo apt update && sudo apt upgrade -y

		log "definindo senhas do sistema"
                log "ubuntu:urubu100" | sudo chpasswd
                log "root:urubu100" | sudo chpasswd

                log "aws cli não instalado"
                log "inicializando instalação AWS CLI"

		curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

		unzip --version

		if [ $? != 0 ];
			then
				log "unzip não instalado"
				log "instalando unzip"
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
		log "java instalado"

	else
		log "java não instalado"
		log "gostaria de instalar o java? [s/n]"

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
		log "git instalado"

	else
		log "git não instalado"
		log "instalando git"

		sudo apt install -y git
fi

# Verificando se o Docker está instalado
docker --version

if [ $? = 0 ];
	then
		log "docker instalado"

	else
		log "docker não instalado"

		sudo apt install docker.io
		sudo systemctl start docker
		sudo systemctl enable docker
fi

# Verificando se o Docker-Compose está instalado
docker-compose -version

if [ $? = 0 ];
	then
		log "docker-compose instalado"

	else
		log "docker-compose não instalado"
		sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose
fi

log "apagando versão antiga dos scripts"
rm -r ./projeto-pi-2o-semestre

log "baixando nova versão"
git clone --branch release/deployment https://github.com/cynthiaangi/projeto-pi-2o-semestre.git

log "rodando script inicialização dos dockers"
sudo bash ./projeto-pi-2o-semestre/ScriptStart.sh
