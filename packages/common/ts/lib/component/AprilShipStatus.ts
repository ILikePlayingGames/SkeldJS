import { HazelBuffer } from "@skeldjs/util";

import {
    SpawnID,
    SystemType
} from "@skeldjs/constant";

import { ShipStatusData, BaseShipStatus } from "./BaseShipStatus";

import {
    HudOverrideSystem,
    LifeSuppSystem,
    MedScanSystem,
    SecurityCameraSystem,
    AutoDoorsSystem,
    SabotageSystem,
    SwitchSystem,
    ReactorSystem
} from "../system"

import { Room } from "../Room";

export class AprilShipStatus extends BaseShipStatus {
    static type = SpawnID.AprilShipStatus as const;
    type = SpawnID.AprilShipStatus as const;

    static classname = "AprilShipStatus" as const;
    classname = "AprilShipStatus" as const;

    systems: {
        [SystemType.Reactor]: ReactorSystem;
        [SystemType.Electrical]: SwitchSystem;
        [SystemType.O2]: LifeSuppSystem;
        [SystemType.MedBay]: MedScanSystem;
        [SystemType.Security]: SecurityCameraSystem;
        [SystemType.Communications]: HudOverrideSystem;
        [SystemType.Doors]: AutoDoorsSystem;
        [SystemType.Sabotage]: SabotageSystem;
    };

    constructor(room: Room, netid: number, ownerid: number, data?: HazelBuffer|ShipStatusData) {
        super(room, netid, ownerid, data);
    }

    Deserialize(reader: HazelBuffer, spawn: boolean = false) {
        this.systems = {
            [SystemType.Reactor]: new ReactorSystem(this, {
                timer: 10000,
                completed: []
            }),
            [SystemType.Electrical]: new SwitchSystem(this, {
                expected: [false, false, false, false, false],
                actual: [false, false, false, false, false],
                brightness: 100
            }),
            [SystemType.O2]: new LifeSuppSystem(this, {
                timer: 10000,
                completed: []
            }),
            [SystemType.MedBay]: new MedScanSystem(this, {
                queue: []
            }),
            [SystemType.Security]: new SecurityCameraSystem(this, {
                players: new Set
            }),
            [SystemType.Communications]: new HudOverrideSystem(this, {
                sabotaged: false
            }),
            [SystemType.Doors]: new AutoDoorsSystem(this, {
                dirtyBit: 0,
                doors: [ 
                    true, true, true, true, 
                    true, true, true, true, 
                    true, true, true, true,
                    true ]
            }),
            [SystemType.Sabotage]: new SabotageSystem(this, {
                cooldown: 0
            })
        }

        super.Deserialize(reader, spawn);
    }
}