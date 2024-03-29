


import { JavaObject, int, byte, java } from "../jree/index";
import { World } from "./World";
import { IProgressUpdate } from "./IProgressUpdate";
import { IChunkProvider } from "./IChunkProvider";
import { IChunkLoader } from "./IChunkLoader";
import { EmptyChunk } from "./EmptyChunk";
import { Chunk } from "./Chunk";

export  class ChunkProviderLoadOrGenerate extends JavaObject implements IChunkProvider {
	private blankChunk:  Chunk;
	private chunkProvider:  IChunkProvider;
	private chunkLoader:  IChunkLoader;
	private chunks:  (Chunk | undefined)[] = new   Array<Chunk>(1024);
	private worldObj:  World;
	protected lastQueriedChunkXPos: int = -999999999;
	protected lastQueriedChunkZPos: int = -999999999;
	private lastQueriedChunk:  Chunk | undefined;
	private field_21113_i:  int;
	private field_21112_j:  int;

	public constructor(world1: World, iChunkLoader2: IChunkLoader, iChunkProvider3: IChunkProvider) {
		super();
		this.blankChunk = new  EmptyChunk(world1, new Int8Array(32768), 0, 0);
		this.worldObj = world1;
		this.chunkLoader = iChunkLoader2;
		this.chunkProvider = iChunkProvider3;
	}

	public func_21110_c(i1: int, i2: int):  void {
		this.field_21113_i = i1;
		this.field_21112_j = i2;
	}

	public func_21111_d(i1: int, i2: int):  boolean {
		let  b3: byte = 15;
		return i1 >= this.field_21113_i - b3 && i2 >= this.field_21112_j - b3 && i1 <= this.field_21113_i + b3 && i2 <= this.field_21112_j + b3;
	}

	public chunkExists(i1: int, i2: int):  boolean {
		if(!this.func_21111_d(i1, i2)) {
			return false;
		} else if(i1 === this.lastQueriedChunkXPos && i2 === this.lastQueriedChunkZPos && this.lastQueriedChunk !== undefined) {
			return true;
		} else {
			let  i3: int = i1 & 31;
			let  i4: int = i2 & 31;
			let  i5: int = i3 + i4 * 32;
			const chunk = this.chunks[i5];
			return chunk !== undefined && (chunk === this.blankChunk || chunk.isAtLocation(i1, i2));
		}
	}

	public async provideChunk(i1: int, i2: int):  Promise<Chunk> {
		if(i1 === this.lastQueriedChunkXPos && i2 === this.lastQueriedChunkZPos && this.lastQueriedChunk !== undefined) {
			return this.lastQueriedChunk;
		} else if(!this.worldObj.field_9430_x && !this.func_21111_d(i1, i2)) {
			return this.blankChunk;
		} else {
			let  i3: int = i1 & 31;
			let  i4: int = i2 & 31;
			let  i5: int = i3 + i4 * 32;
			if(!this.chunkExists(i1, i2)) {
				if(this.chunks[i5]) {
					this.chunks[i5]!.onChunkUnload();
					await this.saveChunk(this.chunks[i5]!);
					await this.saveExtraChunkData(this.chunks[i5]!);
				}

				let  chunk6: Chunk | undefined = await this.func_542_c(i1, i2);
				if(chunk6 === undefined) {
					if(this.chunkProvider === undefined) {
						chunk6 = this.blankChunk;
					} else {
						chunk6 = await this.chunkProvider.provideChunk(i1, i2);
					}
				}

				this.chunks[i5] = chunk6;
				await chunk6.func_4143_d();
				if(this.chunks[i5]) {
					this.chunks[i5]!.onChunkLoad();
				}

				if(this.chunks[i5] && !this.chunks[i5]!.isTerrainPopulated && this.chunkExists(i1 + 1, i2 + 1) && this.chunkExists(i1, i2 + 1) && this.chunkExists(i1 + 1, i2)) {
					await this.populate(this, i1, i2);
				}

				if(await this.chunkExists(i1 - 1, i2) && !(await this.provideChunk(i1 - 1, i2)).isTerrainPopulated && this.chunkExists(i1 - 1, i2 + 1) && this.chunkExists(i1, i2 + 1) && this.chunkExists(i1 - 1, i2)) {
					await this.populate(this, i1 - 1, i2);
				}

				if(await this.chunkExists(i1, i2 - 1) && !(await this.provideChunk(i1, i2 - 1)).isTerrainPopulated && this.chunkExists(i1 + 1, i2 - 1) && this.chunkExists(i1, i2 - 1) && this.chunkExists(i1 + 1, i2)) {
					await this.populate(this, i1, i2 - 1);
				}

				if(await this.chunkExists(i1 - 1, i2 - 1) && !(await this.provideChunk(i1 - 1, i2 - 1)).isTerrainPopulated && this.chunkExists(i1 - 1, i2 - 1) && this.chunkExists(i1, i2 - 1) && this.chunkExists(i1 - 1, i2)) {
					await this.populate(this, i1 - 1, i2 - 1);
				}
			}

			this.lastQueriedChunkXPos = i1;
			this.lastQueriedChunkZPos = i2;
			this.lastQueriedChunk = this.chunks[i5];
			return this.chunks[i5]!;
		}
	}

