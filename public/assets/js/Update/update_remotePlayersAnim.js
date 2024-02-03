function Update_RemotePlayersAnim(_selfgame){
    Object.keys(remotePlayersAnim).forEach(id=>{
        if(remotePlayersAnim[id].r){
            if(remotePlayersAnim[id].d == 0){
                remotePlayers[id].anims.play("running_up", true);
            }
            if(remotePlayersAnim[id].d == 1){
                remotePlayers[id].anims.play("running_down", true);
            }
            if(remotePlayersAnim[id].d == 2){
                remotePlayers[id].anims.play("player_running_left", true);
            }
            if(remotePlayersAnim[id].d == 3){
                remotePlayers[id].anims.play("player_running_right", true);
            }
        }else{
            if(remotePlayersAnim[id].d == 0){
                remotePlayers[id].anims.play("player_stopped", true);
                remotePlayers[id].setFrame(1);
            }
            if(remotePlayersAnim[id].d == 1){
                remotePlayers[id].anims.play("player_stopped", true);
                remotePlayers[id].setFrame(0);
            }
            if(remotePlayersAnim[id].d == 2){
                remotePlayers[id].anims.play("player_stopped", true);
                remotePlayers[id].setFrame(3);
            }
            if(remotePlayersAnim[id].d == 3){
                remotePlayers[id].anims.play("player_stopped", true);
                remotePlayers[id].setFrame(2);
            }
        }
    });
}