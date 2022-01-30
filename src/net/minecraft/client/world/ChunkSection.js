window.ChunkSection = class {

    static get SIZE() {
        return 16;
    }

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.group = new THREE.Object3D();
        this.dirty = true;

        this.blocks = [];
        for (let x = 0; x < ChunkSection.SIZE; x++) {
            for (let y = 0; y < ChunkSection.SIZE; y++) {
                for (let z = 0; z < ChunkSection.SIZE; z++) {
                    this.setBlockAt(x, y, z, 0);
                }
            }
        }
    }

    rebuild() {
        this.dirty = false;
        this.group.clear();

        for (let x = 0; x < ChunkSection.SIZE; x++) {
            for (let y = 0; y < ChunkSection.SIZE; y++) {
                for (let z = 0; z < ChunkSection.SIZE; z++) {
                    let typeId = this.getBlockAt(x, y, z);

                    if (typeId !== 0) {
                        let absoluteX = this.x * ChunkSection.SIZE + x;
                        let absoluteY = this.y * ChunkSection.SIZE + y;
                        let absoluteZ = this.z * ChunkSection.SIZE + z;

                        // Debug stuff
                        let color = 0x888888 | (Math.random() * 223);

                        let geometry = new THREE.BoxGeometry(1, 1, 1);
                        let material = new THREE.MeshBasicMaterial({
                            color: color
                        });

                        let cube = new THREE.Mesh(geometry, material);
                        cube.position.set(absoluteX - 0.5, absoluteY - 0.5, absoluteZ - 0.5);

                        this.group.add(cube);
                    }
                }
            }
        }
    }

    getBlockAt(x, y, z) {
        let index = y << 8 | z << 4 | x;
        return this.blocks[index];
    }

    setBlockAt(x, y, z, typeId) {
        let index = y << 8 | z << 4 | x;
        this.blocks[index] = typeId;
    }

    queueForRebuild() {
        this.dirty = true;
    }
}