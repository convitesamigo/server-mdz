function  Create_SocketConnection(This_selfGame) {
	This_selfGame.socket = io({
        reconnection: false,
        transports: ['websocket'],
        upgrade: false
    });

    This_selfGame.socket.on("connect", () => {
        console.log("CONNECTED! MY_ID", This_selfGame.socket.id);
        myId = This_selfGame.socket.id;

        // Get All old players in the room
        This_selfGame.socket.on("get_players_in_room", (ids) => {
            ids.forEach((id) => {
                (id == This_selfGame.socket.id) ? console.log("pass") : remotePlayers[id] = This_selfGame.add.sprite(0, 0, 'player_running_down', 1).setOrigin(0.5, 0.5).setScale(1.1,1.1).setDepth(3);
                (id == This_selfGame.socket.id) ? console.log("pass") : remotePlayersAnim[id] = { "d": 0, "r": 0 };
            });
        });

        //Get All old loots in the room
        This_selfGame.socket.on("get_old_loots", (loots) => {
            Object.keys(loots).forEach(key=>{
                Remote_Create_Local_Loot_Config(This_selfGame, key, loots[key]); //localLootManager.js
            });
        });  

    });

        //Add new players and remove in quit
    This_selfGame.socket.on("new_player_enter", (id)=>{
        //console.log("NEW_PLAYER: ", id);
        remotePlayers[id] = This_selfGame.add.sprite(100, 100, 'player_running_down', 1).setOrigin(0.5, 0.5).setScale(1.1, 1.1).setDepth(3);
        remotePlayersAnim[id] = {"d": 0, "r": 0};
    });

    This_selfGame.socket.on("new_player_close", (id)=>{
        //console.log("QUI_PLAYER: ", id);
        remotePlayers[id].destroy();
        delete remotePlayers[id];
        delete remotePlayersAnim[id];
    });

    This_selfGame.socket.on("player_toggle_running", (data)=>{
        if(data.id != This_selfGame.socket.id){
            remotePlayersAnim[data.id].r = data.r;
        }
    });
    This_selfGame.socket.on("player_toggle_running_dir", (data)=>{
        if(data.id != This_selfGame.socket.id){
            remotePlayersAnim[data.id].d = data.d;
        }
    });
    This_selfGame.socket.on("destroyLoot", (id)=>{
        remoteLoots[id].destroy();
        delete remoteLoots[id];

        /*try{
            const el = document.getElementById(id);
            if(el != null || el != undefined)
                groundINV.removeChild(el);
        }catch(err){}*/
    });
}