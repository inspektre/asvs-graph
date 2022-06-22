#!/bin/bash

echo -ne '[==                  ] 10%\r'
service asvs-graphql stop


sudo rm -rf /usr/bin/asvs-graphql
sudo rm -rf /etc/neo4j/.env
sudo rm -rf /etc/neo4j/artefacts
sudo mkdir -p /etc/neo4j/artefacts
echo -ne '[====                ] 20%\r'


sudo mv /home/inspektre/artefacts/asvs-graphql /usr/bin/asvs-graphql
sudo mv /home/inspektre/artefacts/prod.env /etc/neo4j/.env
sudo mv /home/inspektre/artefacts/schema.graphql /etc/neo4j/artefacts/schema.graphql
sudo mv /home/inspektre/artefacts/api.service /etc/systemd/system/asvs-graphql.service
sudo mv /home/inspektre/artefacts/*.json /etc/neo4j/artefacts/
echo -ne '[========            ] 40%\r'


sudo rm -rf /home/inspektre/artefacts
sudo rm -rf /home/inspektre/artefacts.zip
echo -ne '[============        ] 60%\r'


sudo chown neo4j:adm /etc/neo4j/.env
sudo chown -R neo4j:adm /etc/neo4j/artefacts/*
sudo chown neo4j:adm /usr/bin/asvs-graphql
sudo chown root:root /etc/systemd/system/asvs-graphql.service
sudo systemctl enable asvs-graphql
echo -ne '[================    ] 60%\r'


sudo service asvs-graphql start
sudo service nginx reload
echo -ne '[====================] 100%\r'

echo -ne '\n'