#!/bin/bash

# Adding user inspektre with SSH Key Login
useradd -m -d /home/inspektre -s $(which bash) inspektre
echo "inspektre ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
su - inspektre -c "mkdir ~/.ssh; echo \"ssh-pubkey-here\" >> ~/.ssh/authorized_keys"

# Update headers and install dependencies
apt update
apt install -y wget unzip apt-transport-https ca-certificates curl software-properties-common default-jre

# Get neo4j Headers
wget -O - https://debian.neo4j.com/neotechnology.gpg.key | apt-key add -
echo 'deb https://debian.neo4j.com stable latest' | tee -a /etc/apt/sources.list.d/neo4j.list
apt-get update

# Prepare for neo4j auto installation and enable service in systemctl
apt install -y neo4j=1:4.4.8 nginx
systemctl enable neo4j

# Install Neo4j Plugins
cd /var/lib/neo4j/plugins
rm -rf apoc*.jar
rm -rf neo4j-graph-data-science*.jar
wget https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/4.4.0.6/apoc-4.4.0.6-all.jar
wget https://graphdatascience.ninja/neo4j-graph-data-science-2.1.2.zip
unzip neo4j-graph-data-science-*.zip
rm neo4j-graph-data-science-*.zip
rm -rf *.zip
chgrp -R adm *
chmod -R g+rx *
chown -R neo4j *
cd -

# Set a default Password
neo4j-admin set-initial-password <changed-default-the-neo4j-creds-here>
service neo4j start
service nginx start

# Install Certbot - to be configured later for https with nginx
snap install core
snap refresh core
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot