import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
  useStageTimer,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import {Choice} from "./stages/Choice";
import {Result} from "./stages/Results";
import React from "react";

function formatTime(seconds) {
  if (seconds === null || seconds === undefined || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" + s : s}`;
}

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();
  const timer = useStageTimer();

  // Custom waiting screen only for the choice stage
  if (stage.get("name") === "choice" && player.stage.get("submit")) {
    const partner = players.filter((p) => p.id !== player.id)[0];
    const playerChoice = player.round.get("decision");

    if (!partner.stage.get("submit")) {
      const remaining = timer?.remaining ? Math.round(timer.remaining / 1000) : 0;
      const isLowTime = remaining <= 30;

      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-lg font-medium">
                You chose parking spot {playerChoice}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600 mb-4">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg">Waiting for your partner to respond...</span>
            </div>
            <div className={`text-2xl font-mono font-bold mb-4 ${isLowTime ? "text-red-600" : "text-gray-500"}`}>
              {formatTime(remaining)}
            </div>
            {isLowTime && (
              <p className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                If your partner doesn't respond in time, the game will end and you'll proceed to the exit survey.
              </p>
            )}
          </div>
        </div>
      );
    }
  }
  if (stage.get("name") === "result" && player.stage.get("submit")) {
    const partner = players.filter((p) => p.id !== player.id)[0];

    if (!partner.stage.get("submit")) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-md">
            <span className="text-lg">Waiting for your partner to respond...</span>
          </div>
        </div>
      );
    }
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
