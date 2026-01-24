library(dplyr)
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
player <- read.csv("./combined_player.csv")
game <- read.csv("./combined_game.csv")
experimental_d <- read.csv("./simplified_experimental_data.csv")
player <- player %>% select(id,gameID, bonus,writtenPlan,exitSurvey)
# sum bonus with same gameID,and concat writtenPlan

player <- player %>%
  mutate(
    writtenPlan = sapply(strsplit(writtenPlan, '"'), function(x) x[4])
  )
View(player)
# collapse data with same gameID into one row by summing bonus and concatenating writtenPlan
player <- player %>% group_by(gameID) %>%
  summarise(
    bonus = sum(bonus),
    writtenPlan = paste(writtenPlan, collapse = " | "),
    did_you_follow_advice= sapply(strsplit(exitSurvey, '"'), function(x) x[4]),
    what_was_partner_advice = sapply(strsplit(exitSurvey, '"'), function(x) x[8]),
    feedback = sapply(strsplit(exitSurvey, '"'), function(x) x[12])
  )
# rename gameID to game_number
colnames(player)[1] <- "game_number"
# concatenate simplified and games_id for same gameID
combined_df <- merge(experimental_d, player, by= "game_number")
# save as writing_analysis.csv
write.csv(combined_df, "./writing_analysis.csv", row.names = FALSE)
