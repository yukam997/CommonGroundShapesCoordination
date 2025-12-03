import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { ReturnToProlific } from "./intro-exit/ExitSlide";
import { Introduction } from "./intro-exit/Introduction";
import { MyConsent } from "./intro-exit/Consent";
import { usePlayer } from "@empirica/core/player/classic/react";
export default function App() {
  const { protocol, host } = window.location;
  const urlParams = new URLSearchParams(window.location.search);
  const player = usePlayer();
  const url = `${protocol}//${host}/query`;
  const prolificPID = urlParams.get('PROLIFIC_PID');
  const playerKey = prolificPID
  console.log("Prolific PID:", prolificPID);
  function introSteps({ game, player }) {
    return [Introduction];
  }
  function exitSteps({ game, player }) {
    return [ExitSurvey,ReturnToProlific];
  }
  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <div className="h-full overflow-auto">
          <EmpiricaContext consent={MyConsent} introSteps={introSteps} exitSteps={exitSteps}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
