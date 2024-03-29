/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { FileInputStream, InputStream, OutputStream } from "../../io/index";
import { IllegalArgumentException } from "../../lang/IllegalArgumentException";
import { JavaObject } from "../../lang/Object";
import { ByteBuffer } from "../ByteBuffer";
import { ClosedChannelException } from "./ClosedChannelException";
import { ReadableByteChannel } from "./ReadableByteChannel";
import { AbstractInterruptibleChannel } from "./spi/AbstractInterruptibleChannel";
import { WritableByteChannel } from "./WritableByteChannel";

export class Channels extends JavaObject {
    public static newChannel(input: InputStream): ReadableByteChannel;
    public static newChannel(output: OutputStream): WritableByteChannel;
    public static newChannel(arg: InputStream | OutputStream): ReadableByteChannel | WritableByteChannel {
        if (arg instanceof InputStream) {
            if (arg instanceof FileInputStream) {
                return arg.getChannel();
            }

            return new class extends AbstractInterruptibleChannel implements ReadableByteChannel {
                public constructor() {
                    super();
                }

                public async read(dst: ByteBuffer): Promise<number> {
                    if (!this.isOpen()) {
                        throw new ClosedChannelException();
                    }

                    if (dst.isReadOnly()) {
                        throw new IllegalArgumentException();
                    }

                    return await arg.read(dst.array());
                }

                protected async implCloseChannel(): Promise<void> {
                    await arg.close();
                }
            }();
        } else {
            return new class extends AbstractInterruptibleChannel implements WritableByteChannel {
                public constructor() {
                    super();
                }

                public async write(src: ByteBuffer): Promise<number> {
                    if (!this.isOpen()) {
                        throw new ClosedChannelException();
                    }

                    const count = src.remaining();
                    await arg.write(src.array());

                    return count;
                }

                protected async implCloseChannel(): Promise<void> {
                    await arg.close();
                }
            }();
        }
    }

}
