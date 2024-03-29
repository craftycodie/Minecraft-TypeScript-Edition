


import { JavaObject, java, int, byte, short, float } from "../jree/index";
import { WatchableObject } from "./WatchableObject";
import { ItemStack } from "./ItemStack";
import { DataOutputStream } from "../java/io/DataOutputStream";
import { DataInputStream } from "../java/io/DataInputStream";

export  class DataWatcher extends JavaObject {
	private static readonly dataTypes: { [type: string]: number } = {};
	private readonly watchedObjects: { [id: number]: WatchableObject } = {};
	private objectChanged:  boolean;

	public addObject(i1: int, object2: any, objectType: string):  void {
		let  integer3 = DataWatcher.dataTypes[objectType];
		if(integer3 === undefined) {
			throw new  java.lang.IllegalArgumentException("Unknown data type: " + object2.getClass());
		} else if(i1 > 31) {
			throw new  java.lang.IllegalArgumentException("Data value id is too big with " + i1 + "! (Max is " + 31 + ")");
		} else if(i1 in this.watchedObjects) {
			throw new  java.lang.IllegalArgumentException("Duplicate id value for " + i1 + "!");
		} else {
			let  watchableObject4: WatchableObject = new  WatchableObject(integer3, i1, object2);
			this.watchedObjects[i1] = watchableObject4;
		}
	}

	public getWatchableObjectByte(i1: int):  byte {
		return ((this.watchedObjects[i1] as WatchableObject).getObject() as byte);
	}

	public updateObject(i1: int, object2: any):  void {
		let  watchableObject3: WatchableObject = this.watchedObjects[i1] as WatchableObject;
		if(!object2.equals(watchableObject3.getObject())) {
			watchableObject3.setObject(object2);
			watchableObject3.setWatching(true);
			this.objectChanged = true;
		}

	}

	public static async writeObjectsInListToStream(list0: WatchableObject[], dataOutputStream1: DataOutputStream| undefined):  Promise<void> {
		if(list0 !== undefined) {
			await Promise.all(list0.map(async watchableObject => {
				return DataWatcher.writeWatchableObject(dataOutputStream1, watchableObject);
			}))
		}

		await dataOutputStream1.writeByte(127);
	}

	public async writeWatchableObjects(dataOutputStream1: DataOutputStream):  Promise<void> {
		await Promise.all(Object.values(this.watchedObjects).map(watchedObject => {
			return DataWatcher.writeWatchableObject(dataOutputStream1, watchedObject);
		}));

		await dataOutputStream1.writeByte(127);
	}

	private static async writeWatchableObject(dataOutputStream0: DataOutputStream| undefined, watchableObject1: WatchableObject| undefined):  Promise<void> {
		let  i2: int = (watchableObject1.getObjectType() << 5 | watchableObject1.getDataValueId() & 31) & 255;
		await dataOutputStream0.writeByte(i2);
		switch(watchableObject1.getObjectType()) {
		case 0:
			await dataOutputStream0.writeByte((watchableObject1.getObject() as byte));
			break;
		case 1:
			await dataOutputStream0.writeShort((watchableObject1.getObject() as short));
			break;
		case 2:
			await dataOutputStream0.writeInt(Math.floor(watchableObject1.getObject()));
			break;
		case 3:
			await dataOutputStream0.writeFloat((watchableObject1.getObject() as float));
			break;
		case 4:
			await dataOutputStream0.writeUTF(watchableObject1.getObject() as string);
			break;
		case 5:
			let  itemStack3: ItemStack = watchableObject1.getObject() as ItemStack;
			await dataOutputStream0.writeShort(itemStack3.getItem().shiftedIndex);
			await dataOutputStream0.writeByte(itemStack3.stackSize);
			await dataOutputStream0.writeShort(itemStack3.getItemDamage());

		default:

		}

	}

	public static async readWatchableObjects(dataInputStream0: DataInputStream| undefined):  Promise<WatchableObject[]> {
		let  arrayList1: WatchableObject[];

		for(let  b2: byte = await dataInputStream0.readByte(); b2 !== 127; b2 = await dataInputStream0.readByte()) {
			if(arrayList1 === undefined) {
				arrayList1 = [];
			}

			let  i3: int = (b2 & 224) >> 5;
			let  i4: int = b2 & 31;
			let  watchableObject5: WatchableObject;
			switch(i3) {
			case 0:
				watchableObject5 = new  WatchableObject(i3, i4, await dataInputStream0.readByte());
				break;
			case 1:
				watchableObject5 = new  WatchableObject(i3, i4, await dataInputStream0.readShort());
				break;
			case 2:
				watchableObject5 = new  WatchableObject(i3, i4, await dataInputStream0.readInt());
				break;
			case 3:
				watchableObject5 = new  WatchableObject(i3, i4, await dataInputStream0.readFloat());
				break;
			case 4:
				watchableObject5 = new  WatchableObject(i3, i4, await dataInputStream0.readUTF());
				break;
			case 5:
				let  s6: short = await dataInputStream0.readShort();
				let  b7: byte = await dataInputStream0.readByte();
				let  s8: short = await dataInputStream0.readShort();
				watchableObject5 = new  WatchableObject(i3, i4, new  ItemStack(s6, b7, s8));

			default:

			}

			arrayList1.push(watchableObject5);
		}

		return arrayList1;
	}

	public updateWatchedObjectsFromList(list1: WatchableObject[]):  void {
		list1.forEach(watchableObject => {
			let  watchableObject4: WatchableObject = this.watchedObjects[watchableObject.getDataValueId()];
			if(watchableObject4 !== undefined) {
				watchableObject4.setObject(watchableObject.getObject());
			}
		})
	}


	static {
		DataWatcher.dataTypes['Byte'] = 0;
		DataWatcher.dataTypes['Short'] = 1;
		DataWatcher.dataTypes['Integer'] = 2;
		DataWatcher.dataTypes['Float'] = 3;
		DataWatcher.dataTypes['String'] = 4;
		DataWatcher.dataTypes['ItemStack'] = 5;
	}
}
