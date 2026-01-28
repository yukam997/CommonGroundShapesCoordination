setwd(file.path(dirname(rstudioapi::getActiveDocumentContext()$path), 
                "data_from_jan27_full"))# concatenate data diretory with file names
library(lme4)
library(emmeans)
library(dplyr)
# playerStage_df <- read.csv("./combined_playerStage.csv")
player <- read.csv("./combined_player.csv")
game <- read.csv("./games_for_analysis.csv")
if ("treatmentName" %in% colnames(player) == FALSE) {
  player <- merge(player, game %>% select(id, treatmentName), by.x = "gameID", by.y = "id")
}

# filter player to only include games in game
player <- player %>% filter(gameID %in% game$id)
# print(length(unique(player$playerID)))  
player <- player %>% 
  group_by(gameID) %>% 
  summarise(
    bonus = mean(bonus), # sum bonus of both players
    isCG = first(as.numeric(grepl("^CG_", treatmentName))),
    isCooperate = first(as.numeric(grepl("_cooperate", treatmentName))),
    treatmentName = first(treatmentName)
  ) %>% ungroup()

interaction_model <- lm(bonus ~ isCG*isCooperate , data=player)
independent_model <- lm(bonus ~  isCG + isCooperate, data=player)
base_model <- lm(bonus ~ 1, data=player)
anova(independent_model, interaction_model)
anova(base_model, independent_model)
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
