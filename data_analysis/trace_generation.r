library(dplyr)
library(ggplot2)
# Load combined_playerRound.csv and combined_game.csv
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

df <- read.csv("./combined_playerRound.csv")
game_df <- read.csv("./combined_game.csv")
n_rounds = 13
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
  # red if player_color is 1, blue if 2
    geom_point(position = position_jitter(width = 0, height = 0.1)) +
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
View(df$player_color)

