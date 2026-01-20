import React from "react";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert.jsx";
import { ParkingDiagram } from "./Introduction2.jsx";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Instructions
      </h3>
      <div className="mt-2 mb-6">
        <p>
          In this experiment, you will play a car parking game with another participant to gain points, quantified in Monetary Units (MU). You gain points by parking your car in a parking spot, but <strong>the amount you earn depends on the spot you parked, and also on where your partner parked.</strong>
        </p>
        <br />
        <p>
          Here is the parking lot you'll use in this game. There are 4 spots: A and B are orange spots and C and D are purple spots.
        </p>
        <ParkingDiagram />
        <p>Your earnings are determined by how you and your partner coordinate:</p>
        <ul className="list-disc list-inside ml-4">
          <li>You park in the <strong>same spot</strong> 0 MU (collision).</li>
          <li>You park in <strong>different spots, same color (A+B or C+D)</strong> → 10 MU bonus + regular earnings.</li>
          <li>You park in <strong>different spots, different color</strong> → regular earnings based on spot: A=10, B=10, C=19, D=7.</li>
        </ul>
        <br />
        <p>The bonus payment for this experiment depends on your total MU at the end of the game. You will be paid a bonus <strong>$0.005</strong> for each MU you earn.</p>
        <p>In other words, your goal is to <strong>maximize the total MU</strong> you earn in this parking game.</p>
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
