"""
Plot Radar <-> ADS-B Correlation Results
=========================================
Reads the per-experiment CSV produced by main.py and generates:
  1. Horizontal bar chart of Mahalanobis distances per pair (coloured by status)
  2. Scatter plot of mean distance vs average RCS
  3. Per-chunk breakdown table

Can be called standalone or imported into main.py.
"""

import os
import sys

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

GATE_THRESHOLD = 5.0

COLOUR_MATCH    = "#2ecc71"
COLOUR_REJECTED = "#e74c3c"


def plot_distance_bars(df: pd.DataFrame, experiment_name: str, ax: plt.Axes):
    """Horizontal bar chart: one bar per radar<->adsb pair, coloured by MATCH/REJECTED."""
    df_sorted = df.sort_values("mean_mahalanobis", ascending=True).reset_index(drop=True)

    # Label: radar ID -> aircraft type code
    labels = []
    for _, row in df_sorted.iterrows():
        a_type = row.get("adsb_type", "UNKN")
        if pd.isna(a_type):
            a_type = "UNKN"
        labels.append(f"R{row.radar_id} -> {a_type}")

    colours = [COLOUR_MATCH if s == "MATCH" else COLOUR_REJECTED for s in df_sorted["status"]]

    y_pos = np.arange(len(labels))
    ax.barh(y_pos, df_sorted["mean_mahalanobis"], color=colours, edgecolor="white", height=0.7)

    # Error bars showing min-max range
    xerr_low  = df_sorted["mean_mahalanobis"] - df_sorted["min_mahalanobis"]
    xerr_high = df_sorted["max_mahalanobis"] - df_sorted["mean_mahalanobis"]
    ax.errorbar(df_sorted["mean_mahalanobis"], y_pos,
                xerr=[xerr_low, xerr_high],
                fmt="none", ecolor="grey", elinewidth=0.8, capsize=2)

    ax.axvline(GATE_THRESHOLD, color="black", linestyle="--", linewidth=1, label=f"Gate = {GATE_THRESHOLD}")
    ax.set_yticks(y_pos)
    ax.set_yticklabels(labels, fontsize=8)
    ax.set_xlabel("Mean Mahalanobis Distance")
    ax.set_title(f"Correlation Distances - {experiment_name}")

    legend_handles = [
        mpatches.Patch(color=COLOUR_MATCH, label="MATCH"),
        mpatches.Patch(color=COLOUR_REJECTED, label="REJECTED"),
        plt.Line2D([0], [0], color="black", linestyle="--", label=f"Gate ({GATE_THRESHOLD})"),
    ]
    ax.legend(handles=legend_handles, loc="lower right", fontsize=8)
    ax.grid(axis="x", alpha=0.3)


def plot_distance_vs_rcs(df: pd.DataFrame, experiment_name: str, ax: plt.Axes):
    """Scatter: mean Mahalanobis vs average RCS, sized by n_pairs."""
    if "average_rcs" not in df.columns:
        ax.text(0.5, 0.5, "No RCS column found", transform=ax.transAxes, ha="center")
        return

    df_plot = df.dropna(subset=["average_rcs"]).copy()
    if df_plot.empty:
        ax.text(0.5, 0.5, "No valid RCS data", transform=ax.transAxes, ha="center")
        return

    colours = [COLOUR_MATCH if s == "MATCH" else COLOUR_REJECTED for s in df_plot["status"]]
    sizes = df_plot["n_pairs"].clip(lower=5) * 3

    ax.scatter(df_plot["average_rcs"], df_plot["mean_mahalanobis"],
               c=colours, s=sizes, alpha=0.75, edgecolors="white", linewidths=0.5)
    ax.axhline(GATE_THRESHOLD, color="black", linestyle="--", linewidth=1)
    ax.set_xlabel("Average RCS (dBsm)")
    ax.set_ylabel("Mean Mahalanobis Distance")
    ax.set_title(f"Distance vs RCS - {experiment_name}")
    ax.grid(alpha=0.3)

    for _, row in df_plot.iterrows():
        a_type = row.get("adsb_type", "UNKN")
        if pd.isna(a_type):
            a_type = "UNKN"
        ax.annotate(a_type, (row["average_rcs"], row["mean_mahalanobis"]),
                    fontsize=6, alpha=0.7, xytext=(4, 4), textcoords="offset points")


def plot_chunk_breakdown(df: pd.DataFrame, experiment_name: str, ax: plt.Axes):
    """Stacked bar chart: matches vs rejected per chunk."""
    chunks = df["chunk"].unique()
    match_counts  = []
    reject_counts = []
    for ch in chunks:
        sub = df[df["chunk"] == ch]
        match_counts.append((sub["status"] == "MATCH").sum())
        reject_counts.append((sub["status"] == "REJECTED").sum())

    x = np.arange(len(chunks))
    short_labels = [c.replace("rt_", "").replace("_tracks_chunk_", "\nchunk ") for c in chunks]

    ax.bar(x, match_counts, color=COLOUR_MATCH, label="MATCH")
    ax.bar(x, reject_counts, bottom=match_counts, color=COLOUR_REJECTED, label="REJECTED")
    ax.set_xticks(x)
    ax.set_xticklabels(short_labels, fontsize=7, rotation=0)
    ax.set_ylabel("Count")
    ax.set_title(f"Matches per Chunk - {experiment_name}")
    ax.legend(fontsize=8)
    ax.grid(axis="y", alpha=0.3)


def run_plot(experiment_name: str, csv_path: str = None):
    """Generates the correlation plots for a given experiment CSV."""
    if csv_path is None:
        csv_path = os.path.join(os.getcwd(), f"{experiment_name}_correlations.csv")

    if not os.path.isfile(csv_path):
        print(f"No results file found: {csv_path}")
        return

    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} rows from {csv_path} for plotting.")

    fig, axes = plt.subplots(1, 3, figsize=(20, max(6, len(df) * 0.35)))
    fig.suptitle(f"Radar <-> ADS-B Correlation: {experiment_name}", fontsize=14, fontweight="bold")

    plot_distance_bars(df, experiment_name, axes[0])
    plot_distance_vs_rcs(df, experiment_name, axes[1])
    plot_chunk_breakdown(df, experiment_name, axes[2])

    plt.tight_layout()

    out_path = os.path.join(os.getcwd(), f"{experiment_name}_correlations.png")
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    print(f"Plot saved to {out_path}")

    # plt.show() # Uncomment if you want interactive popups as well.


if __name__ == "__main__":
    EXPERIMENTS = ["2021_02_26_Key_West_FL_US_MHR"]
    for exp in EXPERIMENTS:
        run_plot(exp)