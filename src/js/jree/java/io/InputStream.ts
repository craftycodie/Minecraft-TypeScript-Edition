/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* cspell: ignore readlimit */

import { NotImplementedError } from "../../NotImplementedError";
import { int, long } from "../../types";

import { JavaObject } from "../lang/Object";
import { JavaString } from "../lang/String";
import { Closeable } from "./Closeable";
import { IOException } from "./IOException";
import { OutputStream } from "./OutputStream";

/** This abstract class is the superclass of all classes representing an input stream of bytes. */
export abstract class InputStream extends JavaObject implements Closeable {
    public constructor() {
        super();
    }

    public static nullInputStream(): InputStream {
        return new class extends InputStream {
            public override async read(): Promise<int> {
                return -1;
            }
        }();
    }

    /**
     * @returns an estimate of the number of bytes that can be read (or skipped over) from this input stream without
     *          blocking by the next invocation of a method for this input stream.
     */
    public available(): int {
        return 0;
    }

    /** Closes this input stream and releases any system resources associated with the stream. */
    public async close(): Promise<void> {
        // Overridden by descendants.
    }

    /**
     * Marks the current position in this input stream.
     *
     * @param readlimit The maximum limit of bytes that can be read before the mark position becomes invalid.
     */
    public mark(readlimit: int): void {
        // Overridden by descendants.
    }

    /**
     * Tests if this input stream supports the mark and reset methods.
     *
     * @returns true if this stream instance supports the mark and reset methods; false otherwise.
     */
    public markSupported(): boolean {
        return false;
    }

    /** Reads the next byte of data from the input stream. */
    public /* abstract */ async read(): Promise<int>;
    /** Reads some number of bytes from the input stream and stores them into the buffer array b. */
    public async read(b: Int8Array): Promise<int>;
    /** Reads up to len bytes of data from the input stream into an array of bytes. */
    public async read(b: Int8Array, off: int, len: int): Promise<int>;
    public async read(...args: unknown[]): Promise<int> {
        if (args.length === 0) {
            throw new NotImplementedError("abstract");
        }

        const b = args[0] as Int8Array;
        let offset = 0;
        let length = b.length;

        if (args.length > 1) {
            offset = args[1] as int;
            length = args[2] as int;
        }

        for (let i = 0; i < length; ++i) {
            const c = await this.read();
            if (c === -1) {
                return i === 0 ? -1 : i;
            }

            b[offset + i] = c;
        }

        return length;
    }

    /**
     * Reads all bytes from this input stream and returns them as a byte array.
     *
     * @returns A byte array containing the bytes read from the stream.
     */
    public async readAllBytes(): Promise<Int8Array> {
        let buffer = new Int8Array(10000);
        let total = 0;
        while (true) {
            const read = await this.read(buffer, total, buffer.length - total);
            if (read === -1) {
                break;
            }

            total += read;
            if (total === buffer.length) {
                const newBuffer = new Int8Array(buffer.length * 2);
                newBuffer.set(buffer);
                buffer = newBuffer;
            }
        }

        return buffer.subarray(0, total);
    }

    /** Reads the requested number of bytes from the input stream into the given byte array. */
    public async readNBytes(b: Int8Array, off: int, len: int): Promise<int>;
    /** Reads up to a specified number of bytes from the input stream. */
    public async readNBytes(len: int): Promise<Int8Array>;
    public async readNBytes(...args: unknown[]): Promise<Int8Array | int> {
        if (args.length === 1) {
            const len = args[0] as int;
            const buffer = new Int8Array(len);
            let total = 0;
            while (total < len) {
                const read = await this.read(buffer, total, len - total);
                if (read === -1) {
                    break;
                }

                total += read;
            }

            return buffer.subarray(0, total);
        } else {
            const [b, offset, length] = args as [Int8Array, int, int];

            let total = 0;
            while (total < length) {
                const read = await this.read(b, offset + total, length - total);
                if (read === -1) {
                    break;
                }

                total += read;
            }

            return total;
        }
    }

    /** Repositions this stream to the position at the time the mark method was last called on this input stream. */
    public reset(): void {
        throw new IOException(new JavaString("mark/reset not supported"));
    }

    /**
     * Skips over and discards n bytes of data from this input stream.
     *
     * @param n the number of bytes to be skipped.
     *
     * @returns The actual number of bytes skipped.
     */
    public async skip(n: long): Promise<long> {
        let remaining = n;

        if (n <= 0n) {
            return 0n;
        }

        const size = Math.min(10000, Number(remaining));
        const skipBuffer = new Int8Array(size);
        while (remaining > 0) {
            const nr = await this.read(skipBuffer, 0, Math.min(size, Number(remaining)));
            if (nr < 0) {
                break;
            }
            remaining -= BigInt(nr);
        }

        return n - remaining;
    }

    /**
     * Reads all bytes from this input stream and writes the bytes to the given output stream in the order that they
     * are read.
     *
     * @param out The output stream to write the bytes to.
     *
     * @returns The number of bytes written.
     */
    public async transferTo(out: OutputStream): Promise<long> {
        let total = 0n;
        const buffer = new Int8Array(10000);
        while (true) {
            const read = await this.read(buffer);
            if (read === -1) {
                break;
            }

            await out.write(buffer, 0, read);
            total += BigInt(read);
        }

        return total;
    }
}
