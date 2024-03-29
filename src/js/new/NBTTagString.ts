


import { java, S } from "../jree/index";
import { DataInput } from "../java/io/DataInput";
import { DataOutput } from "../java/io/DataOutput";
import { NBTBase } from "./NBTBase";

export  class NBTTagString extends NBTBase {
	public stringValue:  string;

	public constructor();

	public constructor(string1: string);

    public constructor(...args: unknown[]) {
		switch (args.length) {
			case 0: {
				super();
				break;
			}

			case 1: {
				const [string1] = args as string[];
				super();
				this.stringValue = string1;

				if(string1 === undefined) {
					throw new  java.lang.IllegalArgumentException("Empty string not allowed");
				}

				break;
			}

			default: {
				throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
			}
		}
	}

	public async writeTagContents(dataOutput1: DataOutput): Promise<void> {
		await dataOutput1.writeUTF(this.stringValue);
	}

	public async readTagContents(dataInput1: DataInput): Promise<void> {
		this.stringValue = await dataInput1.readUTF();
	}

	public getType(): number {
		return 8;
	}

	public toString():  string {
		return "" + this.stringValue;
	}
}
