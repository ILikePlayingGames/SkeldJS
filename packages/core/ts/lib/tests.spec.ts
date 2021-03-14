import { Networkable } from "./Networkable";

export const alphabet = "abcdefghijklmnopqrstuvwxyz";

export interface TestEvents {
    "test.event": {
        alphabet: string;
    };
}

export class TestComponent extends Networkable<{ dataParam: number }, TestEvents> {
    static classname = "TestComponent" as const;
    classname = "TestComponent" as const;

    dataParam: number;
}
