import { createServer } from "http";
import { EventEmitter } from "events";
import { ApolloServer } from "apollo-server";
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginDrainHttpServer, AuthenticationError } from "apollo-server-core";
import { readFileSync } from "fs";
import { Neo4jGraphQL }from "@neo4j/graphql";
import { OGM } from "@neo4j/graphql-ogm";
import { Neo4jGraphQLAuthJWKSPlugin } from "@neo4j/graphql-plugin-auth";
import jwt from "jsonwebtoken";
import neo4j from "neo4j-driver";
import * as dotenv from 'dotenv';
import { WebSocketServer } from "ws"
import { stdout } from "process";
import resolvers from './resolvers';

dotenv.config();

const typeDefs = readFileSync(process.cwd().concat('/artefacts/schema.graphql')).toString('utf-8');

class SubscriptionsPlugin {
  events: EventEmitter;
  constructor() {
      this.events = new EventEmitter();
  }

  publish(eventMeta: any) {
      this.events.emit(eventMeta.event, eventMeta);
  }
}

const driver: typeof neo4j.Driver = neo4j.driver(process.env.NEO4J_URI as string, neo4j.auth.basic(process.env.NEO4J_USER as string, process.env.NEO4J_PASSWORD as string));


const neoSchema = new Neo4jGraphQL({ 
  typeDefs,
  resolvers,
  driver,
  plugins: {
    auth: new Neo4jGraphQLAuthJWKSPlugin({
      jwksEndpoint: process.env.JWKS_URL as string,
      rolesPath: "https://inspektre\\.com/roles"
    }),
    subscriptions: new SubscriptionsPlugin(),
  }
});

async function main() {
  const PORT = process.env.PORT || 4000;
  const app = express();
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const schema = await neoSchema.getSchema();

  const serverCleanup = useServer({
    schema
  }, wsServer);

  const ogm = new OGM({
    typeDefs,
    driver,
  });

  await ogm.init();
  
  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV === 'production' ? false: true,
    csrfPrevention: process.env.NODE_ENV === 'production',
    plugins: [
        ApolloServerPluginDrainHttpServer({
            httpServer
        }),
        process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
        // : ApolloServerPluginLandingPageLocalDefault({ footer: true }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
    context: ({ req }) => {
      // const token: string | null = req.headers.authorization || null;
      // TO-DO: Verify Token with JWKS here as well.
      // Schema includes Authorization
      // if (!token) throw new AuthenticationError('Unauthorized');
      return { ogm, driver, req }
    },
  });

  server.listen().then(({ url }) => {
    stdout.write(`🚀 [+] ${process.env.NODE_ENV} Server ready at ${url} CWD: ${process.cwd()}\n`);
  }).catch((err: any) => {
    console.error(err);
  })
}

main()