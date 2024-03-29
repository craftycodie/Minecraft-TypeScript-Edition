import { java, float, int } from "../jree/index";
import { World } from "./World";
import { NBTTagCompound } from "./NBTTagCompound";
import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { EntityPlayer } from "./EntityPlayer";
import { EntityAnimals } from "./EntityAnimals";
import { Item } from "./Item";

export  class EntityCow extends EntityAnimals {
	public constructor(world1: World| undefined) {
		super(world1);
		this.texture = "/mob/cow.png";
		this.setSize(0.9, 1.3);
	}

	public override get type(): string {
		return 'Cow';
	}

	public writeEntityToNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.writeEntityToNBT(nBTTagCompound1);
	}

	public readEntityFromNBT(nBTTagCompound1: NBTTagCompound| undefined):  void {
		super.readEntityFromNBT(nBTTagCompound1);
	}

	protected getLivingSound():  string {
		return "mob.cow";
	}

	protected getHurtSound():  string {
		return "mob.cowhurt";
	}

	protected getDeathSound(): string {
		return "mob.cowhurt";
	}

	protected getSoundVolume():  float {
		return 0.4;
	}

	protected getDropItemId():  int {
		return Item.leather.shiftedIndex;
	}

	public async interact(entityPlayer1: EntityPlayer| undefined):  Promise<boolean> {
		let  itemStack2: ItemStack = entityPlayer1.inventory.getCurrentItem();
		if(itemStack2 !== undefined && itemStack2.itemID === Item.bucketEmpty.shiftedIndex) {
			await entityPlayer1.inventory.setInventorySlotContents(entityPlayer1.inventory.currentItem, new  ItemStack(Item.bucketMilk));
			return true;
		} else {
			return false;
		}
	}
}
