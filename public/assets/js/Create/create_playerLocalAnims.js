function Create_PlayerLocalAnims(_selfGame){
    _selfGame.anims.create({
        key: 'running_down',
        frames: _selfGame.anims.generateFrameNumbers('player_running_down'),
        frameRate: 7
    });

    _selfGame.anims.create({
        key: 'running_up',
        frames: _selfGame.anims.generateFrameNumbers('player_running_up'),
        frameRate: 7
    });

    _selfGame.anims.create({
        key: 'player_stopped',
        frames: _selfGame.anims.generateFrameNumbers('player_stopped'),
        frameRate: 0
    });

    _selfGame.anims.create({
        key: 'player_running_left',
        frames: _selfGame.anims.generateFrameNumbers('player_running_left'),
        frameRate: 7
    });

    _selfGame.anims.create({
        key: 'player_running_right',
        frames: _selfGame.anims.generateFrameNumbers('player_running_right'),
        frameRate: 7
    });
}