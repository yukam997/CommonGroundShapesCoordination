import { Button } from "../components/Button";
// ExitSurvey.jsx or final exit step
export function ReturnToProlific({ player }) {
  function handleComplete() {
    const completionCode = "C1VG4L1R"; // Your code from Prolific
    window.location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`;
  }

  return (
  <div className="max-w-3xl mx-auto p-8">
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Thank you for participating!
      </h2>
      
      {/* Debrief Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded">
        <h3 className="text-xl font-bold mb-3 text-blue-900">Study Debrief</h3>
        <p className="mb-3 text-gray-700 leading-relaxed">
          Before you return, we would like to inform you that{" "}
          <strong className="text-gray-900">
            the advice you saw at the start of the experiment was not actually 
            written by previous participants
          </strong>
          . Instead, the advice was created by the experimenters as part of the 
          study design in order to investigate how your cooperation depended on 
          the advice.
        </p>
      </div>

      {/* Payment Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-gray-700 mb-2">
          Click the button below to return to Prolific and receive payment.
        </p>
        <p className="text-gray-700 font-semibold">
          If you are seeing this screen even if you didn't complete the study, 
          you will still receive the payment of $2.40 for your participation!
        </p>
      </div>

      {/* Button */}
      <div className="text-center">
        <Button handleClick={handleComplete}>
          Return to Prolific
        </Button>
      </div>
    </div>
  </div>
);
}