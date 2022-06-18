#!/bin/bash

# To be run as a sudoer

service neo4j stop

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

service neo4j start