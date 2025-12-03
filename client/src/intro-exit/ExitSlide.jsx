import { Button } from "../components/Button";
// ExitSurvey.jsx or final exit step
export function ReturnToProlific({ player }) {
  function handleComplete() {
    const completionCode = "C1BDE6K4"; // Your code from Prolific
    window.location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`;
  }

  return (
    <div>
      <h2>Thank you for participating!</h2>
      <p>Click the button below to return to Prolific and receive payment.</p>
      <Button handleClick={handleComplete}>
        Return to Prolific
      </Button>
    </div>
  );
}