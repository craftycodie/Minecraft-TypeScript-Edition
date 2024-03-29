/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { int } from "../../types";
import { JavaString } from "../lang/String";
import { ByteBuffer } from "../nio/ByteBuffer";
import { Charset } from "../nio/charset/Charset";
import { OutputStream } from "./OutputStream";

/**
 * This class implements an output stream in which the data is written into a byte array. The buffer automatically
 * grows as data is written to it. The data can be retrieved using toByteArray() and toString().
 */
export class ByteArrayOutputStream extends OutputStream {
    protected buf: Int8Array;
    protected count: int;

    /** Creates a new ByteArrayOutputStream. */
    public constructor();
    /** Creates a new ByteArrayOutputStream with the specified initial size, in bytes. */
    public constructor(size: int);
    public constructor(...args: unknown[]) {
        super();

        let size = 32;
        if (args.length > 0) {
            size = args[0] as int;
        }

        this.buf = new Int8Array(size);
        this.count = 0;
    }

    public override async close(): Promise<void> {
        // Do nothing.
    }

    public reset(): void {
        this.count = 0;
    }

    /** @returns the current size of the buffer. */
    public size(): int {
        return this.count;
    }

    /**
     * Creates a newly allocated byte array.
     *
     * @returns the current contents of this output stream, as a byte array.
     */
    public toByteArray(): Int8Array {
        return this.buf.slice(0, this.count);
    }

    /** Converts the buffer's contents into a string decoding bytes using the platform's default character set. */
    public override toString(): JavaString;
    /** Converts the buffer's contents into a string decoding bytes using the specified character set. */
    public override toString(charsetName: JavaString | string): JavaString;
    public override toString(charset: Charset): JavaString;
    public override toString(...args: unknown[]): JavaString {
        let charset;
        if (args.length > 0) {
            if (args[0] instanceof Charset) {
                charset = args[0];
            } else {
                charset = Charset.forName(args[0] as JavaString | string);
            }
        } else {
            charset = Charset.defaultCharset();
        }
        const array = this.buf.subarray(0, this.count);
        const buffer = ByteBuffer.wrap(array);

        return new JavaString(charset.decode(buffer).array());
    }

    public override async write(b: Int8Array): Promise<void>;
    /** Writes len bytes from the specified byte array starting at offset off to this ByteArrayOutputStream. */
    public override async write(b: Int8Array, off: int, len: int): Promise<void>;
    /** Writes the specified byte to this ByteArrayOutputStream. */
    public override async write(b: int): Promise<void>;
    public override async write(...args: unknown[]): Promise<void> {
        if (args.length === 1) {
            const b = args[0] as int | Int8Array;
            if (b instanceof Int8Array) {
                await this.write(b, 0, b.length);

                return;
            }

            this.expandBuffer(1);
            this.buf[this.count++] = args[0] as int;
        } else {
            const [b, off, len] = args as [Int8Array, int, int];
            this.expandBuffer(len);
            this.buf.set(b.subarray(off, off + len), this.count);
            this.count += len;
        }
    }

    /**
     * Writes the complete contents of the specified byte array to this ByteArrayOutputStream.
     *
     * @param b The byte array to write.
     */
    public async writeBytes(b: Int8Array): Promise<void> {
        await this.write(b, 0, b.length);
    }

    /**
     * Writes the complete contents of this ByteArrayOutputStream to the specified output stream argument, as if by
     * calling the output stream's write method using out.write(buf, 0, count).
     *
     * @param out The output stream to write to.
     */
    public async writeTo(out: OutputStream): Promise<void> {
        await out.write(this.buf, 0, this.count);
    }

    /**
     * Extends the internal buffer to fit the given number of additional characters.
     *
     * @param min The minimum number of additional characters that must fit in the buffer.
     */
    private expandBuffer(min: int): void {
        if (this.count + min <= this.buf.length) {
            return;
        }

        let newLength = this.buf.length * 2;
        if (this.count + min > newLength) {
            newLength = this.count + min;
        }

        const newBuffer = new Int8Array(newLength);
        newBuffer.set(this.buf);
        this.buf = newBuffer;
    }
}
