const http = require('http');
const cluster = require('cluster');
const socketIo = require('socket.io');
const msgpackr = require('msgpackr');

// Não é mais necessário o Express
// const express = require('express');
// const app = express();
const server = http.createServer(/*app removido*/);

//999113189
//evgpha11

// app.use(express.static(__dirname + '/public'));

let CURRENT_LOOT_ID = 4;
let serverPlayers = {};
let serverLoots = {
	"0": {"x": 200, "y": 200, "iid": 0, "it": 0, "cf": {"s": 2}},
    "1": {"x": 200, "y": 200, "iid": 1, "it": 0, "cf": {"s": 6}},

    "2": {"x": 400, "y": 200, "iid": 1, "it": 0, "cf": {"s": 1}},

    "3": {"x": 500, "y": 200, "iid": 2, "it": 1, "cf": {"s": 1, "iS": 0, "iP": 0, "iB": 0}},
    "4": {"x": 560, "y": 200, "iid": 3, "it": 1, "cf": {"iS": 1, "iP": 0, "iB": 0, "h": 75, "sd": new Array(3).fill(0)}},
};

const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log("")
    serverPlayers[socket.id] = { "x": 0, "y": 0 };
    socket.broadcast.emit("new_player_enter", socket.id);

    io.to(socket.id).emit("get_players_in_room", Object.keys(serverPlayers));
    io.to(socket.id).emit("get_old_loots", serverLoots);

    socket.on("disconnect", (reason) => {
        console.log("Cliente Saiu  - RAZAO: ", reason);
        delete serverPlayers[socket.id];
        socket.broadcast.emit("new_player_close", socket.id);
    });

    socket.on("player_pos_update", (data) => {
        socket.broadcast.emit("player_moved", data);
    });

    socket.on("toggle_running", (data) => {
        socket.broadcast.emit("player_toggle_running", { "r": data, id: socket.id });
    });

    socket.on("toggle_running_dir", (data) => {
        socket.broadcast.emit("player_toggle_running_dir", { "d": data, id: socket.id });
    });

    socket.on("pTakeLoot", (lootID)=>{
        delete serverLoots[lootID];
        socket.broadcast.emit("destroyLoot", (lootID));
    });
});1

server.listen(() => {
    const address = server.address();
    console.log(`Servidor rodando em http://${address.address}:${address.port}`);
});