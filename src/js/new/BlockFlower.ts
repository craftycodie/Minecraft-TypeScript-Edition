


import { int, float, java } from "../jree/index";
import { World } from "./World";
import { AxisAlignedBB } from "./AxisAlignedBB";
import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";
import { Random } from "../jree/java/util/Random";

export  class BlockFlower extends Block {
	public constructor(i1: int, i2: int) {
		super(i1, MaterialRegistry.plants);
		this.blockIndexInTexture = i2;
		this.setTickOnLoad(true);
		let  f3: float = 0.2;
		this.setBlockBounds(0.5 - f3, 0.0, 0.5 - f3, 0.5 + f3, f3 * 3.0, 0.5 + f3);
	}

	public async canPlaceBlockAt(world1: World| undefined, i2: int, i3: int, i4: int): Promise<boolean> {
		return this.canThisPlantGrowOnThisBlockID(await world1.getBlockId(i2, i3 - 1, i4));
	}

	protected canThisPlantGrowOnThisBlockID(i1: int):  boolean {
		return i1 === Block.grass.blockID || i1 === Block.dirt.blockID || i1 === Block.tilledField.blockID;
	}

	public async onNeighborBlockChange(world1: World| undefined, i2: int, i3: int, i4: int, i5: int):  Promise<void> {
		await super.onNeighborBlockChange(world1, i2, i3, i4, i5);
		await this.func_268_h(world1, i2, i3, i4);
	}

	public async updateTick(world1: World| undefined, i2: int, i3: int, i4: int, random5: Random | undefined): Promise<void> {
		await this.func_268_h(world1, i2, i3, i4);
	}

	protected async func_268_h(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<void> {
		if(!await this.canBlockStay(world1, i2, i3, i4)) {
			await this.dropBlockAsItem(world1, i2, i3, i4, await world1.getBlockMetadata(i2, i3, i4));
			await world1.setBlockWithNotify(i2, i3, i4, 0);
		}

	}

	public async canBlockStay(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<boolean> {
		return (await world1.getBlockLightValue(i2, i3, i4) >= 8 || await world1.canBlockSeeTheSky(i2, i3, i4)) && await this.canThisPlantGrowOnThisBlockID(await world1.getBlockId(i2, i3 - 1, i4));
	}

	public async getCollisionBoundingBoxFromPool(world1: World| undefined, i2: int, i3: int, i4: int):  Promise<AxisAlignedBB | undefined> {
		return undefined;
	}

	public isOpaqueCube():  boolean {
		return false;
	}

	public renderAsNormalBlock():  boolean {
		return false;
	}

	public getRenderType():  int {
		return 1;
	}
}
