


import { WorldGenerator } from "./WorldGenerator";
import { WorldGenReed } from "./WorldGenReed";
import { WorldGenPumpkin } from "./WorldGenPumpkin";
import { WorldGenMinable } from "./WorldGenMinable";
import { WorldGenLiquids } from "./WorldGenLiquids";
import { WorldGenLakes } from "./WorldGenLakes";
import { WorldGenFlowers } from "./WorldGenFlowers";
import { WorldGenDungeons } from "./WorldGenDungeons";
import { WorldGenClay } from "./WorldGenClay";
import { WorldGenCactus } from "./WorldGenCactus";
import { World } from "./World";
import { NoiseGeneratorOctaves } from "./NoiseGeneratorOctaves";
import { MobSpawnerBase } from "./MobSpawnerBase";
import { MapGenCaves } from "./MapGenCaves";
import { MapGenBase } from "./MapGenBase";
import { IProgressUpdate } from "./IProgressUpdate";
import { IChunkProvider } from "./IChunkProvider";
import { Chunk } from "./Chunk";
import { BlockSand } from "./BlockSand";
import { Random } from "../jree/java/util/Random";
import { long } from "../jree/index";
import { Block } from "./Block";
import { MaterialRegistry } from "./static/MaterialRegistry";

export  class ChunkProviderGenerate implements IChunkProvider {
	private rand:  Random;
	private field_912_k:  NoiseGeneratorOctaves;
	private field_911_l:  NoiseGeneratorOctaves;
	private field_910_m:  NoiseGeneratorOctaves;
	private field_909_n:  NoiseGeneratorOctaves;
	private field_908_o:  NoiseGeneratorOctaves;
	public field_922_a:  NoiseGeneratorOctaves;
	public field_921_b:  NoiseGeneratorOctaves;
	public mobSpawnerNoise:  NoiseGeneratorOctaves;
	private worldObj:  World;
	private field_4180_q:  number[];
	private sandNoise:  number[] = new Array<number>(256).fill(0);
	private gravelNoise:  number[] = new Array<number>(256).fill(0);
	private stoneNoise:  number[] = new Array<number>(256).fill(0);
	private field_902_u:  MapGenBase = new  MapGenCaves();
	private biomesForGeneration:  MobSpawnerBase[];
	protected field_4185_d: number[];
	protected field_4184_e: number[];
	protected field_4183_f: number[];
	protected field_4182_g: number[];
	protected field_4181_h: number[];
	protected field_914_i: number[] = [];
	private generatedTemperatures:  number[];

	public constructor(world1: World| undefined, j2: long) {
        this.worldObj = world1;
		this.rand = new Random(j2);
		this.field_912_k = new  NoiseGeneratorOctaves(this.rand, 16);
		this.field_911_l = new  NoiseGeneratorOctaves(this.rand, 16);
		this.field_910_m = new  NoiseGeneratorOctaves(this.rand, 8);
		this.field_909_n = new  NoiseGeneratorOctaves(this.rand, 4);
		this.field_908_o = new  NoiseGeneratorOctaves(this.rand, 4);
		this.field_922_a = new  NoiseGeneratorOctaves(this.rand, 10);
		this.field_921_b = new  NoiseGeneratorOctaves(this.rand, 16);
		this.mobSpawnerNoise = new  NoiseGeneratorOctaves(this.rand, 8);
	}

