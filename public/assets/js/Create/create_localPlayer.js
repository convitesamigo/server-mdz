let player = null;

function Create_LocalPlayer(_selfGame){
    player = _selfGame.matter.add.sprite(0, 0, 'player_running_down', 1, {
        fixedRotation: true,
        restitution: 0.5,
        frictionAir: 0.2
    }).setDepth(3);


    if(player != null){
        player.setOrigin(0.5, 0.5);
        player.setScale(1.1,1.1)
        player.setFixedRotation();
    }else{
        alert("ERROR!", "Nao foi Possivel Criar seu Player");
    }

}