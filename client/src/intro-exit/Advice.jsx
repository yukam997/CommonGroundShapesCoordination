import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button.jsx";
import { ParkingDiagram } from "./Introduction2.jsx";


export function ReceiveAdvice({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inputClassName =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();
  const [showAdvice, setShowAdvice] = useState(false);
  const advice = "pick an orange spot and stick with it"; // Example advice; in practice, this would be assigned from another player's input
  function handleSubmit(event) {
    event.preventDefault();
    // Validate the input
    player.set("advice", {
      advice
    });
    next();
  }
  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="mt-12 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <p className="whitespace-pre-line">
            Before you start, you will be given advice from a player who has played the game before you.{"\n"}
            <b>Note: The advice is assigned randomly, so your partner may have received advice from someone else.</b>
          </p>
          <ParkingDiagram />
          <div>
            <div className="space-y-8 mt-6">
            
              {!showAdvice && (
                <Button type="button" handleClick={() => setShowAdvice(true)}>
                  Show Advice
                </Button>
              )}

              {showAdvice && (
                <div>
                  Your Advice:
                  <blockquote className="italic font-medium mt-2">"{advice}"</blockquote>
                </div>
              )}
              {showAdvice && ( 
                <Button type="submit">Next</Button>
              )}

            </div>
          </div>
        </div>
      </form> 
    </div>
  );
}

