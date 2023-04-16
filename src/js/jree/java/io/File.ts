/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import path from '../../../node/path';
// import { randomBytes } from 'crypto';
// import os from "os";
// import crypto from "crypto";

import { JavaObject } from "../lang/Object";
import { JavaString } from "../lang/String";
import { Comparable } from "../lang/Comparable";
import { Serializable } from "./Serializable";
import { Path } from "../nio/file/Path";
import { URI } from "../net/URI";
import { FileSystems } from "../nio/file/FileSystems";
import { NullPointerException } from "../lang/NullPointerException";
import { IllegalArgumentException } from "../lang/IllegalArgumentException";
// import { existsSync, mkdirSync, openSync, rmdirSync, statSync, unlinkSync } from "fs";
import { Random } from '../../../java/util/Random';
import { deleteAsync, existsAsync, mkdirAsync, renameAsync, statAsync } from '../../../node/fs';

const pendingFiles = new Set<JavaFile>();

/** An abstract representation of file and directory pathnames. */
export class JavaFile extends JavaObject implements Comparable<JavaFile>, Serializable {
    /** The system-dependent path-separator character, represented as a string for convenience. */
    public static readonly pathSeparator = new JavaString(`/`);

    /** The system-dependent path-separator character. */
    public static readonly pathSeparatorChar = '/'.charCodeAt(0);

    /** The system-dependent default name-separator character, represented as a string for convenience. */
    public static readonly separator = new JavaString(`/`);

    /** The system-dependent name-separator character. */
    public static readonly separatorChar = '/'.charCodeAt(0);

    #path: Path;
    #isAbsolute: boolean;

    /** Creates a new File instance from a parent abstract pathname and a child pathname string. */
    public constructor(parent: JavaFile | null, child: JavaString);
    /** Creates a new File instance by converting the given pathname string into an abstract pathname. */
    public constructor(pathName: JavaString);
    /** Creates a new File instance from a parent pathname string and a child pathname string. */
    public constructor(parent: JavaString | null, child: JavaString);
    /** Creates a new File instance by converting the given file: URI into an abstract pathname. */
    public constructor(uri: URI);
    public constructor(...args: unknown[]) {
        super();

        switch (args.length) {
            case 1: {
                let pathName;
                if (args[0] instanceof JavaString) {
                    pathName = args[0];
                } else {
                    pathName = (args[0] as URI).getPath();
                }
                this.#path = FileSystems.getDefault().getPath(pathName);
                this.#isAbsolute = path.isAbsolute(`${this.#path}`);

                break;
            }

            case 2: {
                const parent = args[0] as JavaFile | JavaString | URI | null;
                const child = args[1] as JavaString;

                if (!parent && !child) {
                    throw new NullPointerException();
                } else if (!parent) {
                    this.#path = FileSystems.getDefault().getPath(child);
                } else {
                    let parentPath: Path;
                    if (parent instanceof JavaString) {
                        parentPath = FileSystems.getDefault().getPath(parent);
                    } else if (parent instanceof JavaFile) {
                        parentPath = parent.#path;
                    } else {
                        parentPath = FileSystems.getDefault().getPath(parent.getPath());
                    }

                    if (child) {
                        let childPath = FileSystems.getDefault().getPath(child);
                        if (childPath.isAbsolute()) {
                            childPath = childPath.subpath(0, childPath.getNameCount());
                        }

                        this.#path = parentPath.resolve(childPath);
                    } else {
                        this.#path = parentPath;
                    }
                }
                this.#isAbsolute = path.isAbsolute(`${this.#path}`);

                break;
            }

            default: {
                throw new IllegalArgumentException(new JavaString("Invalid number of arguments"));
            }
        }
    }

    /**
     * Creates an empty file in the default temporary-file directory, using the given prefix and suffix to generate
     * its name.
     */
    public static createTempFile(prefix: JavaString | string, suffix: JavaString | string | null): JavaFile;
    /**
     * Creates a new empty file in the specified directory, using the given prefix and suffix strings to generate its
     * name.
     */
    public static createTempFile(prefix: JavaString | string, suffix: JavaString | string | null,
        directory: JavaFile | null): JavaFile;
    public static createTempFile(...args: unknown[]): JavaFile {
        console.error('File.createTempFile not yet implemented.')

        let folder;
        let prefix;
        let suffix;
        if (args.length === 3) {
            const [p, s, f] = args as [JavaString | string, JavaString | string | null, JavaFile];
            suffix = s === null ? ".tmp" : s.valueOf();
            prefix = p.valueOf();
            folder = f.getPath().valueOf();
        } else {
            [prefix, suffix] = args as [JavaString | string, JavaString | string | null];
            folder = 'javatemp/'
        }

        const name = path.join(folder, prefix + new Random().nextLong().toString(16) + suffix);
        // openSync(name, "ax+");

        return new JavaFile(new JavaString(name));
    }

    /**
     * Tests whether the application can execute the file denoted by this abstract pathname.
     *
     * @returns true if and only if the abstract pathname exists and the application is allowed to execute the file
     */
    public canExecute(): boolean {
        console.error('File.canExecute not yet implemented.')
        return false;

        // const stat = statSync(`${this.#path}`);

        // return (stat.mode & 0o111) !== 0;
    }

    /**
     * Tests whether the application can read the file denoted by this abstract pathname.
     *
     * @returns true if and only if the file specified by this abstract pathname exists and can be read
     */
    public canRead(): boolean {
        console.error('File.canRead not yet implemented.')
        return true;

        // const stat = statSync(`${this.#path}`);

        // return (stat.mode & 0o444) !== 0;
    }

