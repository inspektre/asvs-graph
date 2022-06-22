## Service Defition

Service definition is located here as `api.service` and needs to be `/etc/systemd/system/asvs-graphql.service` on a target Ubutnu server.



# Ensure to have Environment file and Schema

1. `/etc/neo4j/.env` and ensure to set `NODE_ENV="production"`
2. `/etc/neo4j/schema.graphql`


extend type Asvs @auth(rules: [{ operations: [READ, CREATE, UPDATE, DELETE, CONNECT, DISCONNECT], isAuthenticated: false }])