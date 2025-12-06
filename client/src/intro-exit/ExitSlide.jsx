import { Button } from "../components/Button";
// ExitSurvey.jsx or final exit step
export function ReturnToProlific({ player }) {
  function handleComplete() {
    const completionCode = "CIE2WZHO"; // Your code from Prolific
    window.location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`;
  }

  return (
    <div>
      <h2>Thank you for participating!</h2>
      <p>Click the button below to return to Prolific and receive payment.</p>
      <p>If you are seeing this screen even if you didn't complete the study, you will still receive the payment of $1.6 for your participation!</p>
      <Button handleClick={handleComplete}>
        Return to Prolific
      </Button>
    </div>
  );
}