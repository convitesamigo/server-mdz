
let keyA;
let keyS;
let keyD;
let keyW;
let keys = null;

function Create_KeyBoradStart(_selfGame){

    keyA = _selfGame.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = _selfGame.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = _selfGame.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = _selfGame.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys = {"w": 0, "a": 0, "s": 0,  "d": 0};

    //DOWN
    keyW.on('down', (event)=>{
        keys.w = 1;
    });
    keyS.on('down', (event)=> {
        keys.s = 1;
    });
    keyA.on('down', (event)=> {
        keys.a = 1;
    });
    keyD.on('down', (event)=>{
        keys.d = 1;
    });

    //RELEASE
    keyW.on('up', (event)=> {
        keys.w = 0;
        player.anims.play("player_stopped", true);
        player.setFrame(1);
        _selfGame.socket.emit("toggle_running", 0);
    });
    keyS.on('up', (event)=> {
        keys.s = 0;
        player.anims.play("player_stopped", true);
        player.setFrame(0);
        _selfGame.socket.emit("toggle_running", 0);
    });
    keyA.on('up', (event)=> {
        keys.a = 0;
        player.anims.play("player_stopped", true);
        player.setFrame(3);
        _selfGame.socket.emit("toggle_running", 0);
    });
    keyD.on('up', (event)=> {
        keys.d = 0;
        player.anims.play("player_stopped", true);
        player.setFrame(2);
        _selfGame.socket.emit("toggle_running", 0);
    });
}