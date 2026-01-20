d <- read.csv("strategy_count.csv")
library(ggplot2)

p <- ggplot(d,aes(x=strategy,y=count)) + geom_col() +
  labs(x = "norm type", y = "# pairs exhibiting norm", title = "Condition 3 in Figure 3") + theme_minimal() + scale_x_discrete(limits = c("stable_orange", "stable_purple", "alternating", "other"))
ggsave("strategy_plot.png", plot = p, width = 6, height = 4, dpi = 300)

df <- read.csv("../newest_pilot/playerRound.csv")
library(dplyr)
n_rounds = 13
# Sort by multiple columns and select subset of columns
df <- df %>%
  arrange(gameID, playerID, decisionLastChangedAt) %>%  # sort
  select(decision, gameID, playerID)  
# Create trial_n column: index modulo n_rounds
df <- df %>%
  mutate(trial_n = (row_number() - 1) %% n_rounds,player_color = ifelse((row_number() - 1) %% 26 <= 12, "1","2"))
p2 <- ggplot(df, aes(x = trial_n, y = decision, color = player_color)) +
  geom_point() +                      # show points for each decision
  facet_wrap(~ gameID) +  # one plot per game
  labs(
    x = "Round (trial_n) test",
    y = "Decision",
    color = "Player ID",
    title = "Player Decisions Across Rounds per Game"
  ) +
  theme_minimal()
ggsave("player_traces.png", plot = p2, width = 6, height = 4, dpi = 300)

