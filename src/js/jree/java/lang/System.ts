/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// import * as os from "os";
// import * as path from "path";
// import * as process from "process";

import { SystemOutputStream } from "../io/SystemOutputStream";
import { JavaObject } from "./Object";
import { JavaConsole } from "../io/Console";
import { PrintStream } from "../io/PrintStream";
import { Properties } from "../util/Properties";
import { JavaString } from "./String";

/** User agent client hints are still experimental and hence there's no type definition yet. */

type EntropyHintType = "architecture" | "bitness" | "model" | "platform" | "platformVersion" | "fullVersionList";

interface IStandardHintValues {
    readonly brands: Array<{ brand: string; version: string; }>;
    readonly mobile: boolean;
    readonly platform: string;
}

interface IEntropyHintValues extends IStandardHintValues {
    readonly architecture?: string;
    readonly bitness?: string;
    readonly model?: string;
    readonly platformVersion?: string;
    readonly fullVersionList?: Array<{ brand: string; version: string; }>;
}

interface NavigatorUAData extends IStandardHintValues {
    readonly getHighEntropyValues: (hints: EntropyHintType[]) => Promise<IEntropyHintValues>;
    readonly toJSON: () => string;
}

interface IUANavigator extends Navigator {
    userAgentData?: NavigatorUAData;
}

/** A partial implementation of Java's System type. */
export class System extends JavaObject {
    private static consoleInstance: JavaConsole;
    private static errorStream: PrintStream;
    private static outputStream: PrintStream;

    private static properties: Properties;

    public static arraycopy<T>(src: T[], srcPos: number, dest: T[], destPos: number, count: number): void {
        dest.splice(destPos, count, ...src.slice(srcPos, srcPos + count));
    }

    public static console(): JavaConsole {
        if (!this.consoleInstance) {
            this.consoleInstance = new JavaConsole();
        }

        return this.consoleInstance;
    }

    public static currentTimeMillis(): bigint {
        return BigInt(Date.now());
    }

    public static currentTimeNanos(): bigint {
        return BigInt(performance.now());
    }

    public static get err(): Promise<PrintStream> {
        if (!this.errorStream) {
            return PrintStream.Construct(new SystemOutputStream(true)).then(stream => {
                this.errorStream = stream;
                return stream;
            });
        }

        return new Promise((res) => res(this.errorStream))
    }

    public static get out(): Promise<PrintStream> {
        if (!this.outputStream) {
            return PrintStream.Construct(new SystemOutputStream(false)).then(stream => {
                this.outputStream = stream;
                return stream;
            });
        }

        return new Promise((res) => res(this.outputStream))
    }

    public static lineSeparator(): JavaString {
        return this.getProperty(new JavaString("line.separator"), new JavaString("\n"));
    }

    public static getProperty(key: JavaString): JavaString | null;
    public static getProperty(key: JavaString, def: JavaString): JavaString;
    public static getProperty(key: JavaString, def?: JavaString): JavaString | null {
        if (!this.properties) {
            this.setDefaultProperties();
        }

        if (def) {
            return this.properties.getProperty(key, def);
        }

        return this.properties.getProperty(key);
    }

    public static nanoTime(): number {
        return performance.now();
    }

