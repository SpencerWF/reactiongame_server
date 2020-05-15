import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { ReactionGameRoom } from "./rooms/reactiongame";

const port = Number(process.env.PORT || 3553) + Number(process.env.NODE_APP_INSTANCE || 0);
const app = express();

app.use(cors());
app.use(express.json());

const gameServer = new Server({
  server: createServer(app),
  express: app,
  pingInterval: 0,
});

gameServer.define("reactiongame", ReactionGameRoom)
    .enableRealtimeListing();

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

app.use('/', express.static(path.join(__dirname, "static")));
console.log(`Listening on http://localhost:${ port }`);
