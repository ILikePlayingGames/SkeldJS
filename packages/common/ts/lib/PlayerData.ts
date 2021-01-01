import { MessageTag, Opcode, PayloadTag } from "@skeldjs/constant";

import {
    CustomNetworkTransform,
    PlayerControl,
    PlayerPhysics
} from "./component";

import { Heritable } from "./Heritable";
import { Room } from "./Room"

export interface PlayerData {}

export class PlayerData extends Heritable {
    isReady: boolean;
    inScene: boolean;

    left: boolean;

    constructor(room: Room, clientid: number) {
        super(room, clientid);
    }

    get control() {
        return this.getComponent(PlayerControl);
    }

    get physics() {
        return this.getComponent(PlayerPhysics);
    }

    get transform() {
        return this.getComponent(CustomNetworkTransform);
    }

    get data() {
        return this.room.gamedata?.players?.get(this.playerId);
    }

    get playerId() {
        return this.control?.playerId;
    }

    get spawned() {
        return this.control && this.physics && this.transform;
    }

    get ishost() {
        return this.room.host === this;
    }

    get isme() {
        return this.id === this.room.client.clientid;
    }

    async ready() {
        this.emit("ready");
        
        this.isReady = true;

        if (this.isme) {
            await this.room.client.send({
                op: Opcode.Reliable,
                payloads: [
                    {
                        tag: PayloadTag.GameData,
                        code: this.room.code,
                        messages: [
                            {
                                tag: MessageTag.Ready,
                                clientid: this.id
                            }
                        ]
                    }
                ]
            });
        }
    }
}