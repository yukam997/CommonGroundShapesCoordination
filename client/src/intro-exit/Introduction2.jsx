import React from "react";
import { Button } from "../components/Button.jsx";
import { Alert } from "../components/Alert.jsx";
import parkingImg from "../components/payoffs.png";

export function Introduction2({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Example Payoffs
      </h3>
      <div className="mt-2 mb-6">
        <img
          src={parkingImg}
          className="mx-auto my-4 w-full max-w-xl rounded-md shadow-md"
        />
        <p>Here are some example payoffs:</p>
        <ul className="list-disc list-inside ml-4">
          <li>You pick A, your partner picks A → you get a clashing-spot penalty, so you and your partner both pay 30 MU → you don't earn a bonus</li>
          <li>You pick A, your partner picks B → you get a same-color discount, so you and your partner both pay 10 MU → you earn a bonus of 20 × $0.005 = $0.1</li>
          <li>You pick C, your partner picks D → you get a same-color discount, so you pay 8 MU and your partner pays 1 MU → you earn a bonus of 22 × $0.005 = $0.11</li>
          <li>You pick B, your partner picks C → you pay the regular cost, so you pay 20 MU and your partner pays 18 MU → you earn a bonus of 10 × $0.005 = $0.05</li>
        </ul>
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
