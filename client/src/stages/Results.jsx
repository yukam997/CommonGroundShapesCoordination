import React from "react";
import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";

export function Result() {
  const player = usePlayer();
  const players = usePlayers();
  const partner = players.filter((p) => p.id !== player.id)[0];
  const cost = 30 - player.round.get("bonus");

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <p className="text-lg">You chose: <strong>{player.round.get("decision")}</strong></p>
          <p className="text-lg">Your partner chose: <strong>{partner.round.get("decision")}</strong></p>
        </div>
        <p className="text-xl mt-4">Your cost is <strong>{cost} MU</strong></p>
        <p className="text-sm text-gray-500 mt-6">Next round starting shortly...</p>
      </div>
    </div>
  );
}
