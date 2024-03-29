
import { int } from "../jree/index";
import { ItemStack } from "./ItemStack";
import { IInventory } from "./IInventory";

export  class Slot {
	private readonly slotIndex:  int;
	private readonly inventory:  IInventory | undefined;
	public field_20007_a:  int;
	public xDisplayPosition:  int;
	public yDisplayPosition:  int;

	public constructor(iInventory1: IInventory| undefined, i2: int, i3: int, i4: int) {
		this.inventory = iInventory1;
		this.slotIndex = i2;
		this.xDisplayPosition = i3;
		this.yDisplayPosition = i4;
	}

	public async onPickupFromSlot():  Promise<void> {
		this.onSlotChanged();
	}

	public isItemValid(itemStack1: ItemStack| undefined):  boolean {
		return true;
	}

	public getStack():  ItemStack | undefined {
		return this.inventory.getStackInSlot(this.slotIndex);
	}

	public func_20005_c():  boolean {
		return this.getStack() !== undefined;
	}

	public async putStack(itemStack1: ItemStack| undefined):  Promise<void> {
		await this.inventory.setInventorySlotContents(this.slotIndex, itemStack1);
		this.onSlotChanged();
	}

	public onSlotChanged():  void {
		this.inventory.onInventoryChanged();
	}

	public getSlotStackLimit():  int {
		return this.inventory.getInventoryStackLimit();
	}

	public func_775_c():  int {
		return -1;
	}

	public async decrStackSize(i1: int):  Promise<ItemStack | undefined> {
		return await this.inventory.decrStackSize(this.slotIndex, i1);
	}
}
