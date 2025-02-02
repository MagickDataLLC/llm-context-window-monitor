# LLM Context Window Monitor

A VS Code extension that monitors and displays the context window usage for Large Language Models in Cursor.

## Features

- Real-time context window usage monitoring in the status bar
- Support for multiple LLM models including GPT-4, Claude 3, and Gemini
- Visual progress bar showing context window utilization
- Automatic updates every 30 seconds
- Integration with chat responses to show context usage

## Installation

1. Download the VSIX file from the releases page
2. Install in VS Code using:
   ```bash
   code --install-extension llm-context-window-monitor-0.0.1.vsix
   ```

## Usage

The extension automatically activates when VS Code starts:
- Watch the status bar for real-time context window usage
- Use the chat interface to see context usage after each response
- Configure settings through VS Code's settings panel

## Configuration

Available settings:
- `cursor.chat.showContextWindow`: Enable/disable context window display after chat responses

## Development

```bash
git clone https://github.com/MagickDataLLC/llm-context-window-monitor.git
cd llm-context-window-monitor
npm install
code .
```

Press F5 to start debugging.

## License

MIT License - see LICENSE.md for details

## Support

Report issues on [GitHub](https://github.com/MagickDataLLC/llm-context-window-monitor/issues)
