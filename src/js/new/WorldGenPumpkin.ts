import { int } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { BlockRegistry } from "./index";
import { Random } from "../java/util/Random";

export  class WorldGenPumpkin extends WorldGenerator {
	public async generate(world1: World| null, random2: Random | null, i3: int, i4: int, i5: int):  Promise<boolean> {
		for(let  i6: int = 0; i6 < 64; ++i6) {
			let  i7: int = i3 + random2.nextInt(8) - random2.nextInt(8);
			let  i8: int = i4 + random2.nextInt(4) - random2.nextInt(4);
			let  i9: int = i5 + random2.nextInt(8) - random2.nextInt(8);
			if(await world1.isAirBlock(i7, i8, i9) && await world1.getBlockId(i7, i8 - 1, i9) === BlockRegistry.grass.blockID && await BlockRegistry.pumpkin.canPlaceBlockAt(world1, i7, i8, i9)) {
				await world1.setBlockAndMetadata(i7, i8, i9, BlockRegistry.pumpkin.blockID, random2.nextInt(4));
			}
		}

		return true;
	}
}