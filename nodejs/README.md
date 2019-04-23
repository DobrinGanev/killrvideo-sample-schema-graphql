## killrvideo-sample-schema with GraphQL and Node.js

### Install Node.js

https://nodejs.org/en/download/

### Install all packages

`npm i`

### In the .env add your docker IP to the CASSANDRA_CONTACT_POINTS variable

you can find your docker IP with `&> docker inspect dse | grep IPAddress`

### start the graphql server

`npm run gql-server`

### GraphQL Playground

http://localhost:4000/graphq

### DataStax with Docker

`docker pull datastax/dse-server:latest`

`docker run -e DS_LICENSE=accept --memory 4g --name dse -d datastax/dse-server -g -s -k`

## ========= Status =========

## Active containers

`$> docker ps`

## Container Utilization

`$> docker stats`

## Container Details

`$> docker inspect dse`

## NodeTool Status

`$> docker exec -it dse nodetool status`

## ========== Logs ==========

## Server Logs

`$> docker logs dse`

## System Out

`$> docker exec -it dse cat /var/log/cassandra/system.log`

## ==== Start/Stop/Remove ====

## Start Container

`$> docker start dse`

## Stop Container

`$> docker stop dse`

## Remove Container

`$> docker remove dse`

## ======= Additional =======

## Contaier IPAddress

`&> docker inspect dse | grep IPAddress`

## CQL (Requires IPAddress from above)

`$> docker exec -it dse cqlsh [IPAddress]`

## Bash

`$> docker exec -it dse bash`

## Copy the schema and the inserts cql files into the docker container

`docker cp killrvideo-schema.cql containerid:/killrvideo-schema.cql`

`docker cp killrvideo-inserts.cql containerid:/killrvideo-inserts.cql`

## Execute the files with the cqlsh command in the container

`cqlsh -f killrvideo-schema.cql`

`cqlsh -f killrvideo-inserts.cql`

# Example GraphQL queries 

[Here](https://github.com/DobrinGanev/killrvideo-sample-schema-graphql/blob/master/nodejs/graphql/queries.md)
