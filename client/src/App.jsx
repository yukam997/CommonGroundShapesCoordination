import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React, { useEffect } from "react";
import { Game } from "./Game";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { ReturnToProlific } from "./intro-exit/ExitSlide";
import { Introduction } from "./intro-exit/Introduction";
import { MyConsent } from "./intro-exit/Consent";
import { MyPlayerForm } from "./intro-exit/PlayerCreate.jsx";
import { NoGameSurvey } from "./intro-exit/NoGameExitSurvey.jsx";
import { usePlayer } from "@empirica/core/player/classic/react";
import { writtenPlan } from "./intro-exit/WritePlan.jsx"; 
export default function App() {
  const { protocol, host } = window.location;
  const urlParams = new URLSearchParams(window.location.search);
  const url = `${protocol}//${host}/query`;
  const playerKey = urlParams.get('PROLIFIC_PID');
  const player = usePlayer();
  function introSteps({ game, player }) {
    return [Introduction,writtenPlan];
  }
  function exitSteps({ game, player }) {
    console.log("Player ended status:", player.get("exitStatus"));
    // show different exit for timeout
    if (player.get('ended') === "game ended"){
      return [ExitSurvey,ReturnToProlific];
    }
    else {
      return [NoGameSurvey];
    }
  }
  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext playerCreate={MyPlayerForm} consent={MyConsent} introSteps={introSteps} exitSteps={exitSteps}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
