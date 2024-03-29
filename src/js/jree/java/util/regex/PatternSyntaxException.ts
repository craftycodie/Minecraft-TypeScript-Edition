/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { java } from "../../..";
import { S } from "../../../templates";
import { IllegalArgumentException } from "../../lang/IllegalArgumentException";

export class PatternSyntaxException extends IllegalArgumentException {
    public constructor(private desc: java.lang.String, private regex: java.lang.String, private index: number) {
        let message;
        if (index < 0) {
            message = S`${desc}: ${regex}`;
        } else {
            message = S`${desc} near index ${index}:\n${regex}\n${" ".repeat(index)}^`;
        }

        super(message);
    }

    /**
     * @returns The description of the error
     */
    public getDescription(): java.lang.String {
        return this.desc;
    }

    /** @returns The index of the error, or -1 if the index is not known */
    public getIndex(): number {
        return this.index;
    }

    /**
     * @returns The erroneous regular-expression pattern
     */
    public getPattern(): java.lang.String {
        return this.regex;
    }
}
