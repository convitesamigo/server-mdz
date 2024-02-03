function Create_StaticsTrees(_selfGame){
    const treeb1 = _selfGame.matter.add.image(100, 100, 'static_treeBlock', null, { shape: shape_treeblocks['tree_block-sheet1'] }).setStatic(1).setDepth(1);
    treeb1.body.isLoot = false;
}