    /**
     * Fills the system properties table with some defaults.
     */
    private static setDefaultProperties(): void {
        this.properties = new Properties();

        // Depending on the environment different sources are used to fill the standard values.
        // Version numbers are determined by the tool.
        this.properties.setProperty(new JavaString("java.version"), new JavaString("11")); // JRE version
        this.properties.setProperty(new JavaString("java.vendor"), new JavaString("java2ts")); // JRE vendor
        this.properties.setProperty(new JavaString("java.vendor.url"),
            new JavaString("https://github.com/mike-lischke/java2typescript"));
        this.properties.setProperty(new JavaString("java.home"), new JavaString("./")); // Java installation directory
        this.properties.setProperty(new JavaString("java.vm.specification.version"),
            new JavaString("1.0.0")); // JVM specification version
        this.properties.setProperty(new JavaString("java.vm.specification.vendor"),
            new JavaString("Mike Lischke")); // JVM specification vendor
        this.properties.setProperty(new JavaString("java.vm.specification.name"),
            new JavaString("java2tts")); // JVM specification name
        this.properties.setProperty(new JavaString("java.vm.version"),
            new JavaString("1.0.0")); // JVM implementation version
        this.properties.setProperty(new JavaString("java.vm.vendor"),
            new JavaString("Mike Lischke")); // JVM implementation vendor
        this.properties.setProperty(new JavaString("java.vm.name"),
            new JavaString("java2ts")); // JVM implementation name
        this.properties.setProperty(new JavaString("java.specification.version"),
            new JavaString("11")); // JRE specification version
        this.properties.setProperty(new JavaString("java.specification.vendor"),
            new JavaString("Mike Lischke")); // JRE specification vendor
        this.properties.setProperty(new JavaString("java.specification.name"),
            new JavaString("java2ts")); // JRE specification name
        this.properties.setProperty(new JavaString("java.class.version"),
            new JavaString("55")); // Java class format version number
        this.properties.setProperty(new JavaString("java.class.path"), new JavaString("./")); // Java class path
        this.properties.setProperty(new JavaString("java.library.path"),
            new JavaString("./")); // List of paths to search when loading libraries
        this.properties.setProperty(new JavaString("java.compiler"),
            new JavaString("java2ts")); // Name of JIT compiler to use
        this.properties.setProperty(new JavaString("java.ext.dirs"),
            new JavaString("./")); // Path of extension directory or directories

        if (typeof navigator !== "undefined") {
            // Web browser environment.
            this.properties.setProperty(new JavaString("tmpdir"), new JavaString("./")); // Default temp file path

            const userAgentData = (navigator as IUANavigator).userAgentData;
            if (userAgentData) {
                void userAgentData.getHighEntropyValues(["architecture", "platform", "platformVersion"]).then((ua) => {
                    this.properties.setProperty(new JavaString("os.arch"), new JavaString(`${ua.architecture ?? ""}`));
                    this.properties.setProperty(new JavaString("os.version"),
                        new JavaString(`${ua.platformVersion ?? ""}`));
                });
            } else {
                this.properties.setProperty(new JavaString("os.arch"),
                    new JavaString()); // Operating system architecture
                this.properties.setProperty(new JavaString("os.version"),
                    new JavaString()); // Operating system version
            }

            this.properties.setProperty(new JavaString("os.name"),
                new JavaString(`${navigator.platform}`)); // Operating system name
            this.properties.setProperty(new JavaString("line.separator"),
                new JavaString("\n")); // Line separator (new JavaString("\n" on UNIX)
            this.properties.setProperty(new JavaString("file.separator"),
                new JavaString("/")); // File separator (new JavaString("/" on UNIX)
            this.properties.setProperty(new JavaString("path.separator"),
                new JavaString(":")); // Path separator (new JavaString(":" on UNIX)
            this.properties.setProperty(new JavaString("user.name"), new JavaString("")); // User's account name
            this.properties.setProperty(new JavaString("user.home"), new JavaString("")); // User's home directory
            this.properties.setProperty(new JavaString("user.dir"),
                new JavaString("")); // User's current working directory
        } else {
            // Must be Node JS then.
            // But we're not supporting that for now.
            // this.properties.setProperty(new JavaString("tmpdir"), new JavaString(`${os.tmpdir()}`));
            // this.properties.setProperty(new JavaString("os.name"), new JavaString(`${os.type()}`));
            // this.properties.setProperty(new JavaString("os.arch"), new JavaString(`${os.arch()}`));
            // this.properties.setProperty(new JavaString("os.version"), new JavaString(`${os.version()}`));
            // this.properties.setProperty(new JavaString("line.separator"), new JavaString(`${os.EOL}`));

            // this.properties.setProperty(new JavaString("file.separator"), new JavaString(`${path.sep}`));
            // this.properties.setProperty(new JavaString("path.separator"), new JavaString(`${path.delimiter}`));

            // this.properties.setProperty(new JavaString("user.name"), new JavaString(`${process.env.USER ?? ""}`));
            // this.properties.setProperty(new JavaString("user.home"), new JavaString(`${process.env.HOME ?? ""}`));
            // this.properties.setProperty(new JavaString("user.dir"), new JavaString(`${process.cwd()}`));
        }
    }
}