	public generateTerrain(i1: number, i2: number, blocks: Int8Array, mobSpawnerBase4: MobSpawnerBase[]| undefined, d5: number[]):  void {
		let  b6: number = 4;
		let  b7: number = 64;
		let  i8: number = b6 + 1;
		let  b9: number = 17;
		let  i10: number = b6 + 1;
		this.field_4180_q = this.func_4061_a(this.field_4180_q, i1 * b6, 0, i2 * b6, i8, b9, i10);

		for(let  i11: number = 0; i11 < b6; ++i11) {
			for(let  i12: number = 0; i12 < b6; ++i12) {
				for(let  i13: number = 0; i13 < 16; ++i13) {
					let  d14: number = 0.125;
					let  d16: number = this.field_4180_q[((i11 + 0) * i10 + i12 + 0) * b9 + i13 + 0];
					let  d18: number = this.field_4180_q[((i11 + 0) * i10 + i12 + 1) * b9 + i13 + 0];
					let  d20: number = this.field_4180_q[((i11 + 1) * i10 + i12 + 0) * b9 + i13 + 0];
					let  d22: number = this.field_4180_q[((i11 + 1) * i10 + i12 + 1) * b9 + i13 + 0];
					let  d24: number = (this.field_4180_q[((i11 + 0) * i10 + i12 + 0) * b9 + i13 + 1] - d16) * d14;
					let  d26: number = (this.field_4180_q[((i11 + 0) * i10 + i12 + 1) * b9 + i13 + 1] - d18) * d14;
					let  d28: number = (this.field_4180_q[((i11 + 1) * i10 + i12 + 0) * b9 + i13 + 1] - d20) * d14;
					let  d30: number = (this.field_4180_q[((i11 + 1) * i10 + i12 + 1) * b9 + i13 + 1] - d22) * d14;

					for(let  i32: number = 0; i32 < 8; ++i32) {
						let  d33: number = 0.25;
						let  d35: number = d16;
						let  d37: number = d18;
						let  d39: number = (d20 - d16) * d33;
						let  d41: number = (d22 - d18) * d33;

						for(let  i43: number = 0; i43 < 4; ++i43) {
							let  i44: number = i43 + i11 * 4 << 11 | 0 + i12 * 4 << 7 | i13 * 8 + i32;
							let  maxHeight: number = 128;
							let  d46: number = 0.25;
							let  d48: number = d35;
							let  d50: number = (d37 - d35) * d46;

							for(let  i52: number = 0; i52 < 4; ++i52) {
								let  d53: number = d5[(i11 * 4 + i43) * 16 + i12 * 4 + i52];
								let  i55: number = 0;
								if(i13 * 8 + i32 < b7) {
									if(d53 < 0.5 && i13 * 8 + i32 >= b7 - 1) {
										i55 = Block.ice.blockID;
									} else {
										//i55 = Block.waterMoving.blockID;
										i55 = Block.blockLapis.blockID;
									}
								}

								if(d48 > 0.0) {
									i55 = Block.stone.blockID;
								}

								blocks[i44] = i55;
								i44 += maxHeight;
								d48 += d50;
							}

							d35 += d39;
							d37 += d41;
						}

						d16 += d24;
						d18 += d26;
						d20 += d28;
						d22 += d30;
					}
				}
			}
		}

	}

