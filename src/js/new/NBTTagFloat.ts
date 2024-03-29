


import { float, java, byte, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagFloat extends NBTBase {
	public floatValue:  float;

	public constructor();

	public constructor(f1: float);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [f1] = args as [float];
				super();
				this.floatValue = f1;
				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}

	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeFloat(this.floatValue);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.floatValue = await dataInput1.readFloat();
	}

	public getType(): number {
		return 5;
	}

	public toString():  string {
		return "" + this.floatValue;
	}
}
