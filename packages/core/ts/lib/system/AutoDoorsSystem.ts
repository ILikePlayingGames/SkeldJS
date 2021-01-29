import { HazelBuffer } from "@skeldjs/util"

import {
    SystemType,
    MapID
} from "@skeldjs/constant";

import {
    MapDoors
} from "@skeldjs/data";

import { BaseShipStatus } from "../component";
import { SystemStatus } from "./SystemStatus";

export interface AutoDoorsSystemData {
    dirtyBit: number;
    doors: boolean[];
}

export type AutoDoorsSystemEvents = {

}

export class AutoDoorsSystem extends SystemStatus<AutoDoorsSystemEvents> {
    static systemType = SystemType.Doors as const;
    systemType = SystemType.Doors as const;

    dirtyBit: number;
    doors: boolean[];

    constructor(ship: BaseShipStatus, data?: HazelBuffer|AutoDoorsSystemData) {
        super(ship, data);
    }

    Deserialize(reader: HazelBuffer, spawn: boolean) {
        if (spawn) {
            this.doors = [];
            for (let i = 0; i < MapDoors[MapID.TheSkeld]; i++) {
                this.doors.push(reader.bool());
            }
        } else {
            const mask = reader.upacked();

            for (let i = 0; i < MapDoors[MapID.TheSkeld]; i++) {
                if (mask & (1 << i)) {
                    this.doors[i] = reader.bool();
                }
            }
        }
    }

    Serialize(writer: HazelBuffer, spawn: boolean) {
        if (spawn) {
            for (let i = 0; i < MapDoors[MapID.TheSkeld]; i++) {
                writer.bool(this.doors[i]);
            }
        } else {
            writer.upacked(this.dirtyBit);

            for (let i = 0; i < MapDoors[MapID.TheSkeld]; i++) {
                if (this.dirtyBit & (1 << i)) {
                    writer.bool(this.doors[i]);
                }
            }
        }
    }
}
