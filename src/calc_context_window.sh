#!/bin/bash

# Configuration
total_tokens=8192
used_tokens=5734
last_action=245
sys_overhead=150

# Model context window configurations
declare -A model_contexts
model_contexts=(
    ["gpt4"]=32768
    ["gpt4-turbo"]=128000
    ["gpt4-turbo-vision"]=128000
    ["gpt4o"]=128000
    ["claude3-haiku"]=200000
    ["claude3-sonnet"]=200000
    ["claude3-opus"]=200000
    ["gemini15"]=128000
    ["llama3"]=32000
    ["command-r"]=128000
    ["gpt4o-mini"]=8192
    ["o1-mini"]=32768
    ["deepseek-r1"]=8192
    ["gemini-ultra"]=1000000
)

# Model aliases mapping to standardized names
declare -A model_aliases
model_aliases=(
    ["claude-3-sonnet"]="claude3-sonnet"
    ["claude-3.5-sonnet"]="claude3-sonnet"
    ["claude-3.5-sonnet-20241022"]="claude3-sonnet"
    ["gpt-4"]="gpt4"
    ["gpt-4-turbo"]="gpt4-turbo"
    ["gpt-4-vision"]="gpt4-turbo-vision"
    ["gpt4-vision"]="gpt4-turbo-vision"
    ["gemini-1.5"]="gemini15"
    ["gemini-1.5-pro"]="gemini15"
    ["command-nightly"]="command-r"
)

# Get current model from environment variable or default to claude3-sonnet
raw_model=${CURSOR_LLM:-"claude3-sonnet"}
current_model=${model_aliases[$raw_model]:-$raw_model}
total_tokens=${model_contexts[$current_model]}

# Calculate derived values
free_tokens=$((total_tokens - used_tokens))
danger_threshold=$((total_tokens / 5))   # 20% of total
warning_threshold=$((total_tokens * 3 / 10))  # 30% of total

# Function to format numbers to K format
format_k() {
    awk -v n=$1 'BEGIN { printf "%.1fK", n/1000 }'
}

# Generate 20-segment progress bar
used_segments=$((used_tokens * 20 / total_tokens))
progress_bar=""
for ((i=0; i<20; i++)); do
    if [ $i -lt $used_segments ]; then
        progress_bar+="█"
    else
        progress_bar+="░"
    fi
done

# Set color based on threshold
if [ "$free_tokens" -lt "$danger_threshold" ]; then
    color="\033[31m"  # red
elif [ "$free_tokens" -lt "$warning_threshold" ]; then
    color="\033[33m"  # yellow
else
    color="\033[32m"  # green
fi

# Format the display numbers
used_k=$(format_k $used_tokens)
total_k=$(format_k $total_tokens)
free_k=$(format_k $free_tokens)

# Construct and output the status line
echo -e "CW: ${used_k}[${progress_bar:0:$used_segments}${color}${progress_bar:$used_segments}${NC}]${total_k} ⁞ last: ${last_action} ⁞ free: ${free_k} (sys: ${sys_overhead})"
