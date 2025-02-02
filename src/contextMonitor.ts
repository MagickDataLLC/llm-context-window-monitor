import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

export class ContextMonitor {
    private static async getContextInfo(): Promise<string> {
        try {
            const scriptPath = path.join(__dirname, '..', 'calc_context_window.sh');
            const { stdout } = await execAsync(`bash "${scriptPath}"`);
            return `\n\n---\n${stdout.trim()}\n`;
        } catch (error) {
            return '\n\n---\nFailed to get context window information';
        }
    }

    static async appendToResponse(response: string): Promise<string> {
        const contextInfo = await this.getContextInfo();
        return response + contextInfo;
    }
}
