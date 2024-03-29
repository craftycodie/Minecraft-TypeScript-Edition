/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { closeAsync, openAsync } from "../../../node/fs";
import { JavaObject } from "../lang/Object";
import { Throwable } from "../lang/Throwable";
import { Closeable } from "./Closeable";
import { IOException } from "./IOException";

/**
 * Instances of the file descriptor class serve as an opaque handle to the underlying machine-specific structure
 * representing an open file, an open socket, or another source or sink of bytes. The main practical use for a
 * file descriptor is to create a FileInputStream or FileOutputStream to contain it.
 */
export class FileDescriptor extends JavaObject {
    private parent?: Closeable;
    private otherParents: Closeable[] = [];
    private closed = false;

    private fileHandle?: any;

    /** Constructs an (invalid) FileDescriptor object. */
    public constructor() {
        super();
    }

    /**
     * Force all system buffers to synchronize with the underlying device.
     */
    public async sync(): Promise<void> {
        if (!this.fileHandle) {
            throw new IOException("File descriptor is not open");
        }

        await closeAsync(this.fileHandle);
        this.fileHandle = await openAsync(this.fileHandle.path, 'w', 0);

        // console.error('FileDescriptor.sync is not yet implemented.')

        // fsyncSync(this.fileHandle);
    }

    /**
     * Tests if this file descriptor object is valid.
     *
     * @returns true if the file descriptor object represents a valid, open file, socket, or other active
     * I/O connection; false otherwise.
     */
    public valid(): boolean {
        return !!this.fileHandle;
    }

    public async close(): Promise<void> {
        // console.log('FileDescriptor.close', this.closed, this.fileHandle);
        if (this.fileHandle) {
            await closeAsync(this.fileHandle);
        }
    }

    public get handle(): any | undefined {
        return this.fileHandle;
    }

    public set handle(value: any | undefined) {
        this.fileHandle = value;
    }

    /**
     * Attach a Closeable to this FD for tracking.
     * parent reference is added to otherParents when
     * needed to make closeAll simpler.
     *
     * @param c tbd
     */
    public attach(c: Closeable): void {
        if (!this.parent) {
            // first caller gets to do this
            this.parent = c;
        } else if (this.otherParents.length === 0) {
            this.otherParents.push(this.parent);
            this.otherParents.push(c);
        } else {
            this.otherParents.push(c);
        }
    }

    /**
     * Cycle through all closeables sharing this FD and call
     * close() on each one.
     *
     * The caller closeable gets to call close0().
     *
     * @param releaser tbd
     */
    public async closeAll(releaser: Closeable): Promise<void> {
        if (!this.closed) {
            this.closed = true;
            let ioe: IOException | undefined;

            try {
                try {
                    for (const referent of this.otherParents) {
                        try {
                            await referent.close();
                        } catch (x) {
                            const t = Throwable.fromError(x);
                            if (!ioe) {
                                ioe = t;
                            } else {
                                ioe.addSuppressed(t);
                            }
                        }
                    }
                } finally {
                    await releaser.close();
                }
            } catch (ex) {
                console.error({ex})
                /*
                 * If releaser close() throws IOException
                 * add other exceptions as suppressed.
                 */
                const t = Throwable.fromError(ex);
                if (ioe) {
                    t.addSuppressed(ioe);
                }

                ioe = t;
            } finally {
                if (ioe) {
                    // eslint-disable-next-line no-unsafe-finally
                    throw ioe;
                }
            }
        }
    }

}
