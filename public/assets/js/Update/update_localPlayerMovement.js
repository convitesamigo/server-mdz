function Update_LocalPlayerMovement(_selfgame, _time, _delta) {

    player.setVelocity(0);
    //player.setAngle(0)


    if (keys.w) {
        if (keys.a) {
            player.anims.play("player_running_left", true);
            stopedDirection = 2;
            animRunningDirection = 2;
        } else if (keys.d) {
            player.anims.play("player_running_right", true);
            stopedDirection = 1;
            animRunningDirection = 3;
        } else {
            player.anims.play("running_up", true);
            stopedDirection = 0;
            animRunningDirection = 0;
        }
    } else if (keys.s) {
        if (keys.a) {
            player.anims.play("player_running_left", true);
            stopedDirection = 2;
            animRunningDirection = 2;
        } else if (keys.d) {
            player.anims.play("player_running_right", true);
            stopedDirection = 1;
            animRunningDirection = 3;
        } else {
            player.anims.play("running_down", true);
            stopedDirection = 1;
            animRunningDirection = 1;
        }
    } else if (keys.a) {
        player.anims.play("player_running_left", true);
        stopedDirection = 2;
        animRunningDirection = 2;
    } else if (keys.d) {
        player.anims.play("player_running_right", true);
        stopedDirection = 2;
        animRunningDirection = 3;
    }


    if (keyA.isDown) {
        player.setVelocityX(-3);
    } else if (keyD.isDown) {
        player.setVelocityX(3);
    }

    if (keyW.isDown) {
        player.setVelocityY(-3);
    } else if (keyS.isDown) {
        player.setVelocityY(3);
    }

    if (keys.w && keys.a || keys.w && keys.d || keys.s && keys.a || keys.s && keys.d) {
        let movementVector = new Phaser.Math.Vector2(0, 0);

        if (keyW.isDown) movementVector.y = -1;
        if (keyS.isDown) movementVector.y = 1;
        if (keyA.isDown) movementVector.x = -1;
        if (keyD.isDown) movementVector.x = 1;

        movementVector.normalize();

        const speed = 3;
        player.setVelocity(movementVector.x * speed, movementVector.y * speed);

    }


    if (keys.w || keys.a || keys.s || keys.d) {
        const currentTime = Date.now();
        const timeSinceLastUpdate = currentTime - lastUpdateTime;
        const updateFrequency = 20;

        if (timeSinceLastUpdate > updateFrequency) {
            const pos = {
                "x": Math.round(player.x),
                "y": Math.round(player.y),
                "id": _selfgame.socket.id
            };
            _selfgame.socket.emit("player_pos_update", pos);
            _selfgame.socket.emit("toggle_running", 1);
            _selfgame.socket.emit("toggle_running_dir", animRunningDirection);
            lastUpdateTime = currentTime;
        }
    }
}

let lastMobileStopedAnim = 0;
let isJoyStickDown = false;

function JoyStickControls(_selfgame, _joystick){
    player.setVelocity(0);

    _joystick.on('update', function(){

    });
    _joystick.on('pointerdown', function(){
        isJoyStickDown = true;
    });
    _joystick.on('pointerup', function(){
        
        player.anims.play("player_stopped", true);
        player.setFrame(lastMobileStopedAnim);
        _selfgame.socket.emit("toggle_running", 0);

        isJoyStickDown = false;


    });
}

function Update_LocalPlayerMovementJoystick(_selfgame) {
    if (joystick.up) {
        lastMobileStopedAnim = 1;
        if (joystick.left) {
            player.anims.play("player_running_left", true);
            stopedDirection = 2;
            animRunningDirection = 2;
            lastMobileStopedAnim = 3;
        } else if (joystick.right) {
            player.anims.play("player_running_right", true);
            stopedDirection = 1;
            animRunningDirection = 3;
            lastMobileStopedAnim = 2;
        } else {
            player.anims.play("running_up", true);
            stopedDirection = 0;
            animRunningDirection = 0;
            lastMobileStopedAnim = 1;
        }
    } else if (joystick.down) {
        if (joystick.left) {
            player.anims.play("player_running_left", true);
            stopedDirection = 2;
            animRunningDirection = 2;
            lastMobileStopedAnim = 3;
        } else if (joystick.right) {
            player.anims.play("player_running_right", true);
            stopedDirection = 1;
            animRunningDirection = 3;
            lastMobileStopedAnim = 2;
        } else {
            player.anims.play("running_down", true);
            stopedDirection = 1;
            animRunningDirection = 1;
            lastMobileStopedAnim = 0;
        }
    } else if (joystick.left) {
        player.anims.play("player_running_left", true);
        stopedDirection = 2;
        animRunningDirection = 2;
        lastMobileStopedAnim = 3;

    } else if (joystick.right) {
        player.anims.play("player_running_right", true);
        stopedDirection = 2;
        animRunningDirection = 3;
        lastMobileStopedAnim = 2;
    }

    if (joystick.left) {
        player.setVelocityX(-3);
    } else if (joystick.right) {
        player.setVelocityX(3);
    }

    if (joystick.up) {
        player.setVelocityY(-3);
    } else if (joystick.down) {
        player.setVelocityY(3);
    }

    if (joystick.up && joystick.left || joystick.up && joystick.right || joystick.down && joystick.left || joystick.down && joystick.right) {
        let movementVector = new Phaser.Math.Vector2(0, 0);

        if (joystick.up) movementVector.y = -1;
        if (joystick.down) movementVector.y = 1;
        if (joystick.left) movementVector.x = -1;
        if (joystick.right) movementVector.x = 1;

        movementVector.normalize();

        const speed = 3;
        player.setVelocity(movementVector.x * speed, movementVector.y * speed);

    }


    if (isJoyStickDown) {
        const currentTime = Date.now();
        const timeSinceLastUpdate = currentTime - lastUpdateTime;
        const updateFrequency = 20;

        if (timeSinceLastUpdate > updateFrequency) {
            const pos = {
                "x": Math.round(player.x),
                "y": Math.round(player.y),
                "id": _selfgame.socket.id
            };
            _selfgame.socket.emit("player_pos_update", pos);
            _selfgame.socket.emit("toggle_running", 1);
            _selfgame.socket.emit("toggle_running_dir", animRunningDirection);
            lastUpdateTime = currentTime;
        }
    }
}