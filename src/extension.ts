import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createContextParticipant } from './contextParticipant';
import * as path from 'path';

const execAsync = promisify(exec);

// Update script path
const scriptPath = path.join(__dirname, 'calc_context_window.sh');

export function activate(context: vscode.ExtensionContext) {
    const participant = createContextParticipant(context);
    context.subscriptions.push(participant);

    // Keep the status bar functionality
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );

    async function updateStatusBar() {
        try {
            const { stdout } = await execAsync('bash ./calc_context_window.sh');
            statusBarItem.text = `$(symbol-keyword) ${stdout}`;
            statusBarItem.show();
        } catch (error) {
            statusBarItem.hide();
        }
    }

    setInterval(updateStatusBar, 30000);
    updateStatusBar();

    context.subscriptions.push(statusBarItem);
}

export function deactivate() {}
