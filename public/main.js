var config = {
    type: Phaser.AUTO,
    backgroundColor: 0xcccccc,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        width: "100%",
        height: "100%",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    plugins: {
    global: [
      {
        key: "VirtualJoystick",
        plugin: rexvirtualjoystickplugin,
        mapping: "joystickPlugin"
      }
    ]
  }
};

var game = new Phaser.Game(config);

let stopedDirection = 0;
let animRunningDirection = 0;
let remotePlayers = {};
let remotePlayersAnim = {};
let remoteLoots = {};
let myId;
let test;

function preload() {    

    const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexanchorplugin.min.js';
    this.load.plugin('rexanchorplugin', url, true);

    //UpdateAllSlots();

    Load_Assets(this);
}

function create() {

    //setInterval(()=>{this.scale.startFullscreen()}, 1000);
    Create_TileMaps(this);
    Create_ObjectShapes(this);
    Create_SocketConnection(this);
    Create_CollisionRegister(this);
    Create_PlayerLocalAnims(this);
    Create_LocalPlayer(this);
    Create_CameraStart(this);
    Create_KeyBoradStart(this);

    //MAP
    this.matter.world.setBounds(0, 0, 13000, 13000);
    Create_StaticsTrees(this);


    //this.matter.world.createDebugGraphic();


    joystick = this.joystickPlugin.add(this, {
        x: 100,
        y: window.innerHeight - 100,
        radius: 60,
        fixed: true,
        base: this.add.sprite(0, 0, 'gamePad_base').setScale(0.7, 0.7),
        thumb: this.add.sprite(0, 0, 'gamePad_sick').setScale(0.7, 0.7)
      }).on("update", (data)=>{
      }, this);
    JoyStickControls(this, joystick);

    button  = this.add.image(100,100, 'gui_button_inventory');
    button.depth = 3;
    button.setScale(1.5, 1.5) 
    button.setScrollFactor(0,0)
    button.x = this.cameras.main.width - button.width;
    button.y = this.cameras.main.height - button.height;
    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width-10, button.height), Phaser.Geom.Rectangle.Contains)
    button.on('pointerdown', ()=>{alert("INV")})


}


let lastUpdateTime = 0;
function update(time, delta) {

    Update_LocalPlayerMovement(this, time, delta);
    Update_LocalPlayerMovementJoystick(this);

    this.socket.on("player_moved", (data)=>{
        //console.log(new_dat);

        if(data.id != this.socket.id){
            const lerpDuration = 0.02;

            const newX = Phaser.Math.Interpolation.Linear([remotePlayers[data.id].x, data.x], lerpDuration);
            const newY = Phaser.Math.Interpolation.Linear([remotePlayers[data.id].y, data.y], lerpDuration);

            remotePlayers[data.id].setPosition(newX, newY)
            //remotePlayers[data.id].setPosition(data.x, data.y);
        }
    });

    Update_RemotePlayersAnim(this);
}
