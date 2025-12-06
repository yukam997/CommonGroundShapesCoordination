import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button";
import parkingImg from "../components/payoffs.png";

export function writtenPlan({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inputClassName =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();
  const minCharCount = 10; // Minimum character count for validation
  const [plan, setPlan] = useState("");
  const [error, setError] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    // Validate the input
    if (plan.length < minCharCount) {
      setError(`Please give a more detailed plan!`);
      return; // Stop submission if it's not valid
    }
    setError(''); // Clear any previous error
    player.set("writtenPlan", {
      plan
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
          <h2>What's your game plan? </h2>
                <img
                  src={parkingImg}
                  className="mx-auto my-4 w-full max-w-xl rounded-md shadow-md"
                />
                <ul className="list-disc list-inside">
                  <li>
                    There are 4 spots in the parking lot, 2 orange and 2 purple.
                  </li>
                  <li>
                    The regular and discounted prices for each parking spot are written on the diagram above.
                  </li>
                  <li>
                    If you both select the same spot, you will pay <strong>30 MU</strong>.
                  </li>
                </ul>
          <div>
            <div className="space-y-8 mt-6">
            
               <label className={labelClassName}>
                  Please write your game plan in a few sentences below:
                </label>

                <textarea
                  className={inputClassName}
                  dir="auto"
                  id="plan"
                  name="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mb-12">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form> 
    </div>
  );
}

