var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xcccccc,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);

var player;
let keyA;
let keyS;
let keyD;
let keyW;
let stopedDirection = 0;
let animRunningDirection = 0;
let remotePlayers = {};
let remotePlayersAnim = {};
let myId;
let test;

function preload() {
    test = this;
    this.load.spritesheet({
        key: 'player_running_down',
        url: 'assets/images/player/player_running_down.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 4
        }
    });

    this.load.spritesheet({
        key: 'player_running_up',
        url: 'assets/images/player/player_running_up.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 4
        }
    });

    // (Other sprite loading code remains the same)

    this.load.image('treeBlock', 'assets/images/tree/tree_block-sheet1.png');

    this.load.image('tiles', ['assets/images/tilemaps/ground_lvl1_tilemap.png']);
    this.load.tilemapTiledJSON('map', 'assets/images/tilemaps/map_test.json');
}

function create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('ground_lvl1_tilemap', 'tiles');
    const layer = map.createLayer(0, tiles, 0, 0);

    this.socket = io({
        reconnection: false,
        transports: ['websocket'],
        upgrade: false
    });

    this.socket.on("connect", () => {
        console.log("CONNECTED! MY_ID", this.socket.id);
        myId = this.socket.id;

        // Get All old players in the room
        this.socket.on("get_players_in_room", (ids) => {
            ids.forEach((id) => {
                (id == this.socket.id) ? console.log("pass") : remotePlayers[id] = this.matter.add.sprite(0, 0, 'player_running_down', 1).setOrigin(0.5, 0.5);
                (id == this.socket.id) ? console.log("pass") : remotePlayersAnim[id] = { "d": 0, "r": 0 };
            });
        });
    });

    // (Other create code remains the same)

    this.anims.create({
        key: 'running_down',
        frames: this.anims.generateFrameNumbers('player_running_down'),
        frameRate: 7
    });

    // (Other anims.create code remains the same)

    treeBlock = this.matter.add.image(100, 100, 'treeBlock');

    player = this.matter.add.sprite(0, 0, 'player_running_down', 1, {
        restitution: 0.5,
        frictionAir: 0.2
    }).setOrigin(0.5, 0.5);

    // (Other player setup code remains the same)

    // (Other socket.on handlers remain the same)

    // (Other key events remain the same)
}

let lastUpdateTime = 0;

function update(time, delta) {
    // (Other update code remains the same)

    player.setVelocity(0);

    if (keys.w || keys.a || keys.s || keys.d) {
        const currentTime = Date.now();
        const timeSinceLastUpdate = currentTime - lastUpdateTime;
        const updateFrequency = 30;

        if (timeSinceLastUpdate > updateFrequency) {
            const pos = { "x": Math.round(player.x), "y": Math.round(player.y), "id": this.socket.id };
            this.socket.emit("player_pos_update", pos);
            this.socket.emit("toggle_running", 1);
            this.socket.emit("toggle_running_dir", animRunningDirection);
            lastUpdateTime = currentTime;
        }
    }

    this.socket.on("player_moved", (data) => {
        if (data.id != this.socket.id) {
            const lerpDuration = 0.02;

            const newX = Phaser.Math.Interpolation.Linear([remotePlayers[data.id].x, data.x], lerpDuration);
            const newY = Phaser.Math.Interpolation.Linear([remotePlayers[data.id].y, data.y], lerpDuration);

            remotePlayers[data.id].setPosition(newX, newY);
        }
    });

    Object.keys(remotePlayersAnim).forEach(id => {
        if (remotePlayersAnim[id].r) {
            if (remotePlayersAnim[id].d == 0) {
                remotePlayers[id].anims.play("running_up", true);
            }
            // (Other animation cases remain the same)
        } else {
            if (remotePlayersAnim[id].d == 0) {
                remotePlayers[id].anims.play("player_stopped", true);
                remotePlayers[id].setFrame(1);
            }
            // (Other animation cases remain the same)
        }
    });
}
