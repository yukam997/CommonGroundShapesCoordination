### Data Preparation
# load dhara's data
#### Load Relevant Libraries and Functions
library(dplyr)
library(brms)# library for analysis
#### Import data
data_directory <- "./Yu2024_replication_new/"
setwd(data_directory)
# concatenate data diretory with file names
game_df <- read.csv("./game.csv")
player <- read.csv("./player.csv")
playerRound_df <- read.csv("./playerRound.csv")
playerStage_df <- read.csv("./playerStage.csv")
n_rounds = 13
#### Data exclusion / filtering
# identify games which finished successfully
successful_games_id <- game_df$id[game_df$endedReason == "end of game"] 
playerRound_df <- playerRound_df %>%
  arrange(gameID, playerID, decisionLastChangedAt) %>%  # Sort by multiple columns
  select(decision, bonus, gameID, playerID)  
playerRound_df <- playerRound_df[playerRound_df$gameID %in% successful_games_id, ]
playerRound_df <- playerRound_df %>% mutate(row_index = row_number())
# create round column which is %13 of row_index

# only look at rows where gameID is in successful_games_id
playerStage_df <- playerStage_df[playerStage_df$gameID %in% successful_games_id, ]
playerStage_df <- playerStage_df %>%
  arrange(gameID, playerID, stageIDLastChangedAt) %>%  # Sort by multiple columns
  select(myGain, gameID, playerID,stageIDLastChangedAt)  
# only take the even indexed rows (1 indexed)
playerStage_df <- playerStage_df[c(FALSE, TRUE), ] # get rows which represent "results" stages where participants entered what score they got 
# for each gameID, count the percentage that myCost is correct
# for each game ID, order rows by playerID and stageIDLastChangedAt and the entries in myCost column from stage data
# loop trhough each id in successful_games_id
attention_gameIDs <- c()
# filter out games where participant fails attention check for more than 80% of the game. 
# this is done by comparing the gain participants said they got (myGain) with the actual score they got "gain" in round_df
for (gid in successful_games_id) {
  stage_myGain<-playerStage_df$myGain[playerStage_df$gameID == gid]
  round_gains <- playerRound_df$bonus[playerRound_df$gameID == gid]
  # only take entries where index%%4==0
  indices <- c(seq(1, 13, by = 4), seq(14, 26, by = 4))
  stage_myGain <- stage_myGain[indices]
  round_gains <- round_gains[indices]
  stage_myGain[is.na(stage_myGain)] <- "none"
  # compare the two vectors
  tryCatch({
    if (sum(stage_myGain == round_gains) / length(round_gains) > 0.6) {
      print(paste("Passed attention check:", gid))
      attention_gameIDs <- c(attention_gameIDs, gid)
    } else {
      print(paste("Failed attention check:", gid))
      print(stage_myGain)
      print(round_gains)
    }
  }, error = function(e) {
    print(paste("Error:", gid, "-", e$message,"this was the one player who did not get paired properly"))
  })
}

### run python function on the cleaned csv to classify strategy.
classify_strategy <- function(pair_choice_seq) {
  strat_table <- c("stable_orange"=0, "alt_purple"=0, "stable_purple"=0)
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
  return (strat_table)
}



# create table where each with columns: gameID, altOrange, altPurple, stableOrange, stablePurple, other
strategy_count_df <- data.frame(
  game_number = character(),
  alt_purple = numeric(),
  stable_orange = numeric(),
  stable_purple = numeric(),
  other = numeric(),
  stringsAsFactors = FALSE
)


#### Prepare data for analysis - create columns etc.
for (game in attention_gameIDs) {
  df_game <- playerRound_df[playerRound_df$gameID == game, ]
  pair_choice_seq <- df_game$decision
  strat <- classify_strategy(pair_choice_seq)
  if (strat["alt_purple"]>0){print(game)}
  strategy_count_df <- rbind(strategy_count_df, data.frame(
    game_number = game,
    alt_purple = strat["alt_purple"],           # Added quotes
    stable_orange = strat["stable_orange"],     # Added quotes
    stable_purple = strat["stable_purple"],     # Added quotes
    other = 1 - strat["alt_purple"] - strat["stable_orange"] - strat["stable_purple"]  # Added quotes
  ))
}
write.csv("./simplified_experimental_data.csv", row.names = FALSE)
library(ggplot2)
experimental_d <- read.csv("./simplified_experimental_data.csv")
# for each strategy, sum up the counts
strategy_counts_exp <- data.frame(
  strategy = c("stable_orange", "stable_purple", "alt_purple", "other"),
  count = c(sum(experimental_d$stable_orange), sum(experimental_d$stable_purple), sum(experimental_d$alt_purple), sum(experimental_d$other))
)
p_experimental <- ggplot(strategy_counts_exp, aes(x=strategy, y=count)) + 
  geom_col() +
  labs(x = "norm type", y = "proportion of pairs exhibiting norm", title = "Replication Results") + 
  theme_minimal() + 
  scale_x_discrete(limits = c("stable_orange", "stable_purple", "alt_purple", "other"),
                   labels = c("stable\norange", "stable\npurple", "alt\npurple", "other"))
ggsave( "./experimental_strategy_plot.png", plot = p_experimental, width = 6, height = 4, dpi = 300)


