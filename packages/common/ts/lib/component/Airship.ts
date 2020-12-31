import { HazelBuffer } from "@skeldjs/util";

import { ShipStatusData, BaseShipStatus } from "./BaseShipStatus"

import { DeconSystem } from "../system/DeconSystem";
import { HudOverrideSystem } from "../system/HudOverrideSystem";
import { LifeSuppSystem } from "../system/LifeSuppSystem";
import { MedScanSystem } from "../system/MedScanSystem";
import { ReactorSystem } from "../system/ReactorSystem";
import { SabotageSystem } from "../system/SabotageSystem";
import { SwitchSystem } from "../system/SwitchSystem";

import { Room } from "../Room";
import { SpawnID, SystemType } from "@skeldjs/constant";

export class Airship extends BaseShipStatus {
    static type = SpawnID.Airship as const;
    type = SpawnID.Airship as const;

    constructor(room: Room, netid: number, ownerid: number, data?: HazelBuffer|ShipStatusData) {
        super(room, netid, ownerid, data);
    }

    Deserialize(reader: HazelBuffer, spawn: boolean = false) {
        if (!this.systems) {
            this.systems = {
                [SystemType.Reactor]: new ReactorSystem(this),
                [SystemType.Electrical]: new SwitchSystem(this),
                [SystemType.O2]: new LifeSuppSystem(this),
                [SystemType.MedBay]: new MedScanSystem(this),
                [SystemType.Communications]: new HudOverrideSystem(this),
                [SystemType.Sabotage]: new SabotageSystem(this),
                [SystemType.Decontamination]: new DeconSystem(this)
            }
        }

        super.Deserialize(reader, spawn);
    }
}