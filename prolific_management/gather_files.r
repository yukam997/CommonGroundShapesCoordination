library(dplyr)
library(ggplot2)

working_directory <- file.path(dirname(rstudioapi::getActiveDocumentContext()$path))
setwd(working_directory)
directories <- list.dirs(path = "../", full.names = TRUE, recursive = FALSE)
# Files were collected in multiple rounds to avoid overloading the server files. These were stored as real_data_1, real_data_2, etc. We only want to read those directories.
directories <- directories[grepl("real_data_", directories)]

# concatenate ./game.csv files from each directory
game_df <- do.call(rbind, lapply(directories, function(dir) {
    read.csv(file.path(dir, "game.csv"))
}))

# filter out games where endedReason is not "end of game". Games that remain are all the ones which finished playing.
game_df <- game_df[game_df$endedReason == "end of game", ]
for (tName in unique(game_df$treatmentName)) {
    n_games <- nrow(game_df[game_df$treatmentName == tName, ])
    print(paste("Treatment:", tName, "Number of completed games:", n_games))
}
write.csv(game_df, file.path(working_directory, "../data_analysis/data_from_jan27_full/combined_game.csv"), row.names = FALSE)

# we store different csv files for each game, player, playerStage, and playerRound information, making sure we filter out games which didn't finish.
player_df <- lapply(directories, function(dir) {
    read.csv(file.path(dir, "player.csv"))
})
player_df <- bind_rows(player_df)
player_df <- player_df[player_df$gameID %in% game_df$id, ]
write.csv(player_df, file.path(working_directory, "../data_analysis/data_from_jan27_full/combined_player.csv"), row.names = FALSE)

playerStage_df <- lapply(directories, function(dir) {
    read.csv(file.path(dir, "playerStage.csv"))
}) 
playerStage_df <- bind_rows(playerStage_df)
playerStage_df <- playerStage_df[playerStage_df$playerID %in% player_df$id, ]

write.csv(playerStage_df, file.path(working_directory, "../data_analysis/data_from_jan27_full/combined_playerStage.csv"), row.names = FALSE)

playerRound_df <- lapply(directories, function(dir) {
    read.csv(file.path(dir, "playerRound.csv"))}) %>% 
    bind_rows()
sum(duplicated(playerRound_df))
playerRound_df <- playerRound_df[playerRound_df$playerID %in% player_df$id, ]
write.csv(playerRound_df, file.path(working_directory, "../data_analysis/data_from_jan27_full/combined_playerRound.csv"), row.names = FALSE)

