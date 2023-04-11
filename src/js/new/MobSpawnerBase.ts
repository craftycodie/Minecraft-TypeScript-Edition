import { JavaObject, java, int, byte, float, double } from "../jree/index";
import { WorldGenerator } from "./WorldGenerator";
import { WorldGenTrees } from "./WorldGenTrees";
import { WorldGenBigTree } from "./WorldGenBigTree";
import { EnumCreatureType } from "./EnumCreatureType";
import { BlockRegistry } from "./index";
import { MobSpawnerRegistry } from "./moved/MobSpawnerRegistry";
import { Color } from "../jree/java/util/Color";
import { Random } from "../java/util/Random";

export  class MobSpawnerBase extends JavaObject {
	public biomeName:  string;
	public color:  int;
	public topBlock:  byte = BlockRegistry.grass.blockID as byte;
	public fillerBlock:  byte = BlockRegistry.dirt.blockID as byte;
	public field_6502_q:  int = 5169201;
	protected biomeMonsters:  string[] =  ['Spider', 'Zombie', 'Skeleton', 'Creeper'];
	protected biomeCreatures:  string[] =  ['Sheep', 'Pig', 'Chicken', 'Cow'];
	protected biomeWaterCreatures:  string[] =  ['Squid'];
	private static biomeLookupTable:  MobSpawnerBase[] = new   Array<MobSpawnerBase>(4096);

	public static generateBiomeLookup():  void {
		for(let  i0: int = 0; i0 < 64; ++i0) {
			for(let  i1: int = 0; i1 < 64; ++i1) {
				MobSpawnerBase.biomeLookupTable[i0 + i1 * 64] = MobSpawnerBase.getBiome(i0 as float / 63.0, i1 as float / 63.0);
			}
		}

		MobSpawnerRegistry.desert.topBlock = MobSpawnerRegistry.desert.fillerBlock = BlockRegistry.sand.blockID as byte;
		MobSpawnerRegistry.iceDesert.topBlock = MobSpawnerRegistry.iceDesert.fillerBlock = BlockRegistry.sand.blockID as byte;
	}

	public getRandomWorldGenForTrees(random1: Random| null):  WorldGenerator | null {
		return (random1.nextInt(10) === 0 ? new  WorldGenBigTree() : new  WorldGenTrees()) as WorldGenerator;
	}

	public doesNothingForMobSpawnerBase():  MobSpawnerBase | null {
		return this;
	}

	public setBiomeName(string1: string):  MobSpawnerBase | null {
		this.biomeName = string1;
		return this;
	}

	public func_4124_a(i1: int):  MobSpawnerBase | null {
		this.field_6502_q = i1;
		return this;
	}

	public setColor(i1: int):  MobSpawnerBase | null {
		this.color = i1;
		return this;
	}

	public static getBiomeFromLookup(d0: double, d2: double):  MobSpawnerBase | null {
		let  i4: int = (d0 * 63.0) as int;
		let  i5: int = (d2 * 63.0) as int;
		return MobSpawnerBase.biomeLookupTable[i4 + i5 * 64];
	}

	public static getBiome(f0: float, f1: float):  MobSpawnerBase | null {
		f1 *= f0;
		return f0 < 0.1 ? MobSpawnerRegistry.tundra : (f1 < 0.2 ? (f0 < 0.5 ? MobSpawnerRegistry.tundra : (f0 < 0.95 ? MobSpawnerRegistry.savanna : MobSpawnerRegistry.desert)) : (f1 > 0.5 && f0 < 0.7 ? MobSpawnerRegistry.swampland : (f0 < 0.5 ? MobSpawnerRegistry.taiga : (f0 < 0.97 ? (f1 < 0.35 ? MobSpawnerRegistry.shrubland : MobSpawnerRegistry.forest) : (f1 < 0.45 ? MobSpawnerRegistry.plains : (f1 < 0.9 ? MobSpawnerRegistry.seasonalForest : MobSpawnerRegistry.rainforest))))));
	}

	public getSkyColorByTemp(f1: float):  int {
		f1 /= 3.0;
		if(f1 < -1.0) {
			f1 = -1.0;
		}

		if(f1 > 1.0) {
			f1 = 1.0;
		}

		return Color.getHSBColor(0.62222224 - f1 * 0.05, 0.5 + f1 * 0.1, 1.0).getRGB();
	}

	public getEntitiesForType(enumCreatureType1: EnumCreatureType):  string[] | null {
		return enumCreatureType1 === EnumCreatureType.monster ? this.biomeMonsters : (enumCreatureType1 === EnumCreatureType.creature ? this.biomeCreatures : (enumCreatureType1 === EnumCreatureType.waterCreature ? this.biomeWaterCreatures : null));
	}

	static {
		MobSpawnerBase.generateBiomeLookup();
	}
}