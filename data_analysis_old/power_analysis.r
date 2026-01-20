""" read in playerRound.csv in .empirica folder, and classify strategy of each player
"""

import pandas as pd
n_rounds = 13

# read in playerRound.csv and filter to only relevant columns
with open("./pilotA_results/playerRound.csv", "r") as f:
    df = pd.read_csv(f)
df =df.sort_values(
        by=["gameID", "playerID","decisionLastChangedAt"] # although player ID should just be alternating.
    ).reset_index(drop=True)[["decision", "gameID", "playerID"]]
# create round column which is %13 of index
df["round"] = df.index % n_rounds
# function to output strategy given the dyad's sequence of choices
def classify_strategy(pair_choice_seq):
    strat_table = {"alternating":0, "stable_orange":0, "stable_purple":0, "other":0}

    if len(pair_choice_seq) != 2*n_rounds:
        return print("Error: length of pair_choice_seq is not equal to 2*n_rounds")
    choice_relationship = ["other"] * (n_rounds-1)
    for i in range(n_rounds-1):
        p1_choice = pair_choice_seq[i]
        p2_choice = pair_choice_seq[i+n_rounds]
        next_p1_choice = pair_choice_seq[i+1]
        next_p2_choice = pair_choice_seq[i+n_rounds+1]
        if p1_choice == next_p1_choice and p2_choice == next_p2_choice:
            if {p1_choice,p2_choice}== {"C","D"}:
                choice_relationship[i] = "stable_purple"
            if {p1_choice,p2_choice}== {"A","B"}:
                choice_relationship[i] = "stable_orange"
        elif p1_choice == next_p2_choice and p2_choice == next_p1_choice:
            choice_relationship[i] = "alternating"
            
    # find longest consecutive common strategy in choice_relationship
    count = 1
    strat = choice_relationship[0]
    for i in range(1, len(choice_relationship)):
        if choice_relationship[i] == strat:
            count += 1
        else:
            if count > strat_table[strat]:
                strat_table[strat] = count
            strat = choice_relationship[i]
            count = 1
    if count > strat_table[strat]:
        strat_table[strat] = count

    del strat_table["other"]
    max_value = max(strat_table.values())
    if max_value < 5:
        return ["other"]
    return [k for k, v in strat_table.items() if v == max_value]

# count frequency of each strategy across all games

count_strat = {"alternating":0, "stable_orange":0, "stable_purple":0, "other":0}

for game in df["gameID"].unique():
    df_game = df[df["gameID"]==game]
    print(df_game)
    pair_choice_seq = df_game["decision"].tolist()
    strat = classify_strategy(pair_choice_seq)
    # print(f"gameID: {game}, strategy: {strat}")
    if strat is None:
        continue
    for s in strat:
        count_strat[s] = count_strat[s] + 1/len(strat) #1/len to account for ties

print("Overall strategy count:")
print(count_strat)

# save to csv
count_strat_df = pd.DataFrame(list(count_strat.items()), columns=["strategy", "count"])
count_strat_df.to_csv("./data_analysis/strategy_count.csv", index=False)
