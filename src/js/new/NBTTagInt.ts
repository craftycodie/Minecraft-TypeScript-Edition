


import { int, java, byte, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagInt extends NBTBase {
	public intValue:  int;

	public constructor();

	public constructor(i1: int);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [i1] = args as [int];
				super();
				this.intValue = i1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}

	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeInt(this.intValue);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.intValue = await dataInput1.readInt();
	}

	public getType(): number {
		return 3;
	}

	public toString():  string {
		return "" + this.intValue;
	}
}
