function Load_Assets(_selfGame){
    test = _selfGame;


    //PLAYER_ANIM
    _selfGame.load.spritesheet({
        key: 'player_running_down',
        url: 'assets/images/player/player_running_down.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 4
        }
    });

    _selfGame.load.spritesheet({
        key: 'player_running_up',
        url: 'assets/images/player/player_running_up.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 4
        }
    });

    _selfGame.load.spritesheet({
        key: 'player_stopped',
        url: 'assets/images/player/player_stopped_sheet.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        }
    });

    _selfGame.load.spritesheet({
        key: 'player_running_left',
        url: 'assets/images/player/player_running_left.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        }
    });
    _selfGame.load.spritesheet({
        key: 'player_running_right',
        url: 'assets/images/player/player_running_right.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        }
    });


    _selfGame.load.image('gamePad_base', 'assets/images/gui/gamePad/gui_dpad_field-sheet0.png');
    _selfGame.load.image('gamePad_sick', 'assets/images/gui/gamePad/gui_dpad_stick-sheet0.png');

    _selfGame.load.image('static_treeBlock', 'assets/images/static_map_objetcs/trees/tree_block-sheet1.png');

    //GROUND_LOOTS
    _selfGame.load.image('ground_apple_loot', 'assets/images/ground_loots/apple_loot.png');
    _selfGame.load.image('ground_bandage_loot', 'assets/images/ground_loots/bandage_loot.png');
    _selfGame.load.image('ground_waterjug_loot', 'assets/images/ground_loots/waterjug_loot.png');
    _selfGame.load.image('ground_tshirt_loot', 'assets/images/ground_loots/tshirt_loot.png');


    //TILEMAPS
    _selfGame.load.image('Grass', "assets/images/tilemaps/ground_lvl1_tilemap.png");
    _selfGame.load.image('Sand', "assets/images/tilemaps/tilemap_sand.png");
    _selfGame.load.image('Water', "assets/images/tilemaps/tilemap_water.png");
    _selfGame.load.image('Trash', "assets/images/tilemaps/ground_enviroment_tilemap.png");
    _selfGame.load.tilemapTiledJSON('map', 'assets/images/tilemaps/map_test3.json');

    //SHAPES
    _selfGame.load.json('treeBlockShape', 'assets/images/static_map_objetcs/trees/treeBlockCollider.json');

    //BUTTONS
    _selfGame.load.image('gui_button_inventory', 'assets/images/gui/buttons/gui_btn_inventory-sheet0.png');
}