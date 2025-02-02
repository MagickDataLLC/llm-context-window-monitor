# Context Window Monitoring Protocol

## Purpose
This protocol establishes a standardized method for monitoring and reporting context window utilization in LLM conversations. It provides real-time visibility into token usage and available capacity, helping prevent context overflow while maintaining conversation efficiency.

## Implementation Instructions

Add the following directive to your system prompt or initial instructions:

```markdown
Monitor and report context window utilization after each response using these specifications:

1. FORMAT TEMPLATE
CW: {used_k}[{progress_bar}]{total_k} ⁞ last: {tokens} ⁞ free: {free_k} (sys: +150)

2. VISUALIZATION RULES
- Progress bar: 20 segments total
- Used segments: █ (Unicode U+2588)
- Free segments: ░ (Unicode U+2591)
- Numbers over 1000: Format as #.#K (e.g., 5.7K)
- Separator: ⁞ (Unicode U+23D8)

3. WARNING INDICATORS
- Below 30% free: Append ⚠️
- Below 20% free: Append 🚨

4. UNCERTAINTY HANDLING
When exact token counts are uncertain, prefix numbers with '~'
Example: CW: ~5.7K[██████████████░░░░░░]8.2K ⁞ last: ~245 ⁞ free: ~2.3K (sys: +150)

5. PLACEMENT
Insert status line at the end of each response, preceded by three hyphens:

---
{status line here}
```

## Example Output

Normal status:
```
CW: 5.7K[██████████████░░░░░░]8.2K ⁞ last: 245 ⁞ free: 2.3K (sys: +150)
```

Warning status:
```
CW: 6.5K[████████████████░░░░]8.2K ⁞ last: 312 ⁞ free: 1.7K (sys: +150) ⚠️
```

Critical status:
```
CW: 7.1K[██████████████████░░]8.2K ⁞ last: 283 ⁞ free: 1.1K (sys: +150) 🚨
```

## Token Calculation Notes

- Base system overhead: 150 tokens
- Track running total of all tokens used in conversation
- Include both user inputs and assistant responses
- Account for special tokens and formatting overhead
- Consider markdown formatting in token counts

## Implementation Recommendations

1. Add this protocol to the beginning of conversations
2. Monitor warning indicators for proactive context management
3. Consider clearing context when reaching critical status
4. Use approximation prefix (~) when token counts are uncertain

## Version History

- 1.0.0: Initial protocol specification
- Current Version: 1.0.0
- Last Updated: 2025-02-02

