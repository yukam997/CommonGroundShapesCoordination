# The Content of Common Ground Shapes Coordination

Code and data for Machino & Hawkins (2026), *Proceedings of the 48th Annual Meeting of the Cognitive Science Society*. Paradigm adapted from Yu & Thompson (2024).

## Layout

- `data/` — cleaned experimental data (4 CSVs)
- `analysis/cogsci2026.qmd` — produces all stats and figures in the paper
- `experiment/` — Empirica project used to collect the data

## Reproduce the analysis

```
cd analysis
quarto render cogsci2026.qmd
```

Requires R (≥4.3), Quarto, and the packages `dplyr`, `ggplot2`, `ggthemes`, `lme4`, `lmerTest`, `emmeans`, `here`, `jsonlite`, `stringr`, `patchwork`.

## Re-run the experiment

```
cd experiment
empirica
```

The committed `experiment/.empirica/empirica.toml` ships with placeholder admin credentials (`changeme`); set a real password before any public deployment.
