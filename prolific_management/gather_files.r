library(dplyr)
library(ggplot2)
directories <- c(
    "../Yu2024_replication-2026-01-20-21-00-29",
    "../Yu2024_replication-2026-01-20-21-59-57",
    "../Yu2024_replication-2026-01-20-23-54-50"
)
#set directory as same as this r file location
working_directory <- file.path(dirname(rstudioapi::getActiveDocumentContext()$path))
setwd(working_directory)
# concatenate ./game.csv files from each directory
game_df <- do.call(rbind, lapply(directories, function(dir) {
    read.csv(file.path(dir, "game.csv"))
}))

player_df <- do.call(rbind, lapply(directories, function(dir) {
    read.csv(file.path(dir, "player.csv"))
}))
# save file as csv
# filter out games where endedReason is not "end of game"
game_df <- game_df[game_df$endedReason == "end of game", ]
# there are duplicate rows
game_df <- game_df[!duplicated(game_df), ]
player_df <- player_df[player_df$gameID %in% game_df$id, ]
# remove columns if they happen twice in this case, take the later one because it would have happend in the second folder and first
player_df <- player_df[!duplicated(player_df$id,fromLast = TRUE), ]
write.csv(game_df, file.path(working_directory, "../data_analysis/combined_game.csv"), row.names = FALSE)
write.csv(player_df, file.path(working_directory, "../data_analysis/combined_player.csv"), row.names = FALSE)

playerStage_df <- do.call(rbind, lapply(directories, function(dir) {
    read.csv(file.path(dir, "playerStage.csv"))
}))
playerStage_df <- playerStage_df[playerStage_df$playerID %in% player_df$id, ]
playerStage_df <- playerStage_df[!duplicated(playerStage_df), ]
playerStage_df <- playerStage_df[!duplicated(playerStage_df$id,fromLast = TRUE), ]
# save playerStage_df as csv
write.csv(playerStage_df, file.path(working_directory, "../data_analysis/combined_playerStage.csv"), row.names = FALSE)
playerRound_df <- do.call(rbind, lapply(directories, function(dir) {
    read.csv(file.path(dir, "playerRound.csv"))
}))
playerRound_df <- playerRound_df[playerRound_df$playerID %in% player_df$id, ]
playerRound_df <- playerRound_df[!duplicated(playerRound_df), ]
playerRound_df <- playerRound_df[!duplicated(playerRound_df$id,fromLast = TRUE), ]
write.csv(playerRound_df, file.path(working_directory, "../data_analysis/combined_playerRound.csv"), row.names = FALSE)
