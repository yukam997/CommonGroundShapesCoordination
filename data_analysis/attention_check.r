library(dplyr)
library(brms)# library for analysis
#### Import data
# set to current working directory
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
# concatenate data diretory with file names
playerRound_df <- read.csv("./combined_playerRound.csv")
n_rounds = 13
#### Data exclusion / filtering
# identify games which finished successfully
# print unique game ids
playerRound_df <- playerRound_df %>%
  arrange(gameID, playerID, decisionLastChangedAt) %>%  # Sort by multiple columns
  select(decision, bonus, gameID, playerID)  
playerRound_df <- playerRound_df %>% mutate(row_index = row_number())
# create round column which is %13 of row_index

playerStage_df <- read.csv("./combined_playerStage.csv")
playerStage_df <- playerStage_df %>%
  arrange(gameID, playerID, stageIDLastChangedAt) %>%  # Sort by multiple columns
  select(costCorrect, myGain, gameID, playerID, stageIDLastChangedAt)  
playerStage_df <- playerStage_df %>%
  filter(row_number()%%26 %in% c(0,2,10,18))
playerRound_df <- playerRound_df %>%
  filter(row_number()%%13 %in% c(0,1,5,9))
View(playerStage_df)
View(playerRound_df)
# only take the even indexed rows (1 indexed)
attention_gameIDs <- c()
# filter out games where participant fails attention check for more than 80% of the game. 
# this is done by comparing the gain participants said they got (myGain) with the actual score they got "gain" in round_df
for (pid in unique(playerStage_df$playerID)) {
  stage_array <- playerStage_df %>%
  filter(playerID == pid)

  stage_array[is.na(stage_array)] <- "none"
  # compare the two vectors
  tryCatch({
    if (sum(stage_array$myGain == playerRound_df$bonus[playerRound_df$playerID == pid]) > 2) {
      attention_gameIDs <- c(attention_gameIDs, pid)
    } else {
      # print(paste("Failed attention check:", pid))
      print(playerRound_df$bonus[playerRound_df$playerID == pid])
      print(stage_array$myGain)
      print("\n")
    }
  }, error = function(e) {
    print(paste("Error:", pid, "-", e$message,))
  })
}