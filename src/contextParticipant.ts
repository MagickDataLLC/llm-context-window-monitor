import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

// Update path to be relative to this file
const scriptPath = path.join(__dirname, 'calc_context_window.sh');

interface ContextPromptProps {
    userQuery: string;
}

class ContextPrompt {
    private props: ContextPromptProps;

    constructor(props: ContextPromptProps) {
        this.props = props;
    }

    async render(): Promise<string> {
        const { stdout } = await execAsync(`bash "${scriptPath}"`);

        return `
            system: You are an AI assistant. After each response, you will show the current context window usage.
            user: ${this.props.userQuery}
            system: Current context window usage:
            ${stdout}
        `;
    }
}

export function createContextParticipant(context: vscode.ExtensionContext) {
    const handler: vscode.ChatRequestHandler = async (
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ) => {
        const prompt = new ContextPrompt({ userQuery: request.prompt });
        const promptText = await prompt.render();

        return {
            response: promptText,
            errorDetails: undefined
        };
    };

    const participant = vscode.chat.createChatParticipant('llm-context-window-monitor', handler);
    participant.iconPath = new vscode.ThemeIcon('symbol-keyword');

    return participant;
}
