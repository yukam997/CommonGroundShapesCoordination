import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const {numRounds} = treatment;
  for (let i = 0; i < numRounds; i++) {
    const round = game.addRound({
      name: `Round ${i}`,
    });
    round.addStage({ name: "choice", duration: 10000 });
    round.addStage({ name: "result", duration: 10000 });
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
    const playerChoice = player.round.get("decision");
    const partnerChoice = partner.round.get("decision");

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

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
