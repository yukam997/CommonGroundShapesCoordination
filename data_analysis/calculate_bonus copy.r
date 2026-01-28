setwd(file.path(dirname(rstudioapi::getActiveDocumentContext()$path), 
                "data_from_jan27_full"))# concatenate data diretory with file names
library(lme4)
library(emmeans)
library(dplyr)
playerRound_df <- read.csv("./combined_playerRound.csv")
# data <- read.csv("./new_simplified_experimental_data.csv")
game <- read.csv("./games_for_analysis.csv")
# join playerRound_df with game to get treatmentName
playerRound_df <- playerRound_df %>% left_join(game %>% select(id, treatmentName), by = c("gameID" = "id"))
# filter player to only include games in game
playerRound_df <- playerRound_df %>% filter(gameID %in% game$id) %>% arrange(gameID, playerID, roundIDLastChangedAt) %>%
  mutate(
    round_n = as.numeric((row_number() - 1) %% 13 + 1),
    isCG = as.numeric(grepl("^CG_", treatmentName)),
    isCooperate = as.numeric(grepl("_cooperate", treatmentName))
  )
playerRound_df <- playerRound_df %>%
  group_by(gameID, round_n) %>%
  summarise(
    bonus = mean(bonus),
    isCG = first(isCG),
    isCooperate = first(isCooperate),
    treatmentName = first(treatmentName),
  ) %>% ungroup()
independent_model <- lm(bonus ~ round_n + isCooperate, data=playerRound_df)
interaction_model <- lm(bonus ~ round_n*isCooperate, data=playerRound_df)
base_model <- lmer(bonus ~ 1 + (1|playerID), data=playerRound_df)
anova(independent_model, interaction_model)
emmeans(independent_model, ~ isCG)
summary(interaction_model)
player <- player %>%
  group_by(treatmentName) %>%
  summarise(
    average_bonus = mean(bonus),
    sd_bonus = sd(bonus),
    n = n(),
    se_bonus = sd(bonus) / sqrt(n())
  )
# plot bar graph with error bars
library(ggplot2)
ggplot(player, aes(x=treatmentName, y=average_bonus)) +
  geom_errorbar(aes(ymin=average_bonus - se_bonus, ymax=average_bonus + se_bonus), width=0.2) +
  geom_bar(stat="identity", fill="skyblue",alpha = 0.5) +
  labs(x="Treatment Name", y="Average Bonus") +
  theme_minimal()
ggsave("bonus_by_treatment.png")
