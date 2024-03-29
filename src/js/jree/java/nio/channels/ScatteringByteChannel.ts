/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ByteBuffer } from "../ByteBuffer";
import { ReadableByteChannel } from "./ReadableByteChannel";

export interface ScatteringByteChannel extends ReadableByteChannel {
    read(target: ByteBuffer): Promise<number>;
    /** Reads a sequence of bytes from this channel into the given buffers. */
    read(target: ByteBuffer[]): Promise<bigint>;
    /** Reads a sequence of bytes from this channel into a subsequence of the given buffers. */
    read(target: ByteBuffer[], offset: number, length: number): Promise<bigint>;
}
