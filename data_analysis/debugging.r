library(dplyr)
library(ggplot2)
# Load combined_playerRound.csv and combined_game.csv
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

game_df<-read.csv(file.path("../Yu2024_replication-2026-01-27-16-45-12", "game.csv"))
df<-read.csv(file.path("../Yu2024_replication-2026-01-27-16-45-12", "playerRound.csv"))
game_treatment_map <- game_df %>% select(id)
colnames(game_treatment_map) <- c("gameID")
df <- df %>% arrange(gameID, playerID, decisionLastChangedAt) %>%
  select(decision, gameID, playerID)
# but gameID is unique but treatmentName is no
df <- merge(df, game_treatment_map, by = "gameID")
df <- df%>%
  group_by(playerID) %>%
  mutate(trial_n = row_number()- first(row_number())
  ) %>% ungroup()
df <- df%>%
group_by(gameID) %>%
  mutate(
    player_color = ifelse(playerID==first(playerID), "1", "2")
  )
View(df)
p <- ggplot(df, aes(x = trial_n, y = decision, color = player_color)) +
  geom_point(position = position_jitter(width = 0, height = 0.1)) +
  facet_wrap(~ gameID, ncol = 4) +
  labs(
    x = "Round (trial_n)",
    y = "Decision",
    title = paste("Player Decisions")
  ) +
  theme_minimal()
ggsave(paste0("bad_player_traces.png"), plot = p, width = 10, height = 8)

