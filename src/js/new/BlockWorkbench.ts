
import { int } from "../jree/index";
import { World } from "./World";
import { Material } from "./Material";
import { EnumSkyBlock } from "./EnumSkyBlock";
import { EntityPlayer } from "./EntityPlayer";
import { Block } from "./Block";

import { MaterialRegistry } from "./static/MaterialRegistry";
import { Block } from "./Block";


export  class BlockWorkbench extends Block {
	public constructor(i1: int) {
		super(i1, MaterialRegistry.wood);
		this.blockIndexInTexture = 59;
	}

	public getBlockTextureFromSide(i1: int):  int {
		return i1 === 1 ? this.blockIndexInTexture - 16 : (i1 === 0 ? Block.planks.getBlockTextureFromSide(0) : (i1 !== 2 && i1 !== 4 ? this.blockIndexInTexture : this.blockIndexInTexture + 1));
	}

	public async blockActivated(world1: World| undefined, i2: int, i3: int, i4: int, entityPlayer5: EntityPlayer| undefined):  Promise<boolean> {
		if(world1.multiplayerWorld) {
			return true;
		} else {
			entityPlayer5.displayWorkbenchGUI(i2, i3, i4);
			return true;
		}
	}
}
