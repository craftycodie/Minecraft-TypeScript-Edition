


import { int, java } from "../jree/index";
import { Material } from "./Material";
import { Block } from "./Block";

import { Item } from "./Item";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockClay extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, i2, MaterialRegistry.clay);
	}

	public idDropped(i1: int, random2: Random| undefined):  int {
		return Item.clay.shiftedIndex;
	}

	public quantityDropped(random1: Random| undefined):  int {
		return 4;
	}
}
