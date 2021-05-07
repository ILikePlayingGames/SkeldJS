import assert from "assert";

import { GameOptions } from "./GameOptions";


describe("GameOptions", () => {
    describe("GameOptions#isValid", () => {
        const isValid = GameOptions.isValid(
            new GameOptions({
                version: 2,
                maxPlayers: 10,
                keywords: 256,
                map: 0,
                playerSpeed: 1,
                crewmateVision: 1,
                impostorVision: 1.5,
                killCooldown: 45,
                commonTasks: 1,
                longTasks: 1,
                shortTasks: 2,
                numEmergencies: 1,
                numImpostors: 2,
                killDistance: 1,
                discussionTime: 15,
                votingTime: 120,
                isDefaults: false,
                emergencyCooldown: 15,
                confirmEjects: true,
                visualTasks: true,
                anonymousVotes: false,
                taskbarUpdates: 0
            })
        );

        assert.ok(isValid);
    });
});
