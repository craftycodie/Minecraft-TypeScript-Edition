


import { java, int, byte } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { World } from "./World";
import { Random } from "../jree/java/util/Random";
import { Block } from './Block';

export class WorldGenTrees extends WorldGenerator {
	public async generate(world1: World| undefined, random2: Random| undefined, i3: int, i4: int, i5: int):  Promise<boolean> {
		let  i6: int = random2.nextInt(3) + 4;
		let  z7: boolean = true;
		if(i4 >= 1 && i4 + i6 + 1 <= 128) {
			let  i8: int;
			let  i10: int;
			let  i11: int;
			let  i12: int;
			for(i8 = i4; i8 <= i4 + 1 + i6; ++i8) {
				let  b9: byte = 1;
				if(i8 === i4) {
					b9 = 0;
				}

				if(i8 >= i4 + 1 + i6 - 2) {
					b9 = 2;
				}

				for(i10 = i3 - b9; i10 <= i3 + b9 && z7; ++i10) {
					for(i11 = i5 - b9; i11 <= i5 + b9 && z7; ++i11) {
						if(i8 >= 0 && i8 < 128) {
							i12 = await world1.getBlockId(i10, i8, i11);
							if(i12 !== 0 && i12 !== Block.leaves.blockID) {
								z7 = false;
							}
						} else {
							z7 = false;
						}
					}
				}
			}

			if(!z7) {
				return false;
			} else {
				i8 = await world1.getBlockId(i3, i4 - 1, i5);
				if((i8 === Block.grass.blockID || i8 === Block.dirt.blockID) && i4 < 128 - i6 - 1) {
					await world1.setBlock(i3, i4 - 1, i5, Block.dirt.blockID);

					let  i16: int;
					for(i16 = i4 - 3 + i6; i16 <= i4 + i6; ++i16) {
						i10 = i16 - (i4 + i6);
						i11 = 1 - i10 / 2;

						for(i12 = i3 - i11; i12 <= i3 + i11; ++i12) {
							let  i13: int = i12 - i3;

							for(let  i14: int = i5 - i11; i14 <= i5 + i11; ++i14) {
								let  i15: int = i14 - i5;
								if((java.lang.Math.abs(i13) !== i11 || java.lang.Math.abs(i15) !== i11 || random2.nextInt(2) !== 0 && i10 !== 0) && !Block.opaqueCubeLookup[await world1.getBlockId(i12, i16, i14)]) {
									await world1.setBlock(i12, i16, i14, Block.leaves.blockID);
								}
							}
						}
					}

					for(i16 = 0; i16 < i6; ++i16) {
						i10 = await world1.getBlockId(i3, i4 + i16, i5);
						if(i10 === 0 || i10 === Block.leaves.blockID) {
							await world1.setBlock(i3, i4 + i16, i5, Block.wood.blockID);
						}
					}

					return true;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}
}
