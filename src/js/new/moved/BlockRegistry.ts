import { Block } from "../Block";
import { BlockBloodStone } from "../BlockBloodStone";
import { BlockBookshelf } from "../BlockBookshelf";
import { BlockChest } from "../BlockChest";
import { BlockCloth } from "../BlockCloth";
import { BlockCrops } from "../BlockCrops";
import { BlockDirt } from "../BlockDirt";
import { BlockDispenser } from "../BlockDispenser";
import { BlockFire } from "../BlockFire";
import { BlockFlower } from "../BlockFlower";
import { BlockFlowing } from "../BlockFlowing";
import { BlockFurnace } from "../BlockFurnace";
import { BlockGlass } from "../BlockGlass";
import { BlockGrass } from "../BlockGrass";
import { BlockGravel } from "../BlockGravel";
import { BlockLadder } from "../BlockLadder";
import { BlockLeaves } from "../BlockLeaves";
import { BlockLog } from "../BlockLog";
import { BlockMobSpawner } from "../BlockMobSpawner";
import { BlockMushroom } from "../BlockMushroom";
import { BlockNote } from "../BlockNote";
import { BlockObsidian } from "../BlockObsidian";
import { BlockOre } from "../BlockOre";
import { BlockOreBlock } from "../BlockOreBlock";
import { BlockSand } from "../BlockSand";
import { BlockSandStone } from "../BlockSandStone";
import { BlockSapling } from "../BlockSapling";
import { BlockSign } from "../BlockSign";
import { BlockSoil } from "../BlockSoil";
import { BlockSponge } from "../BlockSponge";
import { BlockStairs } from "../BlockStairs";
import { BlockStationary } from "../BlockStationary";
import { BlockStep } from "../BlockStep";
import { BlockStone } from "../BlockStone";
import { BlockTNT } from "../BlockTNT";
import { BlockTorch } from "../BlockTorch";
import { BlockWorkbench } from "../BlockWorkbench";
import { TileEntitySign } from "../TileEntitySign";
import { MaterialRegistry } from "./MaterialRegistry";

