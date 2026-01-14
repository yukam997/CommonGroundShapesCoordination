import React from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Alert } from "../components/Alert.jsx";
import { Button } from "../components/Button.jsx";

export function NoGameSurvey({ next }) {

  const player = usePlayer();
  function handleSubmit(event) {
    event.preventDefault();
    player.set("exitSurvey", {
      "gamefailed": "nogame"
    })
    player.set("endReason","no game available");
    const completionCode = "CIE2WZHO"; // Your code from Prolific
    window.location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`;
    next();
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Alert title="No Game Available">
        <p>
          Unfortunately, we were unable to match you with other participants for a game or experienced an error. You will still be compensated for your time spent in the waiting lobby.
        </p>
      </Alert>
      <Alert title="Payment">
        <p className="pt-1">
          Thank you for your time and willingness to participate in our study.
        </p>
      </Alert>

      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}