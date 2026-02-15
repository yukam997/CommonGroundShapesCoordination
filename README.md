# Yu2024_replication

## File explanations
server, client, .empirica folders are for running the experiment.\

data_analysis files: \


prolific_management: we hosted the server and downloaded the data and repeated this process multiple times. gather_files.r in this folder gathers multiple files into one to ease processing.\

What may be imperfect:
- bonus payments processing - there might be ways to find how I did this in local computer.

attention_check.r creates "games_for_analysis.csv" which is what passed attention checks.\
count_strategy for counting strategy\
trace_generation generates traces as seen inside data_from_jan27_full folder\
rest of analysis is in statsForCogsci.qmd
analyse_writing.r creates csv with just the writing. Similar thing is done inside statsForCogsci too but doesn't save a csv.
