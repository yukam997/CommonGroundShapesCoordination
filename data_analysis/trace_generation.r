library(dplyr)
library(ggplot2)
# Load combined_playerRound.csv and combined_game.csv
setwd(file.path(dirname(rstudioapi::getActiveDocumentContext()$path), 
                "data_from_jan27_full"))# concatenate data diretory with file names

df <- read.csv("./combined_playerRound.csv")
game_df <- read.csv("./games_for_analysis.csv")
n_rounds = 13
# filter df to only include games in game_df
df <- df %>% filter(gameID %in% game_df$id)
game_treatment_map <- game_df %>% select(id, treatmentName)
colnames(game_treatment_map) <- c("gameID", "treatmentName")
df <- df %>% arrange(gameID, playerID, decisionLastChangedAt) %>%
  select(decision, gameID, playerID)
# but gameID is unique but treatmentName is no
df <- merge(df, game_treatment_map, by = "gameID")
df <- df%>%
  mutate(
    trial_n = (row_number() - 1) %% n_rounds + 1,
    player_color = as.character(floor((row_number()-1) / 13) %% 2 + 1)
  )
for (tName in unique(df$treatmentName)) {
  smaller_df <- df %>% filter(treatmentName == tName)
  p <- ggplot(smaller_df, aes(x = trial_n, y = decision, color = player_color)) +
  geom_point(position = position_dodge(width = 0.3), size = 2) +
  facet_wrap(~ gameID, ncol = 4) +
  labs(
    x = "Round (trial_n)",
    y = "Decision",
    color = "Player Color",
    title = paste("Player Decisions -", tName)
  ) +
  theme_minimal()
  ggsave(paste0("player_traces_", tName, ".png"), plot = p, width = 14, height = 10)
}

