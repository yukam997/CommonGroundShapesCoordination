export function MyConsent({ onConsent }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        STANFORD UNIVERSITY Research Consent Form
      </h1>
      
      <div className="space-y-6 text-base leading-relaxed">
        <section>
          <h2 className="font-bold text-lg mb-2">DESCRIPTION:</h2>
          <p>
            You are invited to participate in a research study about language and communication. 
            The purpose of the research is to understand how you interact and communicate with 
            other people in naturalistic settings as a fluent English speaker. This research will 
            be conducted through the Prolific platform, including participants from the US, UK, and 
            Canada. If you decide to participate in this research, you will play a communication 
            game in a group with one or more partners.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">TIME INVOLVEMENT:</h2>
          <p>
            The task will last the amount of time advertised on Prolific. You are free to withdraw 
            from the study at any time.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">RISKS AND BENEFITS:</h2>
          <p className="mb-3">
            You may become frustrated if your partner gets distracted, or experience discomfort if 
            other participants in your group send text that is inappropriate for the task. We ask you 
            to please be respectful of other participants you might be interacting with to mitigate 
            these risks. You may also experience discomfort when being asked to discuss or challenge 
            emotionally salient political beliefs. Study data will be stored securely, in compliance 
            with Stanford University standards, minimizing the risk of confidentiality breach.
          </p>
          <p>
            This study advances our scientific understanding of how people communicate and collaborate 
            in naturalistic settings. This study may lead to further insights about what can go wrong 
            in teamwork, suggest potential interventions to overcome these barriers, and help to develop 
            assistive technologies that collaborate with human partners. We cannot and do not guarantee 
            or promise that you will receive any benefits from this study.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">PAYMENTS:</h2>
          <p>
            You will receive payment in the amount advertised on Prolific. If you do not complete this 
            study, you will receive prorated payment based on the time that you have spent. Additionally, 
            you may be eligible for bonus payments as described in the instructions.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">PARTICIPANT'S RIGHTS:</h2>
          <p className="mb-3">
            If you have read this form and have decided to participate in this project, please understand 
            your participation is voluntary and you have the right to withdraw your consent or discontinue 
            participation at any time without penalty or loss of benefits to which you are otherwise entitled. 
            The alternative is not to participate. You have the right to refuse to answer particular questions.
          </p>
          <p>
            The results of this research study may be presented at scientific or professional meetings or 
            published in scientific journals. Your individual privacy will be maintained in all published 
            and written data resulting from the study. In accordance with scientific norms, the data from 
            this study may be used or shared with other researchers for future research (after removing 
            personally identifying information) without additional consent from you.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">CONTACT INFORMATION:</h2>
          <p className="mb-3">
            <span className="font-semibold">Questions:</span> If you have any questions, concerns or 
            complaints about this research, its procedures, risks and benefits, contact the Protocol 
            Director, Robert Hawkins (rdhawkins@stanford.edu, 217-549-6923).
          </p>
          <p>
            <span className="font-semibold">Independent Contact:</span> If you are not satisfied with 
            how this study is being conducted, or if you have any concerns, complaints, or general 
            questions about the research or your rights as a participant, please contact the Stanford 
            Institutional Review Board (IRB) to speak to someone independent of the research team at 
            650-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. You can 
            also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306.
          </p>
        </section>

        <section className="bg-gray-50 p-4 rounded">
          <p className="mb-2">Please save or print a copy of this page for your records.</p>
          <p>
            You must be at least 18 years old to participate. Your anonymity is assured; the researchers 
            who have requested your participation will not receive any personal information about you.
          </p>
        </section>

        <section className="text-center mt-8">
          <p className="font-bold text-lg">
            If you agree to participate in this research, please click "Continue".
          </p>
        </section>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onConsent}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}