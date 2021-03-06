import { HazelBuffer } from "@skeldjs/util";

import { SystemType } from "@skeldjs/constant";

import { BaseShipStatus } from "../component";
import { SystemStatus } from "./SystemStatus";
import { PlayerData } from "../PlayerData";
import { BaseSystemStatusEvents } from "./events";

export interface SabotageSystemData {
    cooldown: number;
}

export type SabotageSystemEvents = BaseSystemStatusEvents & {};

export class SabotageSystem extends SystemStatus<SabotageSystemData, SabotageSystemEvents> {
    static systemType = SystemType.Sabotage as const;
    systemType = SystemType.Sabotage as const;

    cooldown: number;

    constructor(ship: BaseShipStatus, data?: HazelBuffer | SabotageSystemData) {
        super(ship, data);
    }

    get anySabotaged() {
        return Object.values(this.ship.systems).some(
            (system) => system.sabotaged
        );
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    Deserialize(reader: HazelBuffer, spawn: boolean) {
        this.cooldown = reader.float();
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    Serialize(writer: HazelBuffer, spawn: boolean) {
        writer.float(this.cooldown);
    }

    HandleRepair(player: PlayerData, amount: number) {
        const system = this.ship.systems[amount] as SystemStatus;

        if (system) {
            system.sabotage(player);

            this.cooldown = 30;
            this.dirty = true;
        }
    }

    Detoriorate(delta: number) {
        if (this.cooldown > 0 && !this.anySabotaged) {
            this.cooldown -= delta;
            if (this.cooldown <= 0) {
                this.dirty = true;
            }
        }
    }
}
