/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { java, MurmurHash, NotImplementedError } from "../..";
import { S } from "../../templates";
import { JavaObject } from "../lang/Object";

/** Represents a Uniform Resource Identifier (URI) reference. */
export class URI extends JavaObject implements java.io.Serializable, java.lang.Comparable<URI> {
    // eslint-disable-next-line max-len
    private static ipv6Pattern = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
    #uri: globalThis.URL;

    #scheme: java.lang.String | null = null;
    #schemeSpecificPart: java.lang.String | null = null;
    #authority: java.lang.String | null = null;
    #userInfo: java.lang.String | null = null;
    #host: java.lang.String | null = null;
    #port = -1;
    #path: java.lang.String | null = null;
    #query: java.lang.String | null = null;
    #fragment: java.lang.String | null = null;

    public constructor(uri: java.lang.String);
    public constructor(scheme: java.lang.String | null, ssp: java.lang.String | null,
        fragment: java.lang.String | null);
    public constructor(scheme: java.lang.String, userInfo: java.lang.String | null, host: java.lang.String,
        port: number, path: java.lang.String, query: java.lang.String | null, fragment: java.lang.String);
    public constructor(scheme: java.lang.String, host: java.lang.String, path: java.lang.String,
        fragment: java.lang.String);
    public constructor(scheme: java.lang.String, authority: java.lang.String, path: java.lang.String,
        query: java.lang.String, fragment: java.lang.String);
    public constructor(...args: unknown[]) {
        super();

        let uri = "";
        switch (args.length) {
            case 1: {
                uri = `${args[0] as java.lang.String}`;

                break;
            }

            case 3: {
                if (args[0] !== null) {
                    uri += `${args[0]}:`;
                }

                if (args[1] !== null) {
                    uri += encodeURIComponent(`${args[1]}`);
                }

                if (args[2] !== null) {
                    uri += encodeURIComponent(`#${args[1]}`);
                }

                break;
            }

            case 4:
            case 7: {

                if (args.length === 4) {
                    [this.#scheme, this.#host, this.#path, this.#fragment] =
                        args as [java.lang.String, java.lang.String, java.lang.String, java.lang.String];
                } else {
                    [this.#scheme, this.#userInfo, this.#host, this.#port, this.#path, this.#query, this.#fragment] =
                        args as [java.lang.String, java.lang.String, java.lang.String, number, java.lang.String,
                            java.lang.String, java.lang.String];
                }

                if (this.#scheme !== null) {
                    uri += `${this.#scheme}:`;
                }

                if (this.#userInfo !== null || this.#host !== null || this.#port !== -1) {
                    uri += "//";
                }

                if (this.#userInfo !== null) {
                    uri += encodeURIComponent(`${this.#userInfo}`) + "@";
                }

                if (this.#host !== null) {
                    if (URI.ipv6Pattern.test(this.#host.valueOf())) {
                        uri += `[${this.#host}]`;
                    } else {
                        uri += encodeURIComponent(`$this.#{host}`);
                    }
                }

                if (this.#port !== -1) {
                    uri += `:${this.#port}`;
                }

                if (this.#path !== null) {
                    uri += encodeURIComponent(`${this.#path}`);
                }

                if (this.#query !== null) {
                    uri += "?" + encodeURIComponent(`${this.#query}`);
                }

                if (this.#fragment !== null) {
                    uri += "#" + encodeURIComponent(`${this.#fragment}`);
                }

                break;
            }

            case 5: {
                [this.#scheme, this.#authority, this.#path, this.#query, this.#fragment] =
                    args as [java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String];

                if (this.#scheme !== null) {
                    uri += `${this.#scheme}:`;
                }

                if (this.#authority !== null) {
                    uri += "//" + encodeURIComponent(`${this.#authority}`);
                }

                if (this.#path !== null) {
                    uri += encodeURIComponent(`${this.#path}`);
                }

                if (this.#query !== null) {
                    uri += "?" + encodeURIComponent(`${this.#query}`);
                }

                if (this.#fragment !== null) {
                    uri += "#" + encodeURIComponent(`${this.#fragment}`);
                }

                break;
            }
            default: {
                throw new java.lang.IllegalArgumentException(S`Invalid number of arguments`);
            }
        }

        try {
            this.#uri = new global.URL(uri);
        } catch (e) {
            let message;
            if (e instanceof TypeError) {
                message = S`${e.message}`;
            } else {
                message = S`${e}`;
            }
            throw new java.net.URISyntaxException(args[0] as java.lang.String, message);
        }
    }

    /**
     * Creates a URI by parsing the given string.
     *
     * @param uri The string to be parsed into a URI
     *
     * @returns The new URI
     */
    public static create(uri: java.lang.String): URI {
        return new URI(uri);
    }

    /**
     * Compares this URI to another object, which must also be a URI.
     *
     * @param o the object to which this URI is to be compared
     *
     * @returns A negative integer, zero, or a positive integer as this URI is less than, equal to, or greater than
     *          the given URI.
     */
    public compareTo(o: URI): number {
        let result = this.compareValues(this.#scheme, o.#scheme);
        if (result !== 0) {
            return result;
        }

        result = this.compareValues(this.#schemeSpecificPart, o.#schemeSpecificPart);
        if (result !== 0) {
            return result;
        }

        result = this.compareValues(this.#authority, o.#authority);
        if (result !== 0) {
            return result;
        }

        result = this.compareValues(this.#userInfo, o.#userInfo);
        if (result !== 0) {
            return result;
        }

        result = this.compareValues(this.#host, o.#host);
        if (result !== 0) {
            return result;
        }

        result = this.#port - o.#port;
        if (result !== 0) {
            return result;
        }

        result = this.compareValues(this.#path, o.#path);
        if (result !== 0) {
            return result;
        }

        result = this.compareValues(this.#query, o.#query);
        if (result !== 0) {
            return result;
        }

        return this.compareValues(this.#fragment, o.#fragment);
    }

    /**
     * Tests this URI for equality with another object.
     *
     * @param obj The object to which this URI is to be compared
     *
     * @returns true if, and only if, the given object is a URI that is identical to this URI
     */
    public override equals(obj: unknown): boolean {
        if (obj === null) {
            return false;
        }

        if (obj === this) {
            return true;
        }

        if (!(obj instanceof URI)) {
            return false;
        }

        return this.#uri.toString() === obj.#uri.toString();
    }

    /**
     * Returns the decoded authority component of this URI.
     *
     * @returns The decoded authority component of this URI, or null if the authority is undefined
     */
    public getAuthority(): java.lang.String | null {
        return this.#authority;
    }

    /**
     * Returns the decoded fragment component of this URI.
     *
     * @returns The decoded fragment component of this URI, or null if the fragment is undefined
     */
    public getFragment(): java.lang.String | null {
        if (this.#fragment === null) {
            return null;
        }

        return S`${this.#uri.searchParams.toString()}`;
    }

    /** @returns The host component of this URI, or null if the host is undefined */
    public getHost(): java.lang.String {
        return S`${this.#uri.host}`;
    }

    /** @returns The decoded path component of this URI, or null if the path is undefined */
    public getPath(): java.lang.String {
        return S`${this.#uri.pathname}`;
    }

    /** @returns The port number of this URI, or -1 if the port is undefined */
    public getPort(): number {
        return this.#port;
    }

    /** @returns The decoded query component of this URI, or null if the query is undefined */
    public getQuery(): java.lang.String {
        return S`${this.#uri.search}`;
    }

    /** @returns The raw authority of this URI, or null if the scheme is undefined */
    public getRawAuthority(): java.lang.String | null {
        return this.#authority;
    }

    /** @returns The raw fragment component of this URI, or null if the fragment is undefined */
    public getRawFragment(): java.lang.String | null {
        return this.#fragment;
    }

    /** @returns The raw path component of this URI, or null if the path is undefined */
    public getRawPath(): java.lang.String | null {
        return this.#path;
    }

    /** @returns The raw query component of this URI, or null if the query is undefined */
    public getRawQuery(): java.lang.String | null {
        return this.#query;
    }

    /** @returns The raw scheme-specific part of this URI, or null if the scheme-specific part is undefined */
    public getRawSchemeSpecificPart(): java.lang.String | null {
        return this.#schemeSpecificPart;
    }

    /** @returns The raw user-information component of this URI, or null if the user information is undefined */
    public getRawUserInfo(): java.lang.String | null {
        return this.#userInfo;
    }

    /** @returns The scheme component of this URI, or null if the scheme is undefined */
    public getScheme(): java.lang.String | null {
        return this.#scheme;
    }

    /** @returns The scheme-specific part of this URI, or null if the scheme-specific part is undefined */
    public getSchemeSpecificPart(): java.lang.String | null {
        return this.#schemeSpecificPart;
    }

    /** @returns The decoded user-information component of this URI, or null if the user information is undefined */
    public getUserInfo(): java.lang.String | null {
        return this.#userInfo;
    }

    /** @returns The hash code of this URI */
    public override hashCode(): number {
        let hash = MurmurHash.initialize(13);
        hash = MurmurHash.update(hash, this.#scheme);
        hash = MurmurHash.update(hash, this.#schemeSpecificPart);
        hash = MurmurHash.update(hash, this.#authority);
        hash = MurmurHash.update(hash, this.#userInfo);
        hash = MurmurHash.update(hash, this.#host);
        hash = MurmurHash.update(hash, this.#port);
        hash = MurmurHash.update(hash, this.#path);
        hash = MurmurHash.update(hash, this.#query);
        hash = MurmurHash.update(hash, this.#fragment);

        return MurmurHash.finish(hash, 9);
    }

    /** @returns true if, and only if, this URI is absolute */
    public isAbsolute(): boolean {
        return this.#scheme !== null;
    }

    /** @returns true if, and only if, this URI is opaque */
    public isOpaque(): boolean {
        return this.#scheme !== null && this.#schemeSpecificPart !== null
            && this.#schemeSpecificPart.charAt(0) !== 0x2F; // '/'
    }

    /**
     * Normalizes this URI's path
     *
     * @returns A normalized URI
     */
    public normalize(): URI {
        return new URI(S`${this.#uri}`);
    }

    /**
     * Parses the authority component of this URI.
     */
    public parseServerAuthority(): URI {
        throw new NotImplementedError();
    }

    public relativize(uri: URI): URI {
        throw new NotImplementedError();
    }

    public resolve(uri: URI): URI {
        return this;
    }

    public toASCIIString(): java.lang.String {
        return S`${this.#uri}`;
    }

    public override toString(): string {
        return `${this.#uri}`;
    }

    // public toURL(): java.net.URL { return new URL(S`${this.#uri}`); }

    /**
     * Compares two strings, which can be null.
     *
     * @param value1 the first string
     * @param value2 the second string
     *
     * @returns 0 if both strings are null, -1 if the first string is null, 1 if the second string is null, or the
     *            result of {@link String#compareTo(String)} if both strings are not null
     */
    private compareValues(value1: java.lang.String | null, value2: java.lang.String | null): number {
        if (value1 !== null) {
            if (value2 !== null) {
                return value1.compareTo(value2);
            }

            return 1;
        }

        if (value2 !== null) {
            return -1;
        }

        return 0;
    }
}
