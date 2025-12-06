import { useStageTimer,useStage } from "@empirica/core/player/classic/react";
import React from "react";

export function Timer() {
  const timer = useStageTimer();
  const stage = useStage();
  const game = stage.currentGame

  let remaining;
  if (timer?.remaining ) {
    remaining = Math.round(timer?.remaining / 1000);
  } else {
    // console.log("Time is up, ending the game");
    // game.end("ended", "time out");
    remaining = 0;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="tabular-nums text-3xl text-gray-500 font-semibold">
        {humanTimer(remaining)}
      </h1>
    </div>
  );
}

function humanTimer(seconds) {
  if (seconds === null || seconds === undefined) {
    return "--:--";
  }

  let out = "";
  const s = seconds % 60;
  out += s < 10 ? "0" + s : s;

  const min = (seconds - s) / 60;
  if (min === 0) {
    return `00:${out}`;
  }

  const m = min % 60;
  out = `${m < 10 ? "0" + m : m}:${out}`;

  const h = (min - m) / 60;
  if (h === 0) {
    return out;
  }

  return `${h}:${out}`;
}
