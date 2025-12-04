import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const {numRounds} = treatment;
  for (let i = 0; i < numRounds; i++) {
    const round = game.addRound({
      name: `Round ${i}`,
    });
    round.addStage({ name: "choice", duration: 500 });
    round.addStage({ name: "result", duration: 500 });
  }
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  if (stage.get("name") !== "choice") return;
  console.log("End of choice stage");

  const players = stage.currentGame.players;
  
  for (const player of players) {
    console.log("computing cost for player ", player.id);
    const partner = players.filter((p) => p.id !== player.id)[0];
    try {
      const playerChoice = player.round.get("decision");
      const partnerChoice = partner.round.get("decision");
      if (!partnerChoice||!playerChoice) {
        console.log("One of the players did not make a choice.");
        throw new Error("No partner found");
      }
    } catch (error) {
      console.error(error);
      continue;
    }
    console.log(`Player choice: ${playerChoice||"not found"}, Partner choice: ${partnerChoice||"not found"}`);
    let score;
    if (playerChoice === partnerChoice) {
      score = 30;
    } else {
      if (playerChoice === "A" || playerChoice === "B") {
      score = 20;
      } 
      if (playerChoice === "C") {
        score = 18;
      }
      if (playerChoice === "D") {
        score = 11;
      }
    }


    if ((playerChoice === "A" && partnerChoice === "B")||(playerChoice === "B" && partnerChoice === "A")||
        (playerChoice === "C" && partnerChoice === "D")||(playerChoice === "D" && partnerChoice === "C")) {
      score -= 10;
    } 
    player.round.set("score", score);
    const currentScore = player.get("score") || 0;
    player.set("score", currentScore + score);
  }
});

Empirica.onRoundEnded(({ round }) => {
});
// Empirica.onRoundEnded(({ round }) => {
//   const players = round.currentGame.players;
//   const game = round.currentGame;
//   const target = round.get('target');
//   const selectedAnswer = round.get('selection')

//   // Update player scores
//   players.forEach(player => {
//     const currScore = player.get("bonus") || 0;
//     const scoreIncrement = selectedAnswer === target ? .03 : 0;
//     player.set("bonus", scoreIncrement + currScore);
//     player.set("score", scoreIncrement + currScore);
//   })
//   const currentSelection = round.get('selection');
//   const currentInactive = game.get("numRoundsInactive");

//   console.log(`Game ${game.id} - ${round.get("trialNum")}/${round.get("numTrials")}`);
//   console.log(`- target: "${target}", selection: "${currentSelection}", inactive count: ${game.get("numRoundsInactive")}`);
  
//   if (currentSelection === '') {
//     // No selection - increment inactivity counter
//     const currNumInactive = game.get("numRoundsInactive");
//     const newInactiveCount = currNumInactive + 1;
//     game.set("numRoundsInactive", newInactiveCount);
  
//     // Check if exceeded timeout
//     if (newInactiveCount >= game.get("maxTimeout")) {
//       if (!game.get("ended")) {
//         console.log(`Marking Game ${game.id} as ended due to timeout`);
//         game.set("endedInactive", true);
//         game.end("ended", "timeOut");
//       }
//     }
//   } else {
//     // Only log if we're resetting from an inactive state
//     if (currentInactive > 0) {
//       console.log(`Reset inactivity counter for game ${game.id} - they responded after ${currentInactive} inactive rounds`);
//     } 
//     game.set("numRoundsInactive", 0);
//   }

//   // Save outcomes as property of round for later export/analysis
//   round.set('response', round.get('selection'));
//   round.set('correct', target === round.get('selection'));
// });

Empirica.onGameEnded(({ game }) => {});
