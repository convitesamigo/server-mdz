function Create_CameraStart(_selfGame){
    _selfGame.cameras.main.setBounds(0, 0, 13000, 13000);
    _selfGame.cameras.main.startFollow(player);
}