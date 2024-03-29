
import { int } from "../jree/index";
import { ItemTool } from "./ItemTool";
import { EnumToolMaterial } from "./EnumToolMaterial";
import { Block } from "./Block";

import { Block } from "./Block";

export  class ItemSpade extends ItemTool {
	private static blocksEffectiveAgainst:  Block[] | undefined =  [Block.grass, Block.dirt, Block.sand, Block.gravel, Block.snow, Block.blockSnow, Block.blockClay];

	public constructor(i1: int, enumToolMaterial2: EnumToolMaterial| undefined) {
		super(i1, 1, enumToolMaterial2, ItemSpade.blocksEffectiveAgainst);
	}

	public canHarvestBlock(block1: Block| undefined):  boolean {
		return block1 === Block.snow ? true : block1 === Block.blockSnow;
	}
}
