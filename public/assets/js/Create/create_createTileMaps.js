function Create_TileMaps(_selfGame){
   const map = _selfGame.make.tilemap({ key: 'map' });
   const tiles = map.addTilesetImage('Grass', 'Grass', 60, 60, 0, 0);
   const tiles1 = map.addTilesetImage('Sand', 'Sand', 60, 60, 0, 0);
   const tiles2 = map.addTilesetImage('Water', 'Water', 60, 60, 0, 0);
   const tiles3 = map.addTilesetImage('Trash', 'Trash', 30, 30, 0, 0);
   const layer = map.createLayer(0, tiles, 0, 0);
   const layer1 = map.createLayer(1, tiles1, 0, 0);
   const layer2 = map.createLayer(2, tiles2, 0, 0);
   const layer3 = map.createLayer(3, tiles3, 0, 0);
}