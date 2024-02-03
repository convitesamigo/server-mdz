/*
LOOT_GROUND_ITEM_PROPERTIES:
	remoteID			 number
	itemTYPE:			 number
	itemID:				 number

	TYPE_0
		currentStackCount: 	 number

	TYPE_1
		currentStackCount: 	 number
		- isShirt		 boolean
		- isPants	     boolean
		- isBackPack	 boolean
			config: healt(NUMBER) + slotData(ARRAY)
		isWeapon:		     booelan
			 config: healt(NUMBER) + isPrimary(NUMBER) + stackBullet(NUMBER)

*/			

//SERVER_RETURN
	//iid: itemID
    //it:  itemTYPE
    //cf: configs
    //cf -> s: currentStackCount

    //cf -> iS:  isShirt
    //cf -> iP:  isPants
    //cf -> iB:  isBackPack
        //cf -> h:   healt
        //cf -> sd:  slotData

    //cf -> iW: isWeapon
        //cf -> h:   healt
        //cf -> iP: isPrimary
        //cf -> sB: stackBullet


function Remote_Create_Local_Loot_Config(SelfGame, _remoteID, _remoteConfig){		//USED_IN: create_socket.js [socket_on: get_old_loots]

	const local_loot_configs = {};
	local_loot_configs.x = _remoteConfig.x;
	local_loot_configs.y = _remoteConfig.y;

	if(_remoteConfig.it == 0)
	{	
		local_loot_configs.ITEM_TYPE = _remoteConfig.it;
		local_loot_configs.ITEM_ID = _remoteConfig.iid;
		local_loot_configs.ITEM_REMOTE_ID = _remoteID;
		local_loot_configs.CURRENT_STACK_COUNT = _remoteConfig.cf.s;
		Create_Local_Ground_Loot(SelfGame, _remoteID, local_loot_configs);

	}else{


		local_loot_configs.ITEM_TYPE = _remoteConfig.it;
		local_loot_configs.ITEM_ID = _remoteConfig.iid;
		local_loot_configs.ITEM_REMOTE_ID = _remoteID;

		if(_remoteConfig.cf.iS != undefined && _remoteConfig.cf.iS){
			local_loot_configs.IS_SHIRT = _remoteConfig.cf.iS;
			local_loot_configs.HEALT = _remoteConfig.cf.h;
			local_loot_configs.SLOT_DATA = _remoteConfig.cf.sd;

		}else if(_remoteConfig.cf.iP != undefined && _remoteConfig.cf.iP){
			local_loot_configs.IS_PANTS = _remoteConfig.cf.iP;
			local_loot_configs.HEALT = _remoteConfig.cf.h;
			local_loot_configs.SLOT_DATA = _remoteConfig.cf.sd;

		}else if(_remoteConfig.cf.iB != undefined && _remoteConfig.cf.iB){
			local_loot_configs.IS_BACKPACK = _remoteConfig.cf.iB;
			local_loot_configs.HEALT = _remoteConfig.cf.h;
			local_loot_configs.SLOT_DATA = _remoteConfig.cf.sd;
		}else{
			local_loot_configs.IsNormalLoot = true;
			local_loot_configs.CURRENT_STACK_COUNT = _remoteConfig.cf.s;
		}

		Create_Local_Ground_Loot(SelfGame, _remoteID, local_loot_configs);
	}

}

function Create_Local_Ground_Loot(SelfGame, _remoteID, localConfig){
	if(localConfig.ITEM_TYPE == 0){

		switch(localConfig.ITEM_ID){
			case 0: //bandage
				const bandage = SelfGame.matter.add.image(localConfig.x, localConfig.y, "ground_bandage_loot").setSensor(true);
				bandage.body.isLoot = true;
				bandage.body.localConfigs = localConfig;
				break;
			case 1: //apple
				const apple = SelfGame.matter.add.image(localConfig.x, localConfig.y, "ground_apple_loot").setSensor(true);
				apple.body.isLoot = true;
				apple.body.localConfigs = localConfig;
				break;
		}

	}else{

		switch(localConfig.ITEM_ID){
			case 2:
				const waterjug = SelfGame.matter.add.image(localConfig.x, localConfig.y, "ground_waterjug_loot").setSensor(true);
				waterjug.body.isLoot = true;
				waterjug.body.localConfigs = localConfig;
				break;
			case 3:
				const tshirt = SelfGame.matter.add.image(localConfig.x, localConfig.y, "ground_tshirt_loot").setSensor(true);
				tshirt.body.isLoot = true;
				tshirt.body.localConfigs = localConfig;
				break;
		}
	}
}