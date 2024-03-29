/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { S } from "../../templates";
import { int } from "../../types";

import { JavaString } from "../lang/String";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
import { IndexOutOfBoundsException } from "../lang/IndexOutOfBoundsException";
import { System } from "../lang/System";
import { IOException } from "./IOException";

import { Writer } from "./Writer";
import { convertStringToUTF16 } from "../../string-helpers";

/**
 * Writes text to a character-output stream, buffering characters so as to provide for the efficient writing of single
 * characters, arrays, and strings.
 */
export class BufferedWriter extends Writer {
    #out: Writer | null;
    #buffer: Uint16Array;
    #currentPosition = 0;

    /**
     * Creates a new buffered character-output stream that uses an output
     * buffer of the given size.
     *
     * @param out A Writer
     * @param sz Output-buffer size, a positive integer
     */
    public constructor(out: Writer, sz = 10000) {
        super(out);
        if (sz <= 0) {
            throw new IllegalArgumentException(S`Buffer size <= 0`);
        }

        this.#out = out;
        this.#buffer = new Uint16Array(sz);
        this.#currentPosition = 0;
    }

    public async close(): Promise<void> {
        if (this.#out === null) {
            return;
        }

        try {
            await this.flush();
        } finally {
            await this.#out.close();
            this.#out = null;
            this.#buffer = new Uint16Array();
        }
    }

    public async flush(): Promise<void> {
        this.checkOpen();

        if (this.#currentPosition > 0) {
            await this.#out?.write(this.#buffer, 0, this.#currentPosition);
            this.#currentPosition = 0;
        }

        await this.#out?.flush();
    }

    /** Writes a line separator. */
    public async newLine(): Promise<void> {
        await this.write(System.lineSeparator());
    }

    /** Writes an array of characters. */
    public override async write(buffer: Uint16Array): Promise<void>;
    /** Writes a portion of an array of characters. */
    public override async write(buffer: Uint16Array, offset: int, length: int): Promise<void>;
    /** Writes a single character. */
    public override async write(c: int): Promise<void>;
    /** Writes a string. */
    public override async write(str: string | JavaString): Promise<void>;
    /** Writes a portion of a string. */
    public override async write(str: string | JavaString, offset: int, length: int): Promise<void>;
    public override async write(...args: unknown[]): Promise<void> {
        switch (args.length) {
            case 1: {
                const source = args[0] as Uint16Array | int | string | JavaString;
                if (typeof source === "number") {
                    if (this.#currentPosition >= this.#buffer.length) {
                        await this.flush();
                    }

                    this.#buffer[this.#currentPosition++] = source;
                } else {
                    let data;
                    if (typeof source === "string" || source instanceof JavaString) {
                        data = convertStringToUTF16(source.valueOf());
                    } else {
                        data = source;
                    }

                    if (this.#currentPosition + data.length > this.#buffer.length) {
                        await this.flush();
                    }

                    if (data.length >= this.#buffer.length) {
                        this.#out?.write(data);
                    } else {
                        this.#buffer.set(data, this.#currentPosition);
                    }
                }

                break;
            }

            case 3: {
                const [source, offset, length] = args as [Uint16Array | string | JavaString, int, int];

                let data;
                if (typeof source === "string" || source instanceof JavaString) {
                    data = convertStringToUTF16(source.valueOf());
                } else {
                    data = source;
                }

                if ((offset < 0) || (length < 0) || ((offset + length) > data.length)) {
                    throw new IndexOutOfBoundsException();
                }

                if (length > 0) {
                    if (this.#currentPosition + length > this.#buffer.length) {
                        await this.flush();
                    }

                    if (length >= this.#buffer.length) {
                        this.#out?.write(data, offset, length);
                    } else {
                        this.#buffer.set(data.subarray(offset, offset + length), this.#currentPosition);
                    }

                    this.#currentPosition += length;
                }

                break;
            }

            default: {
                throw new IllegalArgumentException(S`Invalid number of arguments`);
            }
        }
    }

    /** Checks to make sure that the stream has not been closed */
    private checkOpen(): void {
        if (this.#out === null) {
            throw new IOException(S`Stream closed`);
        }
    }
}
