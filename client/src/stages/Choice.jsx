import React from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { ParkingDiagram } from "../intro-exit/Introduction2.jsx";  
export function Choice() {
  const player = usePlayer();

  function onClick(choice) {
    console.log("Player", player.id, "chose", choice,"and submitted");
    player.round.set("decision", choice);
  }

  return (
    <div>
      <ParkingDiagram />
      <ul className="list-disc list-inside">
        <li>You park in the <strong>same spot</strong> 0 MU (collision).</li>
        <li>You park in <strong>different spots, same color (A+B or C+D)</strong> → 10 MU bonus + regular earnings.</li>
        <li>You park in <strong>different spots, different color</strong> → regular earnings based on spot: A=10, B=10, C=19, D=7.</li>
      </ul>
      <br />
      <p>Where do you want to park?</p>

      <div className="flex justify-center">
        <Button className="m-5" handleClick={() => onClick("A")}>
          A
        </Button>
        <Button className="m-5" handleClick={() => onClick("B")}>
          B
        </Button>
        <Button className="m-5" handleClick={() => onClick("C")}>
          C
        </Button>
        <Button className="m-5" handleClick={() => onClick("D")}>
          D
        </Button>
      </div>
    </div>
  );
}