	private async func_542_c(i1: int, i2: int):  Promise<Chunk | undefined> {
		if(this.chunkLoader === undefined) {
			return this.blankChunk;
		} else {
			try {
				let  chunk3: Chunk | undefined = await this.chunkLoader.loadChunk(this.worldObj, i1, i2);
				if(chunk3 !== undefined) {
					chunk3.lastSaveTime = this.worldObj.worldTime;
				}

				return chunk3;
			} catch (exception4) {
				if (exception4 instanceof java.lang.Exception) {
					console.error(exception4);
					return this.blankChunk;
				} else {
					throw exception4;
				}
			}
		}
	}

	private async saveExtraChunkData(chunk1: Chunk):  Promise<void> {
		if(this.chunkLoader !== undefined) {
			try {
				await this.chunkLoader.saveExtraChunkData(this.worldObj, chunk1);
			} catch (exception3) {
				if (exception3 instanceof java.lang.Exception) {
					console.error(exception3);
				} else {
					throw exception3;
				}
			}
		}
	}

	private async saveChunk(chunk1: Chunk):  Promise<void> {
		if(this.chunkLoader !== undefined) {
			try {
				chunk1.lastSaveTime = this.worldObj.worldTime;
				await this.chunkLoader.saveChunk(this.worldObj, chunk1);
			} catch (iOException3) {
				if (iOException3 instanceof java.io.IOException) {
					console.error(iOException3);
				} else {
					throw iOException3;
				}
			}
		}
	}

	public async populate(iChunkProvider1: IChunkProvider, i2: int, i3: int):  Promise<void> {
		let  chunk4: Chunk = await this.provideChunk(i2, i3);
		if(!chunk4.isTerrainPopulated) {
			chunk4.isTerrainPopulated = true;
			if(this.chunkProvider !== undefined) {
				await this.chunkProvider.populate(iChunkProvider1, i2, i3);
				chunk4.setChunkModified();
			}
		}

	}

	public async saveChunks(z1: boolean, iProgressUpdate2: IProgressUpdate| undefined):  Promise<boolean> {
		let  i3: int = 0;
		let  i4: int = 0;
		let  i5: int;

		if(iProgressUpdate2) {
			for(i5 = 0; i5 < this.chunks.length; ++i5) {
				if(this.chunks[i5] && this.chunks[i5]!.needsSaving(z1)) {
					++i4;
				}
			}
		}

		i5 = 0;

		for(let i6: int = 0; i6 < this.chunks.length; ++i6) {
			if(this.chunks[i6]) {
				if(z1 && !this.chunks[i6]!.neverSave) {
					await this.saveExtraChunkData(this.chunks[i6]!);
				}

				if(this.chunks[i6]!.needsSaving(z1)) {
					await this.saveChunk(this.chunks[i6]!);
					this.chunks[i6]!.isModified = false;
					++i3;
					if(i3 === 2 && !z1) {
						return false;
					}

					if(iProgressUpdate2) {
						++i5;
						if(i5 % 10 === 0) {
							iProgressUpdate2.setLoadingProgress(i5 * 100 / i4);
						}
					}
				}
			}
		}

		if(z1) {
			if(this.chunkLoader === undefined) {
				return true;
			}

			await this.chunkLoader.saveExtraData();
		}

		return true;
	}

	public func_532_a():  boolean {
		if(this.chunkLoader !== undefined) {
			this.chunkLoader.func_814_a();
		}

		return this.chunkProvider.func_532_a();
	}

	public func_536_b():  boolean {
		return true;
	}

	public toString():  string {
		return "ChunkCache: " + this.chunks.length;
	}
}
