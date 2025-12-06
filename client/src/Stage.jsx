import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import {Choice} from "./stages/Choice";
import {Result} from "./stages/Results";
import React from "react";

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();

  if (player.stage.get("submit")) {
    const partner = players.filter((p) => p.id !== player.id)[0];
    if (!partner.stage.get("submit")) {
      console.log("loading bc waiting for other player");
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }
  switch (stage.get("name")){
    case "choice":
      return <Choice  />;
    case "result":
      return <Result  />;
    default:
      return <Loading />;
  }
}
