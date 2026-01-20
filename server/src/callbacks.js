import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const {numRounds} = treatment;
  for (let i = 0; i < numRounds; i++) {
    const round = game.addRound({
      name: i,
    });
    round.addStage({ name: "choice", duration: 90 });
    round.addStage({ name: "result", duration: 30 });
  }
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  const game = stage.currentGame;
  if (stage.get("name") !== "choice") return;

  const players = stage.currentGame.players;
  for (const player of players) {
    console.log("computing cost for player ", player.id);
    const partner = players.filter((p) => p.id !== player.id)[0];
    const playerChoice = player.round.get("decision");
    const partnerChoice = partner.round.get("decision");
    if (!partnerChoice || !playerChoice) {
      console.log("Missing choice - player:", playerChoice, "partner:", partnerChoice);
      // Set end reason on all players before ending game
      // Using "endReason" instead of "ended" to avoid Empirica overwriting it
      for (const p of players) {
        //ended reason can also be that one didn't respond in time
        p.set("endReason", "disconnected");
      }
      game.end("ended", "disconnected");
      return;
    }
    let bonus=0;
    if (playerChoice === partnerChoice) {
      bonus = 0;
      console.log("Both chose the same spot. Collision!");
      player.round.set("bonus", bonus);
      continue;
    } else {
      if (playerChoice === "A" || playerChoice === "B") {
        bonus = 10;
      }
      if (playerChoice === "C") {
        bonus = 19;
      }
      if (playerChoice === "D") {
        bonus = 7;
      }
    }


    if ((playerChoice === "A" && partnerChoice === "B")||(playerChoice === "B" && partnerChoice === "A")||
        (playerChoice === "C" && partnerChoice === "D")||(playerChoice === "D" && partnerChoice === "C")) {
      bonus += 10;
    }
    player.round.set("bonus", bonus);
    const currentBonus = player.get("bonus") || 0;
    player.set("bonus", currentBonus + bonus);
  }
});

Empirica.onRoundEnded(({ round }) => {
});
Empirica.onGameEnded(({ game }) => {
  // Don't set "game ended" here - it can overwrite "disconnected" due to timing
  // ExitSurvey will treat undefined/null as normal completion
});