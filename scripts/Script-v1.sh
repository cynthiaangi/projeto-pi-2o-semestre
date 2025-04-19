#!/bin/bash

java -version

if [ $? = 0 ];
	then
		echo "java instalado"

	else
		echo "java não instalado"
		echo "gostaria de instalar o java?"

		read get

	if [ \"$get\" == \"s\" ];

		then
			sudo apt install openjdk-17-jre -y

	fi

fi
