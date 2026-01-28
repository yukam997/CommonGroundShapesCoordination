
library(ggplot2)
library(dplyr)
### run python function on the cleaned csv to classify strategy.
n_rounds = 13
classify_strategy <- function(pair_choice_seq) {
  strat_table <- c("stable_orange"=0, "alt_purple"=0, "stable_purple"=0, 'both_stable'=0, "one_stable"=0)
  # create choice_relationship vector
  for (i in (n_rounds-4):(n_rounds-1)) {
    p1_choice <- pair_choice_seq[i]
    p2_choice <- pair_choice_seq[i+n_rounds]
    next_p1_choice <- pair_choice_seq[i+1]
    next_p2_choice <- pair_choice_seq[i+n_rounds+1]
    if (all(c(p1_choice, p2_choice,next_p1_choice,next_p2_choice) %in% c("C", "D"))) {
      if (p1_choice == next_p1_choice & p2_choice == next_p2_choice){strat_table["stable_purple"]=strat_table["stable_purple"]+0.25}
      else if (p1_choice != next_p1_choice & p2_choice != next_p2_choice){strat_table["alt_purple"]=strat_table["alt_purple"]+0.25}
    } 
    else if (all(c(p1_choice, p2_choice,next_p1_choice,next_p2_choice) %in% c("A", "B"))) {
      if (p1_choice == next_p1_choice & p2_choice == next_p2_choice){strat_table["stable_orange"]=strat_table["stable_orange"]+0.25}
    }
  }
  if (strat_table["stable_orange"] + strat_table["stable_purple"] + strat_table["alt_purple"] == 0) {
    pair_1_stable = FALSE
    pair_2_stable = FALSE
    # if both pairs choose same color for last 4 rounds, classify as other_stable
    if (sum(pair_choice_seq[(n_rounds-4):n_rounds]=="A") >3 | sum(pair_choice_seq[(n_rounds-4):n_rounds]=="B") >3 |
        sum(pair_choice_seq[(n_rounds-4):n_rounds]=="C") >3 | sum(pair_choice_seq[(n_rounds-4):n_rounds]=="D") >3) {
      pair_1_stable = TRUE
    }
    if (sum(pair_choice_seq[(n_rounds-4+n_rounds):(2*n_rounds)]=="A") >3 | sum(pair_choice_seq[(n_rounds-4+n_rounds):(2*n_rounds)]=="B") >3 |
        sum(pair_choice_seq[(n_rounds-4+n_rounds):(2*n_rounds)]=="C") >3 | sum(pair_choice_seq[(n_rounds-4+n_rounds):(2*n_rounds)]=="D") >3) {
      pair_2_stable = TRUE
    }
    if (pair_1_stable & pair_2_stable) {
      strat_table["both_stable"] = 1
    } else if (pair_1_stable | pair_2_stable) {
      strat_table["one_stable"] = 1
    }

  }
  return (strat_table)
}
# create table where each with columns: gameID, altOrange, altPurple, stableOrange, stablePurple, other
strategy_count_df <- data.frame(
  game_number = character(),
  alt_purple = numeric(),
  stable_orange = numeric(),
  stable_purple = numeric(),
  both_stable = numeric(),
  one_stable = numeric(),
  no_strat = numeric(),
  other = numeric(),
  treatmentName = character(),
  stringsAsFactors = FALSE
)
setwd(file.path(dirname(rstudioapi::getActiveDocumentContext()$path), 
                "data_from_jan27_full"))# concatenate data diretory with file names
# create dict mapping treatment name to list of game IDs where treatment name is unique(game$treatmentName)
game<- read.csv("games_for_analysis.csv")
playerRound_df <- read.csv("combined_playerRound.csv")
playerRound_df <- playerRound_df %>% filter(gameID %in% game$id)
playerRound_df <- playerRound_df %>%
  arrange(gameID, playerID, decisionLastChangedAt) %>%  # Sort by multiple columns
  select(decision, gameID, playerID)
for (i in seq_len(nrow(game))) {
  # find which treatment this game belongs to
  treatment_name <- game$treatmentName[i]
  df_game <- playerRound_df[playerRound_df$gameID == game$id[i], ]
  pair_choice_seq <- df_game$decision
  strat <- classify_strategy(pair_choice_seq)
  strategy_count_df <- rbind(strategy_count_df, data.frame(
    game_number = game$id[i],
    alt_purple = strat["alt_purple"],           # Added quotes
    stable_orange = strat["stable_orange"],     # Added quotes
    stable_purple = strat["stable_purple"],     # Added quotes
    both_stable = strat["both_stable"],
    one_stable = strat["one_stable"],
    other = 1 - strat["alt_purple"] - strat["stable_orange"] - strat["stable_purple"] - strat["both_stable"] - strat["one_stable"],  # Added quotes
    treatmentName = treatment_name
  ))
}
write.csv(strategy_count_df,"./new_simplified_experimental_data.csv",row.names = FALSE)

experimental_d <- read.csv("./new_simplified_experimental_data.csv")
View(experimental_d)
# for each strategy, sum up the counts
for (tName in unique(game$treatmentName)) {
  experimental_d_sub <- experimental_d[experimental_d$treatmentName == tName, ]
  strategy_counts_exp <- data.frame(
    strategy = c("stable_orange", "stable_purple", "alt_purple", "both_stable", "one_stable","other"),
    count = c(sum(experimental_d_sub$stable_orange), sum(experimental_d_sub$stable_purple), sum(experimental_d_sub$alt_purple), sum(experimental_d_sub$both_stable), sum(experimental_d_sub$one_stable),sum(experimental_d_sub$other)),
    treatmentName = tName
  )
  p_experimental <- ggplot(strategy_counts_exp, aes(x=strategy, y=count)) + 
    geom_col() +
    labs(x = "norm type", y = "proportion of pairs exhibiting norm", title = paste("treatment: ", tName)) + 
    theme_minimal() + 
    scale_x_discrete(limits = c("stable_orange", "stable_purple", "alt_purple", "both_stable", "one_stable","other"),
                    labels = c("stable\norange", "stable\npurple", "alt\npurple", "both\nstable", "one\nstable","other"))
  ggsave( paste0("./new_strategy_type_", tName, ".png"), plot = p_experimental, width = 6, height = 4, dpi = 300)
}
