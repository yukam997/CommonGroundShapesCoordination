import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Alert } from "../components/Alert.jsx";
import { Button } from "../components/Button.jsx";

export function PartnerFeedback({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inputClassName =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();

  const [strength, setStrength] = useState("");
  const [fair, setFair] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    player.set("exitSurvey", {
      strength,
      fair,
      feedback,
    });
    next();
  }
  const formContent = (
  <form
        className="mt-12 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Exit Survey
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Thank you for your participation! We would appreciate any feedback, including comments on how we could improve our study design!
              </p>
            </div>

            <div className="space-y-8 mt-6">
            
              <div className="grid grid-cols-3 gap-x-6 gap-y-3">

                <label className={labelClassName}>
                  What kind of advice do you think your partner received?
                </label>

                <textarea
                  className={inputClassName}
                  dir="auto"
                  id="strength"
                  name="strength"
                  rows={4}
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                />

                <textarea
                  className={inputClassName}
                  dir="auto"
                  id="fair"
                  name="fair"
                  rows={4}
                  value={fair}
                  onChange={(e) => setFair(e.target.value)}
                />

                <textarea
                  className={inputClassName}
                  dir="auto"
                  id="feedback"
                  name="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <div className="mb-12">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form>)
  const endReason = player.get("endReason");
  console.log("ExitSurvey - endReason:", endReason);
  if (endReason === "timeout") {
    return (
      <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Alert title="Timed Out">
          <p>
            The game has timed out because you or your partner have exceeded the timelimit to respond. Thanks for playing!
          </p>
        </Alert>
        {formContent}
      </div>
      );
  }
  if (endReason === "disconnected") {
    return (
      <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Alert title="Game Ended Early">
          <p>
            Unfortunately, your partner disconnected or did not respond in time, so the game ended early.
          </p>
          <p className="mt-2">
            <strong>You will still receive compensation</strong> for your time. Please complete the short survey below to finish.
          </p>
        </Alert>
        {formContent}
      </div>
      );
  }
  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Alert title="Bonus">
        <p>
          You should receive your payment including the bonus payment within the next 24 hours.
        </p>
        <p className="pt-1">
          Your final <strong>bonus</strong> is in addition of the{" "}
          <strong>$2.0 </strong> for completing the survey.
        </p>
      </Alert>
      {formContent}  
    </div>
  );
}

export function Radio({ selected, name, value, label, onChange }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      <input
        className="mr-2 shadow-sm sm:text-sm"
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