export class BlockRegistry {
	public static readonly stone:  Block = (new  BlockStone(1, 1)).setHardness(1.5).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stone");
	public static readonly grass:  BlockGrass = (new  BlockGrass(2)).setHardness(0.6).setStepSound(Block.soundGrassFootstep).setBlockName("grass") as BlockGrass;
	public static readonly dirt:  Block = (new  BlockDirt(3, 2)).setHardness(0.5).setStepSound(Block.soundGravelFootstep).setBlockName("dirt");
	public static readonly cobblestone:  Block = (new  Block(4, 16, MaterialRegistry.rock)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stonebrick");
	public static readonly planks:  Block = (new  Block(5, 4, MaterialRegistry.wood)).setHardness(2.0).setResistance(5.0).setStepSound(Block.soundWoodFootstep).setBlockName("wood");
	public static readonly sapling:  Block = (new  BlockSapling(6, 15)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("sapling");
	public static readonly bedrock:  Block = (new  Block(7, 17, MaterialRegistry.rock)).setHardness(-1.0).setResistance(6000000.0).setStepSound(Block.soundStoneFootstep).setBlockName("bedrock");
	public static readonly waterStill:  Block = (new  BlockFlowing(8, MaterialRegistry.water)).setHardness(100.0).setLightOpacity(3).setBlockName("water");
	public static readonly waterMoving:  Block = (new  BlockStationary(9, MaterialRegistry.water)).setHardness(100.0).setLightOpacity(3).setBlockName("water");
	public static readonly lavaStill:  Block = (new  BlockFlowing(10, MaterialRegistry.lava)).setHardness(0.0).setLightValue(1.0).setLightOpacity(255).setBlockName("lava");
	public static readonly lavaMoving:  Block = (new  BlockStationary(11, MaterialRegistry.lava)).setHardness(100.0).setLightValue(1.0).setLightOpacity(255).setBlockName("lava");
	public static readonly sand:  Block = (new  BlockSand(12, 18)).setHardness(0.5).setStepSound(Block.soundSandFootstep).setBlockName("sand");
	public static readonly gravel:  Block = (new  BlockGravel(13, 19)).setHardness(0.6).setStepSound(Block.soundGravelFootstep).setBlockName("gravel");
	public static readonly oreGold:  Block = (new  BlockOre(14, 32)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreGold");
	public static readonly oreIron:  Block = (new  BlockOre(15, 33)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreIron");
	public static readonly oreCoal:  Block = (new  BlockOre(16, 34)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreCoal");
	public static readonly wood:  Block = (new  BlockLog(17)).setHardness(2.0).setStepSound(Block.soundWoodFootstep).setBlockName("log");
	public static readonly leaves:  BlockLeaves = (new  BlockLeaves(18, 52)).setHardness(0.2).setLightOpacity(1).setStepSound(Block.soundGrassFootstep).setBlockName("leaves") as BlockLeaves;
	public static readonly sponge:  Block = (new  BlockSponge(19)).setHardness(0.6).setStepSound(Block.soundGrassFootstep).setBlockName("sponge");
	public static readonly glass:  Block = (new  BlockGlass(20, 49, MaterialRegistry.glass, false)).setHardness(0.3).setStepSound(Block.soundGlassFootstep).setBlockName("glass");
	public static readonly oreLapis:  Block = (new  BlockOre(21, 160)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreLapis");
	public static readonly blockLapis:  Block = (new  Block(22, 144, MaterialRegistry.rock)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("blockLapis");
	public static readonly dispenser:  Block = (new  BlockDispenser(23)).setHardness(3.5).setStepSound(Block.soundStoneFootstep).setBlockName("dispenser");
	public static readonly sandStone:  Block = (new  BlockSandStone(24)).setStepSound(Block.soundStoneFootstep).setHardness(0.8).setBlockName("sandStone");
	public static readonly musicBlock:  Block = (new  BlockNote(25)).setHardness(0.8).setBlockName("musicBlock");
	public static readonly field_9262_S:  Block | null = null;
	public static readonly field_9261_T:  Block | null = null;
	public static readonly field_9260_U:  Block | null = null;
	public static readonly field_9259_V:  Block | null = null;
	public static readonly field_9258_W:  Block | null = null;
	public static readonly field_9257_X:  Block | null = null;
	public static readonly field_9256_Y:  Block | null = null;
	public static readonly field_9255_Z:  Block | null = null;
	public static readonly field_9269_aa:  Block | null = null;
	public static readonly cloth:  Block = (new  BlockCloth()).setHardness(0.8).setStepSound(Block.soundClothFootstep).setBlockName("cloth");
	public static readonly field_9268_ac:  Block | null = null;
	public static readonly plantYellow:  BlockFlower | null = (new  BlockFlower(37, 13)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("flower") as BlockFlower;
	public static readonly plantRed:  BlockFlower | null = (new  BlockFlower(38, 12)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("rose") as BlockFlower;
	public static readonly mushroomBrown:  BlockFlower | null = (new  BlockMushroom(39, 29)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setLightValue(0.125).setBlockName("mushroom") as BlockFlower;
	public static readonly mushroomRed:  BlockFlower | null = (new  BlockMushroom(40, 28)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("mushroom") as BlockFlower;
	public static readonly blockGold:  Block = (new  BlockOreBlock(41, 23)).setHardness(3.0).setResistance(10.0).setStepSound(Block.soundMetalFootstep).setBlockName("blockGold");
	public static readonly blockSteel:  Block = (new  BlockOreBlock(42, 22)).setHardness(5.0).setResistance(10.0).setStepSound(Block.soundMetalFootstep).setBlockName("blockIron");
	public static readonly stairDouble:  Block = (new  BlockStep(43, true)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stoneSlab");
	public static readonly stairSingle:  Block = (new  BlockStep(44, false)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stoneSlab");
	public static readonly brick:  Block = (new  Block(45, 7, MaterialRegistry.rock)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("brick");
	public static readonly tnt:  Block = (new  BlockTNT(46, 8)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("tnt");
	public static readonly bookShelf:  Block = (new  BlockBookshelf(47, 35)).setHardness(1.5).setStepSound(Block.soundWoodFootstep).setBlockName("bookshelf");
	public static readonly cobblestoneMossy:  Block = (new  Block(48, 36, MaterialRegistry.rock)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("stoneMoss");
	public static readonly obsidian:  Block = (new  BlockObsidian(49, 37)).setHardness(10.0).setResistance(2000.0).setStepSound(Block.soundStoneFootstep).setBlockName("obsidian");
	public static readonly torchWood:  Block = (new  BlockTorch(50, 80)).setHardness(0.0).setLightValue(0.9375).setStepSound(Block.soundWoodFootstep).setBlockName("torch");
	public static readonly fire:  BlockFire = (new  BlockFire(51, 31)).setHardness(0.0).setLightValue(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("fire") as BlockFire;
	public static readonly mobSpawner:  Block = (new  BlockMobSpawner(52, 65)).setHardness(5.0).setStepSound(Block.soundMetalFootstep).setBlockName("mobSpawner");
	public static readonly stairCompactPlanks:  Block = (new  BlockStairs(53, BlockRegistry.planks)).setBlockName("stairsWood");
	public static readonly crate:  Block = (new  BlockChest(54)).setHardness(2.5).setStepSound(Block.soundWoodFootstep).setBlockName("chest");
	// public static readonly redstoneWire:  Block = (new  BlockRedstoneWire(55, 84)).setHardness(0.0).setStepSound(Block.soundPowderFootstep).setBlockName("redstoneDust");
	public static readonly oreDiamond:  Block = (new  BlockOre(56, 50)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreDiamond");
	public static readonly blockDiamond:  Block = (new  BlockOreBlock(57, 24)).setHardness(5.0).setResistance(10.0).setStepSound(Block.soundMetalFootstep).setBlockName("blockDiamond");
	public static readonly workbench:  Block = (new  BlockWorkbench(58)).setHardness(2.5).setStepSound(Block.soundWoodFootstep).setBlockName("workbench");
	public static readonly crops:  Block = (new  BlockCrops(59, 88)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("crops");
	public static readonly tilledField:  Block = (new  BlockSoil(60)).setHardness(0.6).setStepSound(Block.soundGravelFootstep).setBlockName("farmland");
	public static readonly stoneOvenIdle:  Block = (new  BlockFurnace(61, false)).setHardness(3.5).setStepSound(Block.soundStoneFootstep).setBlockName("furnace");
	public static readonly stoneOvenActive:  Block = (new  BlockFurnace(62, true)).setHardness(3.5).setStepSound(Block.soundStoneFootstep).setLightValue(0.875).setBlockName("furnace");
	public static readonly signPost:  Block = (new  BlockSign(63, 'Sign', true)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("sign");
	public static readonly doorWood:  Block = (new  BlockDoor(64, MaterialRegistry.wood)).setHardness(3.0).setStepSound(Block.soundWoodFootstep).setBlockName("doorWood");
	public static readonly ladder:  Block = (new  BlockLadder(65, 83)).setHardness(0.4).setStepSound(Block.soundWoodFootstep).setBlockName("ladder");
	public static readonly minecartTrack:  Block = (new  BlockMinecartTrack(66, 128)).setHardness(0.7).setStepSound(Block.soundMetalFootstep).setBlockName("rail");
	public static readonly stairCompactCobblestone:  Block = (new  BlockStairs(67, BlockRegistry.cobblestone)).setBlockName("stairsStone");
	public static readonly signWall:  Block = (new  BlockSign(68, 'Sign', false)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("sign");
	public static readonly lever:  Block = (new  BlockLever(69, 96)).setHardness(0.5).setStepSound(Block.soundWoodFootstep).setBlockName("lever");
	public static readonly pressurePlateStone:  Block = (new  BlockPressurePlate(70, Block.stone.blockIndexInTexture, EnumMobType.mobs)).setHardness(0.5).setStepSound(Block.soundStoneFootstep).setBlockName("pressurePlate");
	public static readonly doorSteel:  Block = (new  BlockDoor(71, MaterialRegistry.iron)).setHardness(5.0).setStepSound(Block.soundMetalFootstep).setBlockName("doorIron");
	public static readonly pressurePlatePlanks:  Block = (new  BlockPressurePlate(72, Block.planks.blockIndexInTexture, EnumMobType.everything)).setHardness(0.5).setStepSound(Block.soundWoodFootstep).setBlockName("pressurePlate");
	public static readonly oreRedstone:  Block = (new  BlockRedstoneOre(73, 51, false)).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreRedstone");
	public static readonly oreRedstoneGlowing:  Block = (new  BlockRedstoneOre(74, 51, true)).setLightValue(0.625).setHardness(3.0).setResistance(5.0).setStepSound(Block.soundStoneFootstep).setBlockName("oreRedstone");
	public static readonly torchRedstoneIdle:  Block = (new  BlockRedstoneTorch(75, 115, false)).setHardness(0.0).setStepSound(Block.soundWoodFootstep).setBlockName("notGate");
	public static readonly torchRedstoneActive:  Block = (new  BlockRedstoneTorch(76, 99, true)).setHardness(0.0).setLightValue(0.5).setStepSound(Block.soundWoodFootstep).setBlockName("notGate");
	public static readonly button:  Block = (new  BlockButton(77, Block.stone.blockIndexInTexture)).setHardness(0.5).setStepSound(Block.soundStoneFootstep).setBlockName("button");
	public static readonly snow:  Block = (new  BlockSnow(78, 66)).setHardness(0.1).setStepSound(Block.soundClothFootstep).setBlockName("snow");
	public static readonly ice:  Block = (new  BlockIce(79, 67)).setHardness(0.5).setLightOpacity(3).setStepSound(Block.soundGlassFootstep).setBlockName("ice");
	public static readonly blockSnow:  Block = (new  BlockSnowBlock(80, 66)).setHardness(0.2).setStepSound(Block.soundClothFootstep).setBlockName("snow");
	public static readonly cactus:  Block = (new  BlockCactus(81, 70)).setHardness(0.4).setStepSound(Block.soundClothFootstep).setBlockName("cactus");
	public static readonly blockClay:  Block = (new  BlockClay(82, 72)).setHardness(0.6).setStepSound(Block.soundGravelFootstep).setBlockName("clay");
	public static readonly reed:  Block = (new  BlockReed(83, 73)).setHardness(0.0).setStepSound(Block.soundGrassFootstep).setBlockName("reeds");
	public static readonly jukebox:  Block = (new  BlockJukeBox(84, 74)).setHardness(2.0).setResistance(10.0).setStepSound(Block.soundStoneFootstep).setBlockName("jukebox");
	public static readonly fence:  Block = (new  BlockFence(85, 4)).setHardness(2.0).setResistance(5.0).setStepSound(Block.soundWoodFootstep).setBlockName("fence");
	public static readonly pumpkin:  Block = (new  BlockPumpkin(86, 102, false)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setBlockName("pumpkin");
	public static readonly bloodStone:  Block = (new  BlockBloodStone(87, 103)).setHardness(0.4).setStepSound(Block.soundStoneFootstep).setBlockName("hellrock");
	public static readonly slowSand:  Block = (new  BlockSlowSand(88, 104)).setHardness(0.5).setStepSound(Block.soundSandFootstep).setBlockName("hellsand");
	public static readonly lightStone:  Block = (new  BlockLightStone(89, 105, MaterialRegistry.glass)).setHardness(0.3).setStepSound(Block.soundGlassFootstep).setLightValue(1.0).setBlockName("lightgem");
	public static readonly portal:  BlockPortal | null = (new  BlockPortal(90, 14)).setHardness(-1.0).setStepSound(Block.soundGlassFootstep).setLightValue(0.75).setBlockName("portal") as BlockPortal;
	public static readonly pumpkinLantern:  Block = (new  BlockPumpkin(91, 102, true)).setHardness(1.0).setStepSound(Block.soundWoodFootstep).setLightValue(1.0).setBlockName("litpumpkin");
	public static readonly cake:  Block = (new  BlockCake(92, 121)).setHardness(0.5).setStepSound(Block.soundClothFootstep).setBlockName("cake");
}