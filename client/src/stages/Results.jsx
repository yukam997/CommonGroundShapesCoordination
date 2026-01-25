import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { usePlayer, usePlayers , useRound} from "@empirica/core/player/classic/react";
import { ParkingDiagram } from "../intro-exit/Introduction2.jsx";

export function Result() {
  const player = usePlayer();
  const players = usePlayers();
  const partner = players.filter((p) => p.id !== player.id)[0];
  const myGain = player.stage.get("myGain") || "";
  const playerBonus = player.round.get("bonus");
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const round = useRound();
  const playerDecision = player.round.get("decision");
  const partnerDecision = partner.round.get("decision");
  const partnerBonus = partner.round.get("bonus");
  useEffect(() => {
  if (submitted) {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          player.stage.set("submit", true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }
}, [submitted]);

  function handleSubmit() {
    // Validate the input
    if (myGain === "") {
      setError(`Please write a number!`);
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeRemaining(3);
    player.stage.set("costCorrect", parseInt(myGain) === playerBonus);
  }

  function handleNext() {
    player.stage.set("submit", true);
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-center space-y-4">
        <ParkingDiagram />
        <div className="space-y-2">
          <p className="text-lg">You chose: <strong>{playerDecision}</strong></p>
          <p className="text-lg">Your partner chose: <strong>{partnerDecision}</strong></p>
        </div>
        {round.get("name") % 4 === 0 ? (
            <div className="mt-4">
            <p className="text-xl mt-4">Your partner's earnings is <strong>{partnerBonus} MU</strong></p>
            <label className="block text-sm" htmlFor="myGain">
              How many (MU) did you receive on this round?
              <input
                id="myGain"
                name="myGain"
                type="number"
                className="ml-2 border rounded px-2 py-1"
                value={myGain}
                onChange={(e) => player.stage.set("myGain", e.target.value)}
                disabled={submitted}
              />
            </label>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

            {submitted && (
              <div className="mt-2 p-3 bg-blue-50 rounded">
                <p className="text-sm">
                  <span className="font-semibold">Your entered:</span> {myGain} MU
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Actual earnings:</span> {playerBonus} MU
                </p>
                {parseInt(myGain) !== playerBonus && (
                  <p className="text-red-600 text-sm mt-1">
                    ⚠️ Your answer was incorrect. The actual earnings was {playerBonus} MU.
                  </p>
                )}
                {parseInt(myGain) === playerBonus && (
                  <p className="text-green-600 text-sm mt-1">
                    ✓ Correct!
                  </p>
                )}
              </div>
            )}
            <div className="mb-12">
              {submitted ? (
                  <p className="text-gray-600 font-medium">Please wait {timeRemaining}s...</p>
                ) : (
                  <Button handleClick={() => handleSubmit()} disabled={!myGain}>
                    Submit
                  </Button>
                )}
            </div>
          </div>
          ) : (
          <div>
            <p className="text-xl mt-4">Your earned <strong>{playerBonus} MU</strong></p>
            <Button handleClick={() => handleNext()}>
              Next
            </Button>
          </div>
        )
        }
      </div>
    </div>
  );
}