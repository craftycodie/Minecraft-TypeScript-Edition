import { DataOutput } from "../java/io/DataOutput";
import { DataInput } from "../java/io/DataInput";

export abstract  class NBTBase {
	public key: string | undefined = undefined;

	public abstract writeTagContents(dataOutput1: DataOutput):  Promise<void>;

	public abstract readTagContents(dataInput1: DataInput):  Promise<void>;

	public abstract getType(): number;

	public getKey():  string {
		return this.key === undefined ? "" : this.key;
	}

	public setKey(string1: string):  NBTBase {
		this.key = string1;
		return this;
	}
}
