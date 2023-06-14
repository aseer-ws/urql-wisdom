import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { connectDB } from "./database/index";
import { buildSchema } from "type-graphql";
import { MessageResolver } from "./resolvers/message";
import { verifyToken } from "./utils";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

const initServer = async () => {
  await connectDB();

  const app = express();

  const httpServer = createServer(app);

  app.use(express.json());

  app.use(cors({ origin: ["http://localhost:4321"] }));

  const schema = await buildSchema({ resolvers: [MessageResolver] });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer<{ name?: string }>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        try {
          const token = req.headers.authorization.split("Bearer ")[1];
          const payload = verifyToken(token);
          return payload;
        } catch (error) {
          return {};
        }
      },
    })
  );

  httpServer.listen(1234, () => {
    console.log("Server started on http://locahost:1234");
  });
};

initServer();
