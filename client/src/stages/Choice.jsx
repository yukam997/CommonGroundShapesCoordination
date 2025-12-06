import React from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import parkingImg from "../components/payoffs.png";
export function Choice() {
  const player = usePlayer();

  function onClick(choice) {
    player.round.set("decision", choice);
    player.stage.set("submit", true);
  }

  return (
    <div>
      <img
        src={parkingImg}
        className="mx-auto my-4 w-full max-w-xl rounded-md shadow-md"
      />
      <ul className="list-disc list-inside">
        <li>You park in the <strong>same spot</strong> → 30 MU penalty.</li>
        <li>You park in <strong>different spots, same color (A+B or C+D)</strong> → 10 MU discount.</li>
        <li>You park in <strong>different spots, different color</strong> → regular price shown on diagram.</li>
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
