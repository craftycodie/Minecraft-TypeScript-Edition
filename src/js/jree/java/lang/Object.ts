/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* eslint-disable max-classes-per-file */

import { int } from "../../types";

/** Helper interface to add the implicit reflection stuff to each translated interface. */
export interface IReflection {
    getClass<T extends JavaObject>(): Class<T>;
}

// JavaObject and Class depend directly on each other, so we need to define them in the same file.

/** Implements the Java Object semantics. */
export class JavaObject implements IReflection {
    static #nextId = 0;

    // Represents the default hash code of a Java object. Using a running number here.
    readonly #id;

    public constructor() {
        this.#id = JavaObject.#nextId++;
    }

    public static get class(): Class<JavaObject> {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return Class.fromConstructor(this.constructor as typeof JavaObject);
    }

    /**
     * Indicates whether some other object is "equal to" this one.
     *
     * @param obj The object to compare this instance to.
     *
     * @returns True if the given object is the same as this object.
     */
    public equals(obj: unknown): boolean {
        return obj === this; // Identity or reference equality, by default.
    }

    /** @returns the runtime class of this JavaObject. */
    public getClass<T extends JavaObject>(): Class<T> {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return Class.fromConstructor(this.constructor as typeof JavaObject);
    }

    /** @returns a hash code value for the object. */
    public hashCode(): int {
        return this.#id;
    }

    /** Wakes up a single thread that is waiting on this object's monitor. */
    public notify(): void {
        // No implementation needed.
    }

    /** Wakes up all threads that are waiting on this object's monitor. */
    public notifyAll(): void {
        // No implementation needed.
    }

    /**
     * Causes the current thread to wait until either another thread invokes the notify() method or the notifyAll()
     * method for this object, or a specified amount of time has elapsed.
     *
     * @param timeout tbd
     * @param nanos tbd
     */
    public wait(timeout?: number, nanos?: number): void {
        // No implementation needed.
    }

    /** Creates and returns a copy of this object. */
    protected clone(): JavaObject {
        throw new Error("Not implemented");
    }

    protected [Symbol.toPrimitive](_hint: string): bigint | number | boolean | string | null {
        return `${this.constructor.name}@${this.#id.toString(16)}`;
    }
}

/** A partial implementation of Java's Class type. */
export class Class<T> extends JavaObject {

    private static classes = new Map<unknown, Class<unknown>>();

    private constructor(private c: typeof JavaObject) {
        super();
    }

    public static fromConstructor<T extends JavaObject>(c: typeof JavaObject): Class<T> {
        let clazz = Class.classes.get(c);
        if (!clazz) {
            clazz = new Class(c);
            Class.classes.set(c, clazz);
        }

        return clazz as Class<T>;
    }

    public getName(): string {
        return this.c.name;
    }

    public getSimpleName(): string {
        return this.c.name;
    }

    public isInstance(o: unknown): boolean {
        return o instanceof this.c;
    }

    public cast(o: unknown): T {
        return o as T;
    }

    public newInstance(): T {
        return new this.c() as T;
    }
}
