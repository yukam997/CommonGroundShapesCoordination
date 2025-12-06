import React from "react";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert.jsx";
import parkingImg from "../components/payoffs.png";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Instructions
      </h3>
      <div className="mt-2 mb-6">
        <p>
          In this experiment, you will play a car parking game with another participant. Your task is to choose where to park your car, but <strong>each parking spot has a different cost, which is quantified in Monetary Units (MU)</strong>. The cost of the parking spot also depends on where your partner parked as well. 
        </p>
        <p>
          Here is the parking lot you'll use in this game. There are 4 spots: A and B are orange spots and C and D are purple spots.
        </p>
        <img
          src={parkingImg}
          className="mx-auto my-4 w-full max-w-xl rounded-md shadow-md"
        />
        <p>Your costs depend on coordination with your partner:</p>
        <ul className="list-disc list-inside ml-4">
          <li>You park in the <strong>same spot</strong> → 30 MU penalty.</li>
          <li>You park in <strong>different spots, same color (A+B or C+D)</strong> → 10 MU discount.</li>
          <li>You park in <strong>different spots, different color</strong> → regular price shown on diagram.</li>
        </ul>
        <br />
        <p>The bonus payment for this experiment depends on your total MU across all rounds in the game. For each round you will earn a bonus of <strong>$0.005</strong> for every MU you save compared to the maximum possible payment (which is 30MU).</p>
        <p>In other words, your goal is to <strong>minimize the total MU</strong> you pay in this parking game.</p>
      </div>
      <Alert title="Important Notice">
        <p>
          If at any point your partner disconnects or the game ends unexpectedly, you will be redirected to a short exit survey and then to the Prolific completion page. You will still receive compensation for your time spent in the experiment.
        </p>
      </Alert>
      <br />
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
