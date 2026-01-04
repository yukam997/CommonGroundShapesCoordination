import React from "react";
import { Button } from "../components/Button.jsx";
import { Alert } from "../components/Alert.jsx";

export function ParkingDiagram({ youParked, partnerParked }) {
  const spots = [
    { x: 17, letter: 'A', regularPrice: 20, discountPrice: 10, color: '#FFA500' },
    { x: 383, letter: 'B', regularPrice: 20, discountPrice: 10, color: '#FFA500' },
    { x: 749, letter: 'C', regularPrice: 18, discountPrice: 8, color: '#7814d5ff' },
    { x: 1115, letter: 'D', regularPrice: 11, discountPrice: 1, color: '#7814d5ff' }
  ];
  
  const black = '#2a2a2a';

  const Car = ({ color, label, offset = 0 }) => (
    <g transform={`translate(${offset}, 0)`}>
      {/* Car body */}
      <rect x="80" y="410" width="186" height="70" rx="10" fill={color} stroke="white" strokeWidth="3" />
      {/* Car roof */}
      <rect x="110" y="370" width="126" height="60" rx="8" fill={color} stroke="white" strokeWidth="3" />
      {/* Windows (aligned) */} 
      <rect x="120" y="380" width="45" height="40" rx="3" fill="#87CEEB" opacity="0.7"/> 
      <rect x="181" y="380" width="45" height="40" rx="3" fill="#87CEEB" opacity="0.7"/> 
      {/* Wheels (aligned) */} 
      <circle cx="110" cy="480" r="18" fill="#1a1a1a" stroke="white" strokeWidth="2"/> 
      <circle cx="236" cy="480" r="18" fill="#1a1a1a" stroke="white" strokeWidth="2"/> 
      <circle cx="110" cy="480" r="8" fill="#666"/> 
      <circle cx="236" cy="480" r="8" fill="#666"/> 
      {/* Label */} 
      <text x="173" y="460" style={{ font: 'bold 24px Arial', fill: 'white', textAnchor: 'middle' }}>{label}</text> 
    </g>
  );
  
  return (
    <svg width="745" height="410" viewBox="0 0 1490 820" className="mx-auto my-4 w-full max-w-3xl">
      <defs>
        <style>{`
          .label { font: 32px Arial; fill: white; text-anchor: middle; }
          .value { font: 300 64px Arial; fill: white; text-anchor: middle; }
          .letter { font: bold 140px Arial; fill: white; text-anchor: middle; }
        `}</style>
        <g id="spot-base">
          <rect width="366" height="645" fill="white"/>
          <rect x="18" y="15" width="328" height="539" fill={black}/>
          <rect x="18" y="516" width="328" height="149" fill={black}/>
        </g>
      </defs>

      <rect width="1490" height="820" fill={black}/>

      {spots.map((spot, i) => {
        const bothParked = (youParked === spot.letter) && (partnerParked === spot.letter);
        return (
          <g key={i} transform={`translate(${spot.x}, 97)`}>
            <use href="#spot-base"/>
            <text x="173" y="68" className="label">Regular price:</text>
            <text x="173" y="153" className="value">{spot.regularPrice}MU</text>
          <text x="173" y="233" className="label">Discount price:</text>
          <text x="173" y="318" className="value">{spot.discountPrice}MU</text>
          <rect x="18" y="408" width="328" height="108" fill={spot.color}/>
          <text x="173" y="639" className="letter">{spot.letter}</text>

          {youParked === spot.letter && (
            <Car color="#FF4444" label="YOU" offset={bothParked ? -60 : 0} />
          )}
          {partnerParked === spot.letter && (
            <Car color="#4444FF" label="PARTNER" offset={bothParked ? 60 : 0} />
          )}
        </g>
      )
      })}
    </svg>
  );
}
export function Introduction2({ next }) {
  const [currentExample, setCurrentExample] = React.useState(0);
  
  const examples = [
    {
      title: "Example 1: You pick A, your partner picks A",
      youParked: "A",
      partnerParked: "A",
      description: "→ You get a clashing-spot penalty",
      details: [
        "You pay 30MU",
        "Your partner pays 30 MU",
        "You earn a bonus of 0 × $0.005 = $0.00"
      ]
    },
    {
      title: "Example 2: You pick A, your partner picks B",
      youParked: "A",
      partnerParked: "B",
      description: "→ You get a same-color discount",
      details: [
        "You pay 10 MU",
        "Your partner pays 10 MU",
        "You earn a bonus of 20 × $0.005 = $0.10"
      ]
    },
    {
      title: "Example 3: You pick C, your partner picks D",
      youParked: "C",
      partnerParked: "D",
      description: "→ You get a same-color discount",
      details: [
        "You pay 8 MU",
        "Your partner pays 1 MU",
        "You earn a bonus of 22 × $0.005 = $0.11"
      ]
    },
    {
      title: "Example 4: You pick B, your partner picks C",
      youParked: "B",
      partnerParked: "C",
      description: "→ You pay the regular cost",
      details: [
        "You pay 20 MU",
        "Your partner pays 18 MU",
        "You earn a bonus of 10 × $0.005 = $0.05"
      ]
    }
  ];

  const currentEx = examples[currentExample];
  const isLastExample = currentExample === examples.length - 1;

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Example Payoffs
      </h3>
      <div className="mt-2 mb-6">
        <p className="mb-4">Here are some example payoffs:</p>
        
        <div className="mb-8">
          <p className="font-semibold mb-2">{currentEx.title}</p>
          <ParkingDiagram youParked={currentEx.youParked} partnerParked={currentEx.partnerParked} />
          <p className="mt-2">{currentEx.description}</p>
          <ul className="list-disc list-inside ml-4">
            {currentEx.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <Alert title="Important Notice">
        <p>
          If at any point your partner disconnects or the game ends unexpectedly, you will be redirected to a short exit survey and then to the Prolific completion page. You will still receive compensation for your time spent in the experiment.
        </p>
      </Alert>
      <br />
      
      {!isLastExample ? (
        <Button handleClick={() => setCurrentExample(currentExample + 1)} autoFocus>
          <p>Next Example</p>
        </Button>
      ) : (
        <Button handleClick={next} autoFocus>
          <p>Next</p>
        </Button>
      )}
    </div>
  );
}