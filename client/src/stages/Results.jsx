import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { usePlayer, usePlayers , useRound} from "@empirica/core/player/classic/react";
import { ParkingDiagram } from "../intro-exit/Introduction2.jsx";

export function Result() {
  const player = usePlayer();
  const players = usePlayers();
  const partner = players.filter((p) => p.id !== player.id)[0];
  const actualCost = 30 - player.round.get("bonus");
  const myCost = player.stage.get("myCost") || "";
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const round = useRound();
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
    if (myCost === "") {
      setError(`Please write a number!`);
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeRemaining(3);
    player.stage.set("costCorrect", parseInt(myCost) === actualCost);
  }

  function handleNext() {
    player.stage.set("submit", true);
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-center space-y-4">
        <ParkingDiagram />
        <div className="space-y-2">
          <p className="text-lg">You chose: <strong>{player.round.get("decision")}</strong></p>
          <p className="text-lg">Your partner chose: <strong>{partner.round.get("decision")}</strong></p>
        </div>
        {round.get("name") % 4 === 0 ? (
            <div className="mt-4">
            <p className="text-xl mt-4">Your partner's cost is <strong>{30 - partner.round.get("bonus")} MU</strong></p>
            <label className="block text-sm" htmlFor="myCost">
              What was the cost (MU) you paid for this round?
              <input
                id="myCost"
                name="myCost"
                type="number"
                className="ml-2 border rounded px-2 py-1"
                value={myCost}
                onChange={(e) => player.stage.set("myCost", e.target.value)}
                disabled={submitted}
              />
            </label>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

            {submitted && (
              <div className="mt-2 p-3 bg-blue-50 rounded">
                <p className="text-sm">
                  <span className="font-semibold">Your entered cost:</span> {myCost} MU
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Actual cost:</span> {actualCost} MU
                </p>
                {parseInt(myCost) !== actualCost && (
                  <p className="text-red-600 text-sm mt-1">
                    ⚠️ Your answer was incorrect. The actual cost was {actualCost} MU.
                  </p>
                )}
                {parseInt(myCost) === actualCost && (
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
                  <Button handleClick={() => handleSubmit()} disabled={!myCost}>
                    Submit
                  </Button>
                )}
            </div>
          </div>
          ) : (
          <div>
            <p className="text-xl mt-4">Your cost is <strong>{30 - player.round.get("bonus")} MU</strong></p>
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