	public replaceBlocksForBiome(i1: number, i2: number, blocks: Int8Array, mobSpawnerBase4: MobSpawnerBase[] | undefined):  void {
		let  b5: number = 64;
		let  d6: number = 8.0 / 256;
		this.sandNoise = this.field_909_n.generateNoiseOctaves(this.sandNoise, Math.floor(i1 * 16), Math.floor(i2 * 16), 0.0, 16, 16, 1, d6, d6, 1.0);
		this.gravelNoise = this.field_909_n.generateNoiseOctaves(this.gravelNoise, Math.floor(i2 * 16), 109.0134, Math.floor(i1 * 16), 16, 1, 16, d6, 1.0, d6);
		this.stoneNoise = this.field_908_o.generateNoiseOctaves(this.stoneNoise, Math.floor(i1 * 16), Math.floor(i2 * 16), 0.0, 16, 16, 1, d6 * 2.0, d6 * 2.0, d6 * 2.0);

		for(let  blockX: number = 0; blockX < 16; ++blockX) {
			for(let  blockZ: number = 0; blockZ < 16; ++blockZ) {
				let  mobSpawnerBase10: MobSpawnerBase = mobSpawnerBase4[blockX + blockZ * 16];
				let  z11: boolean = this.sandNoise[blockX + blockZ * 16] + this.rand.nextDouble() * 0.2 > 0.0;
				let  z12: boolean = this.gravelNoise[blockX + blockZ * 16] + this.rand.nextDouble() * 0.2 > 3.0;
				let  i13: number = Math.floor(this.stoneNoise[blockX + blockZ * 16] / 3.0 + 3.0 + this.rand.nextDouble() * 0.25);
				let  i14: number = -1;
				let  b15: number = mobSpawnerBase10.topBlock;
				let  b16: number = mobSpawnerBase10.fillerBlock;

				for(let  blockY: number = 127; blockY >= 0; --blockY) {
					let  blockIndex: number = (blockX * 16 + blockZ) * 128 + blockY;
					if(blockY <= 0 + this.rand.nextInt(5)) {
						blocks[blockIndex] = Block.bedrock.blockID;
					} else {
						let  b19: number = blocks[blockIndex];
						if(b19 === 0) {
							i14 = -1;
						} else if(b19 === Block.stone.blockID) {
							if(i14 === -1) {
								if(i13 <= 0) {
									b15 = 0;
									b16 = Block.stone.blockID;
								} else if(blockY >= b5 - 4 && blockY <= b5 + 1) {
									b15 = mobSpawnerBase10.topBlock;
									b16 = mobSpawnerBase10.fillerBlock;
									
									if(z12) {
										b15 = 0;
										b16 = Block.gravel.blockID;
									}

									if(z11) {
										b15 = Block.sand.blockID;
										b16 = Block.sand.blockID;
									}
								}

								if(blockY < b5 && b15 === 0) {
									b15 = Block.waterMoving.blockID;
								}

								i14 = i13;
								if(blockY >= b5 - 1) {
									blocks[blockIndex] = b15;
								} else {
									blocks[blockIndex] = b16;
								}
							} else if(i14 > 0) {
								--i14;
								blocks[blockIndex] = b16;
							}
						}
					}
				}
			}
		}

	}

	public async provideChunk(i1: number, i2: number):  Promise<Chunk> {
		this.rand.setSeed(BigInt(i1) * 341873128712n + BigInt(i2) * 132897987541n);
		let  blocks: Int8Array = new Int8Array(32768);
		let  chunk4: Chunk = new  Chunk(this.worldObj, blocks, i1, i2);
		this.biomesForGeneration = this.worldObj.getWorldChunkManager().loadBlockGeneratorData(this.biomesForGeneration, i1 * 16, i2 * 16, 16, 16);
		let  d5: number[] = this.worldObj.getWorldChunkManager().temperature;
		this.generateTerrain(i1, i2, blocks, this.biomesForGeneration, d5);		
		this.replaceBlocksForBiome(i1, i2, blocks, this.biomesForGeneration);
		this.field_902_u.func_867_a(this, this.worldObj, i1, i2, blocks);
		await chunk4.func_1024_c();
		return chunk4;
	}

