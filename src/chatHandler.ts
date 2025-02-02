import { ContextMonitor } from './contextMonitor';

export class ChatHandler {
    async processResponse(response: string): Promise<string> {
        // Append context window information directly
        return await ContextMonitor.appendToResponse(response);
    }
}
