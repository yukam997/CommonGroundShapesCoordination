library(dplyr)
library(brms)# library for analysis
#### Import data
# set to current working directory to subdirectory data_from_jan27_full
# More efficient - do it in one step
setwd(file.path(dirname(rstudioapi::getActiveDocumentContext()$path), 
                "data_from_jan27_full"))# concatenate data diretory with file names
playerRound_df <- read.csv("combined_playerRound.csv")
n_rounds = 13
#### Data exclusion / filtering
playerRound_df <- playerRound_df %>%
  arrange(gameID, playerID, decisionLastChangedAt)  # Sort by multiple columns
# create round column which is %13 of row_index
playerStage_df <- read.csv("combined_playerStage.csv")
playerStage_df <- playerStage_df %>%
  arrange(gameID, playerID, stageIDLastChangedAt)
# get columns of stage where they were asked attention check
playerStage_df <- playerStage_df %>%
  filter(row_number()%%26 %in% c(0,2,10,18))
# get columns for rounds where they gained points which they were asked about later
playerRound_df <- playerRound_df %>%
  filter(row_number()%%13 %in% c(0,1,5,9))
# only take the even indexed rows (1 indexed)
attentitive_playerIDs <- c()
# # filter out games where participant fails attention check for more than 80% of the game. 
# # this is done by comparing the gain participants said they got (myGain) with the actual score they got "gain" in round_df
playerStage_df <- playerStage_df %>%
  group_by(playerID) %>%
  mutate(
    passed_attention_check = sum(costCorrect=="true")>1
  ) %>% #don't keep duplicates
  ungroup()
for (pid in unique(playerStage_df$playerID)) {
  stage_array <- playerStage_df %>%
    filter(playerID == pid) %>%
    mutate(myGain = ifelse(is.na(myGain), "none", myGain))
  # compare the two vectors
  tryCatch({
    # print(class(stage_array))
    if (sum(stage_array$myGain == playerRound_df$bonus[playerRound_df$playerID == pid])>1) {
      attentitive_playerIDs <- c(attentitive_playerIDs, pid)
    } else {
      print(stage_array$myGain)
      print(playerRound_df$bonus[playerRound_df$playerID == pid])
      # print("\n")
    }
  }, error = function(e) {
    print(paste("Error:", pid, "-", e$message))
    print(stage_array)
  })
}
# check sum of bonuses match up with 
bad_game <- c()
player_df <- read.csv("combined_player.csv")
for (pid in unique(player_df$id)) {
  if (pid %in% attentitive_playerIDs) {
  } else {
    bad_game <- c(bad_game, player_df$gameID[player_df$id == pid])
  }
}
# count number of bad games
game_df <- read.csv("combined_game.csv")
for (tName in unique(game_df$treatmentName)) {
  n_bad_games <- length(game_df$id[game_df$treatmentName == tName & game_df$id %in% bad_game])
  print(paste("Treatment:", tName, "Number of bad games:", n_bad_games))
}
write.csv(game_df[!game_df$id %in% bad_game, ], "games_for_analysis.csv", row.names = FALSE)
length(game_df$id[!game_df$id %in% bad_game])
setequal(attentitive_playerIDs,
         unique(playerStage_df$playerID[playerStage_df$passed_attention_check]))
playerRound_df <- read.csv("combined_playerRound.csv") %>% filter(playerID %in% attentitive_playerIDs)
count <- 0
# check bonus of sum is same as sum of round bonuses
for (pid in attentitive_playerIDs){
  if(player_df$bonus[player_df$id == pid] != sum(playerRound_df$bonus[playerRound_df$playerID == pid])){
    print(paste("Bonus mismatch for playerID:", pid))
  } 
}
# check if decision is entered, then bonus is also computed
sum(is.na(playerRound_df$bonus)) # check if there were timeouts which affected bonus entry

# output prolific id and bonus
library(jsonlite)
total<-0
for (pid in attentitive_playerIDs){
  total <- total + round(as.numeric(player_df$bonus[player_df$id == pid])/200,2)
  json_string <- player_df$urlParams[player_df$id == pid]
  data <- fromJSON(json_string)
  prolific_pid <- data$PROLIFIC_PID
  cat(paste0(prolific_pid, ", ", round(as.numeric(player_df$bonus[player_df$id == pid])/200,2), "\n"))
}
print(total)
print(length(unique(game_df$id)))
