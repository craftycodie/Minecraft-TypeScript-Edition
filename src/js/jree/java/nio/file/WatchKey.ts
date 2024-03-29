/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { IReflection } from "../../lang/Object";
import { List } from "../../util/List";
import { Watchable } from "./Watchable";
import { WatchEvent } from "./WatchEvent";

export interface WatchKey extends IReflection {
    cancel(): boolean;
    isValid(): boolean;
    pollEvents(): List<WatchEvent<unknown>>;
    reset(): boolean;
    watchable(): Watchable;
}
