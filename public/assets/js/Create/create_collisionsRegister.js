function Create_CollisionRegister(_selfGame){

    _selfGame.matter.world.on('collisionstart', (event) => {
        event.pairs.forEach((pair) => {
            try{
                const object_or_loot = pair.bodyB.gameObject.body;
                if(object_or_loot.isLoot){
                    console.log("LOOT_COLLISION: ", object_or_loot.localConfigs);
                }
            }catch(err){};
        });
    });

    _selfGame.matter.world.on('collisionend', (event) => {
        event.pairs.forEach((pair) => {
            try{
                const object_or_loot = pair.bodyB.gameObject.body;
                if(object_or_loot.isLoot){
                    console.log("CLOSE_COLLISION: ", object_or_loot.localConfigs);
                }
            }catch(err){};
        });
    });
}