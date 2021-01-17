import Express from "express";
import Http from "http";
import SocketIO from "socket.io";
import Player from "./Player";
import HttpHandler from "./HttpHandler";
import SocketHandler from "./SocketHandler";
import * as Config from "./Configuration";

// Servers
const EXPRESS = Express();
const HTTP = Http.createServer(EXPRESS);
const IO = SocketIO(HTTP);

// State
const PLAYER = new Player();

// Serving static front-end web page
EXPRESS.use(Express.static(`${__dirname}/${Config.STATIC_SERVE_DIR}`));

// Register backend API methods
HttpHandler(EXPRESS, PLAYER);

// Register backend SocketIO methods
SocketHandler(IO, PLAYER);

// Any unknown paths will be re-routed to default front-end. For single-page frameworks this is absolutely necessary
EXPRESS.get("*", (req, res) => {
    res.sendFile((`${__dirname}/${Config.STATIC_SERVE_DIR}/${Config.FRONT_INDEX_FILE}`));
});

// Start the server
HTTP.listen(Config.PORT, () => {
    console.log(`Server is listening on ${Config.PORT}`);
});
