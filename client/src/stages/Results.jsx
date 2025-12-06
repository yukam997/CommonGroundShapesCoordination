import React from "react";
import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
export function Result() {
  const player = usePlayer();
  const players = usePlayers();
  const partner = players.filter((p) => p.id !== player.id)[0];
  let myCost = player.stage.get("myCost") || "";
  return (
    <div>
      <p>You chose: {player.round.get("decision")}</p>
      <p>Your partner chose: {partner.round.get("decision")}</p>
      <br />
      <p>Your partner's cost was {30-partner.round.get("bonus") || "TBD"}. </p>
      <form>
        <label>
          What was the cost you paid for this round?
          <input 
            id="myCost"
            name="myCost"
            type="number" 
            value={myCost} 
            onChange={(e) => player.stage.set("myCost", e.target.value)} 
            required 
          />
        </label>
      </form>
      

      <Button handleClick={() => player.stage.set("submit", true)}>
        Continue
      </Button>
    </div>
  );
}