	private func_4061_a(outArray: number[], i2: number, i3: number, i4: number, i5: number, i6: number, i7: number):  number[] {
		if(outArray === undefined) {
			outArray = new Array<number>(i5 * i6 * i7).fill(0);
		}

		let  d8: number = 684.412;
		let  d10: number = 684.412;
		let  d12: number[] = this.worldObj.getWorldChunkManager().temperature;
		let  d13: number[] = this.worldObj.getWorldChunkManager().humidity;
		this.field_4182_g = this.field_922_a.func_4109_a(this.field_4182_g, i2, i4, i5, i7, 1.121, 1.121, 0.5);
		this.field_4181_h = this.field_921_b.func_4109_a(this.field_4181_h, i2, i4, i5, i7, 200.0, 200.0, 0.5);
		this.field_4185_d = this.field_910_m.generateNoiseOctaves(this.field_4185_d, Math.floor(i2), Math.floor(i3), Math.floor(i4), i5, i6, i7, d8 / 80.0, d10 / 160.0, d8 / 80.0);
		this.field_4184_e = this.field_912_k.generateNoiseOctaves(this.field_4184_e, Math.floor(i2), Math.floor(i3), Math.floor(i4), i5, i6, i7, d8, d10, d8);
		this.field_4183_f = this.field_911_l.generateNoiseOctaves(this.field_4183_f, Math.floor(i2), Math.floor(i3), Math.floor(i4), i5, i6, i7, d8, d10, d8);
		let  i14: number = 0;
		let  i15: number = 0;
		let  i16: number = Math.floor(16 / i5);

		for(let  i17: number = 0; i17 < i5; ++i17) {
			let  i18: number = Math.floor(i17 * i16 + i16 / 2);

			for(let  i19: number = 0; i19 < i7; ++i19) {
				let  i20: number = Math.floor(i19 * i16 + i16 / 2);
				let  d21: number = d12[i18 * 16 + i20];
				let  d23: number = d13[i18 * 16 + i20] * d21;
				let  d25: number = 1.0 - d23;
				d25 *= d25;
				d25 *= d25;
				d25 = 1.0 - d25;
				let  d27: number = (this.field_4182_g[i15] + 256.0) / 512.0;
				d27 *= d25;
				if(d27 > 1.0) {
					d27 = 1.0;
				}

				let  d29: number = this.field_4181_h[i15] / 8000.0;
				if(d29 < 0.0) {
					d29 = -d29 * 0.3;
				}

				d29 = d29 * 3.0 - 2.0;
				if(d29 < 0.0) {
					d29 /= 2.0;
					if(d29 < -1.0) {
						d29 = -1.0;
					}

					d29 /= 1.4;
					d29 /= 2.0;
					d27 = 0.0;
				} else {
					if(d29 > 1.0) {
						d29 = 1.0;
					}

					d29 /= 8.0;
				}

				if(d27 < 0.0) {
					d27 = 0.0;
				}

				d27 += 0.5;
				d29 = d29 * Math.floor(i6) / 16.0;
				let  d31: number = Math.floor(i6) / 2.0 + d29 * 4.0;
				++i15;

				for(let  i33: number = 0; i33 < i6; ++i33) {
					let  d34: number = 0.0;
					let  d36: number = (Math.floor(i33) - d31) * 12.0 / d27;
					if(d36 < 0.0) {
						d36 *= 4.0;
					}

					let  d38: number = this.field_4184_e[i14] / 512.0;
					let  d40: number = this.field_4183_f[i14] / 512.0;
					let  d42: number = (this.field_4185_d[i14] / 10.0 + 1.0) / 2.0;
					if(d42 < 0.0) {
						d34 = d38;
					} else if(d42 > 1.0) {
						d34 = d40;
					} else {
						d34 = d38 + (d40 - d38) * d42;
					}

					d34 -= d36;
					if(i33 > i6 - 4) {
						let  d44: number = Math.floor(Math.floor(i33 - (i6 - 4)) / 3.0);
						d34 = d34 * (1.0 - d44) + -10.0 * d44;
					}

					outArray[i14] = d34;
					++i14;
				}
			}
		}

		return outArray;
	}

	public chunkExists(i1: number, i2: number):  boolean {
		return true;
	}

	public async populate(iChunkProvider1: IChunkProvider| undefined, i2: number, i3: number):  Promise<void> {
		BlockSand.fallInstantly = true;
		let  i4: number = i2 * 16;
		let  i5: number = i3 * 16;
		let  mobSpawnerBase6: MobSpawnerBase = this.worldObj.getWorldChunkManager().func_4073_a(i4 + 16, i5 + 16);
		this.rand.setSeed(this.worldObj.randomSeed);
		let  j7: long = this.rand.nextLong() / 2n * 2n + 1n;
		let  j9: long = this.rand.nextLong() / 2n * 2n + 1n;
		this.rand.setSeed((BigInt(i2) * j7 + BigInt(i3) * j9 ^ this.worldObj.randomSeed));
		let  d11: number = 0.25;
		let  i13: number;
		let  i14: number;
		let  i15: number;
		if(this.rand.nextInt(4) === 0) {
			i13 = i4 + this.rand.nextInt(16) + 8;
			i14 = this.rand.nextInt(128);
			i15 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenLakes(Block.waterStill.blockID)).generate(this.worldObj, this.rand, i13, i14, i15);
		}