    /**
     * Tests whether the application can modify the file denoted by this abstract pathname.
     *
     * @returns true if and only if the file system actually contains a file denoted by this abstract pathname and the
     *          application is allowed to write to the file
     */
    public canWrite(): boolean {
        console.error('File.canWrite not yet implemented.')
        return true;

        // const stat = statSync(`${this.#path}`);

        // return (stat.mode & 0o222) !== 0;
    }

    /**
     * Compares two abstract pathnames lexicographically.
     *
     * @param other The abstract pathname to be compared to this abstract pathname
     *
     * @returns Zero if the argument is equal to this abstract pathname, a value less than zero if this abstract
     *          pathname is lexicographically less than the argument, or a value greater than zero if this abstract
     *          pathname is lexicographically greater than the argument.
     */
    public compareTo(other: JavaFile): number {
        return this.#path.compareTo(other.#path);
    }

    /**
     * Deletes the file or directory denoted by this abstract pathname.
     *
     * @returns true if and only if the file or directory is successfully deleted; false otherwise
     */
    public async delete(): Promise<boolean> {
        try {
            await deleteAsync('' + this.#path.toString());
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Requests that the file or directory denoted by this abstract pathname be deleted when the virtual machine
     * terminates.
     */
    public deleteOnExit(): void {
        pendingFiles.add(this);
    }

    /**
     * Tests whether the file or directory denoted by this abstract pathname exists.
     *
     * @returns true if and only if the file or directory denoted by this abstract pathname exists; false otherwise
     */
    public async exists(): Promise<boolean> {
        if (await existsAsync(`${this.#path}`)) {
            return true;
        }

        return false;
    }

    /**
     * @returns the name of the file or directory denoted by this abstract pathname. This is just the last name in the
     * pathname's name sequence.
     */
    public getName(): JavaString {
        return new JavaString(path.basename(`${this.#path}`));
    }

    /**
     * Converts this abstract pathname into a pathname string.
     *
     * @returns The string form of this abstract pathname
     */
    public getPath(): JavaString {
        return new JavaString(this.#path.toString());
    }

    /**
     * Returns the absolute pathname string of this abstract pathname.
     *
     * @returns The absolute pathname string denoting the same file or directory as this abstract pathname
     */
    public getAbsolutePath(): JavaString {
        return new JavaString(this.#path.toAbsolutePath().toString());
    }

    /**
     * @returns The abstract pathname of the parent directory named by this abstract pathname, or null if this
     *          pathname does not name a parent
     */
    public getParentFile(): JavaFile {
        return new JavaFile(new JavaString(`${path.dirname(`${this.#path}`)}`));
    }

    /**
     * Tests whether this abstract pathname is absolute.
     *
     * @returns true if this abstract pathname is absolute, false otherwise
     */
    public isAbsolute(): boolean {
        return this.#isAbsolute;
    }

    /**
     * Tests whether the file denoted by this abstract pathname is a directory.
     *
     * @returns true if and only if the file denoted by this abstract pathname exists and is a directory; false
     *          otherwise.
     */
    public isDirectory(): boolean {
        console.error('File.isDirectory not yet implemented.')
        return false;

        // const stat = statSync(`${this.#path}`);

        // return stat.isDirectory();
    }

    /**
     * Tests whether the file denoted by this abstract pathname is a normal file.
     *
     * @returns true if and only if the file denoted by this abstract pathname exists and is a normal file; false
     *          otherwise.
     */
    public isFile(): boolean {
        console.error('File.isFile not yet implemented.')
        return true;

        // const stat = statSync(`${this.#path}`);

        // return stat.isFile();
    }

    /**
     * Tests whether the file named by this abstract pathname is a hidden file.
     *
     * @returns true if and only if the file denoted by this abstract pathname is hidden according to the conventions
     *          of the underlying platform
     *
     * Note: This method is not supported on Windows platforms.
     */
    public isHidden(): boolean {
        return this.#path.startsWith(new JavaString("."));
    }

    /**
     * @returns an array of strings naming the files and directories in the directory denoted by this abstract pathname.
     */
    public async length(): Promise<bigint> {
        return await (await statAsync(`${this.#path}`, { bigint: true })).size as bigint;
        // console.error('File.statSync not yet implemented.')
        // return 0n;

        // const stat = statSync(`${this.#path}`, { bigint: true });

        // return stat.size;
    }

    /**
     * Creates the directory named by this abstract pathname.
     *
     * @returns true if and only if the directory was created; false otherwise
     */
    public async mkdir(): Promise<boolean> {
        return await mkdirAsync(`${this.#path}`, { recursive: false }) !== undefined;
    }

    /**
     * Creates the directory named by this abstract pathname, including any necessary but nonexistent parent
     * directories.
     *
     * @returns true if and only if the directory was created, along with all necessary parent directories; false
     */
    public async mkdirs(): Promise<boolean> {
        return await mkdirAsync(`${this.#path}`, { recursive: true }) !== undefined;
    }

    public toPath(): Path {
        return this.#path;
    }

    public listFiles(): JavaFile[] {
        console.error('File.listFiles not yet implemented');
        return [];
    }

    public async renameTo(file: JavaFile): Promise<boolean> {
        try {
            await renameAsync('' + this.#path.toString(), '' + file.#path.toString());
            return true;
        } catch (error) {
            return false;
        }
    }

}

// Register a cleanup handler to delete any files that were created and marked with deleteOnExit.
// process.on("beforeExit", () => {
//     try {
//         pendingFiles.forEach((file) => {
//             file.delete();
//         });
//     } catch (e) {
//         // ignore
//     }
// });
