import React from "react";
import { Consent } from "@empirica/core/player/react";

export function MyConsent({ onConsent}) {

  return (
    <Consent
      text="By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology.  If you have questions about this research, please contact us at stanfordpsych251@gmail.com. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you."
      onConsent={onConsent}
    />
  );
}