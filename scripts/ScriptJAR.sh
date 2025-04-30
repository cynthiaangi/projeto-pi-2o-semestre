#!/bin/bash

aws s3 cp s3://immuno-data-bucket/estadoSP_doencas.xlsx /home/ubuntu/

aws s3 cp s3://immuno-data-bucket/estadoSP_vacinas-19-22.xlsx /home/ubuntu/

aws s3 cp s3://immuno-data-bucket/estadoSP_vacinas-23-24.xlsx /home/ubuntu/

java -jar TimeLogger.jar