		if(this.rand.nextInt(8) === 0) {
			i13 = i4 + this.rand.nextInt(16) + 8;
			i14 = this.rand.nextInt(this.rand.nextInt(120) + 8);
			i15 = i5 + this.rand.nextInt(16) + 8;
			if(i14 < 64 || this.rand.nextInt(10) === 0) {
				await (new  WorldGenLakes(Block.lavaStill.blockID)).generate(this.worldObj, this.rand, i13, i14, i15);
			}
		}

		let  i16: number;
		for(i13 = 0; i13 < 8; ++i13) {
			i14 = i4 + this.rand.nextInt(16) + 8;
			i15 = this.rand.nextInt(128);
			i16 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenDungeons()).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 10; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(128);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenClay(32)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 20; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(128);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.dirt.blockID, 32)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 10; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(128);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.gravel.blockID, 32)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 20; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(128);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.oreCoal.blockID, 16)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 20; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(64);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.oreIron.blockID, 8)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 2; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(32);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.oreGold.blockID, 8)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 8; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(16);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.oreRedstone.blockID, 7)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 1; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(16);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.oreDiamond.blockID, 7)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		for(i13 = 0; i13 < 1; ++i13) {
			i14 = i4 + this.rand.nextInt(16);
			i15 = this.rand.nextInt(16) + this.rand.nextInt(16);
			i16 = i5 + this.rand.nextInt(16);
			await (new  WorldGenMinable(Block.blockLapis.blockID, 6)).generate(this.worldObj, this.rand, i14, i15, i16);
		}

		d11 = 0.5;
		i13 = Math.floor((this.mobSpawnerNoise.func_806_a(Math.floor(i4) * d11, Math.floor(i5) * d11) / 8.0 + this.rand.nextDouble() * 4.0 + 4.0) / 3.0);
		i14 = 0;
		if(this.rand.nextInt(10) === 0) {
			++i14;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.forest) {
			i14 += i13 + 5;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.rainforest) {
			i14 += i13 + 5;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.seasonalForest) {
			i14 += i13 + 2;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.taiga) {
			i14 += i13 + 5;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.desert) {
			i14 -= 20;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.tundra) {
			i14 -= 20;
		}

		if(mobSpawnerBase6 === MobSpawnerBase.plains) {
			i14 -= 20;
		}

		let  i17: number;
		for(i15 = 0; i15 < i14; ++i15) {
			i16 = i4 + this.rand.nextInt(16) + 8;
			i17 = i5 + this.rand.nextInt(16) + 8;
			let  worldGenerator18: WorldGenerator = mobSpawnerBase6.getRandomWorldGenForTrees(this.rand);
			worldGenerator18.init(1.0, 1.0, 1.0);
			await worldGenerator18.generate(this.worldObj, this.rand, i16, await this.worldObj.getHeightValue(i16, i17), i17);
		}

		let  i23: number;
		for(i15 = 0; i15 < 2; ++i15) {
			i16 = i4 + this.rand.nextInt(16) + 8;
			i17 = this.rand.nextInt(128);
			i23 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenFlowers(Block.plantYellow.blockID)).generate(this.worldObj, this.rand, i16, i17, i23);
		}

		if(this.rand.nextInt(2) === 0) {
			i15 = i4 + this.rand.nextInt(16) + 8;
			i16 = this.rand.nextInt(128);
			i17 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenFlowers(Block.plantRed.blockID)).generate(this.worldObj, this.rand, i15, i16, i17);
		}

		if(this.rand.nextInt(4) === 0) {
			i15 = i4 + this.rand.nextInt(16) + 8;
			i16 = this.rand.nextInt(128);
			i17 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenFlowers(Block.mushroomBrown.blockID)).generate(this.worldObj, this.rand, i15, i16, i17);
		}

		if(this.rand.nextInt(8) === 0) {
			i15 = i4 + this.rand.nextInt(16) + 8;
			i16 = this.rand.nextInt(128);
			i17 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenFlowers(Block.mushroomRed.blockID)).generate(this.worldObj, this.rand, i15, i16, i17);
		}

		for(i15 = 0; i15 < 10; ++i15) {
			i16 = i4 + this.rand.nextInt(16) + 8;
			i17 = this.rand.nextInt(128);
			i23 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenReed()).generate(this.worldObj, this.rand, i16, i17, i23);
		}

		if(this.rand.nextInt(32) === 0) {
			i15 = i4 + this.rand.nextInt(16) + 8;
			i16 = this.rand.nextInt(128);
			i17 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenPumpkin()).generate(this.worldObj, this.rand, i15, i16, i17);
		}

		i15 = 0;
		if(mobSpawnerBase6 === MobSpawnerBase.desert) {
			i15 += 10;
		}

		let  i19: number;
		for(i16 = 0; i16 < i15; ++i16) {
			i17 = i4 + this.rand.nextInt(16) + 8;
			i23 = this.rand.nextInt(128);
			i19 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenCactus()).generate(this.worldObj, this.rand, i17, i23, i19);
		}

		for(i16 = 0; i16 < 50; ++i16) {
			i17 = i4 + this.rand.nextInt(16) + 8;
			i23 = this.rand.nextInt(this.rand.nextInt(120) + 8);
			i19 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenLiquids(Block.waterStill.blockID)).generate(this.worldObj, this.rand, i17, i23, i19);
		}

		for(i16 = 0; i16 < 20; ++i16) {
			i17 = i4 + this.rand.nextInt(16) + 8;
			i23 = this.rand.nextInt(this.rand.nextInt(this.rand.nextInt(112) + 8) + 8);
			i19 = i5 + this.rand.nextInt(16) + 8;
			await (new  WorldGenLiquids(Block.lavaStill.blockID)).generate(this.worldObj, this.rand, i17, i23, i19);
		}

		this.generatedTemperatures = this.worldObj.getWorldChunkManager().getTemperatures(this.generatedTemperatures, i4 + 8, i5 + 8, 16, 16);

		for(i16 = i4 + 8; i16 < i4 + 8 + 16; ++i16) {
			for(i17 = i5 + 8; i17 < i5 + 8 + 16; ++i17) {
				i23 = i16 - (i4 + 8);
				i19 = i17 - (i5 + 8);
				let  i20: number = await this.worldObj.findTopSolidBlock(i16, i17);
				let  d21: number = this.generatedTemperatures[i23 * 16 + i19] - (i20 - 64) / 64.0 * 0.3;
				if(d21 < 0.5 && i20 > 0 && i20 < 128 && (await this.worldObj.isAirBlock(i16, i20, i17)) && (await this.worldObj.getBlockMaterial(i16, i20 - 1, i17)).getIsSolid() && await this.worldObj.getBlockMaterial(i16, i20 - 1, i17) !== MaterialRegistry.ice) {
					await this.worldObj.setBlockWithNotify(i16, i20, i17, Block.snow.blockID);
				}
			}
		}

		BlockSand.fallInstantly = false;
	}

	public async saveChunks(z1: boolean, iProgressUpdate2: IProgressUpdate):  Promise<boolean> {
		return true;
	}

	public func_532_a():  boolean {
		return false;
	}

	public func_536_b():  boolean {
		return true;
	}

	public toString(): string {
		return "RandomLevelSource";
	}
}
