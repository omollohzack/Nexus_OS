
import React, { useState, useRef, useEffect } from 'react';

export const AgentTerminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<{ type: 'in' | 'out'; text: string }[]>([]);
    const [vectorMemory, setVectorMemory] = useState<Record<string, string>>({});
    const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);
    
    const handleCommand = (command: string) => {
        const newHistory = [...history, { type: 'in' as 'in', text: command }];
        const [cmd, ...args] = command.split(/\s*\(\s*['"]?|['"]?\s*\)\s*$/).filter(Boolean);
        const arg = args.join(' ');

        let output = '';

        switch (cmd) {
            case 'request_contextual_data':
                output = `[TOOL_MANAGER_SECURE_API] Contextual data request approved. Vector query sent for: "${arg}"`;
                break;
            case 'execute_safe_command':
                output = `[TOOL_MANAGER_SECURE_API] Command execution approved. ID: ${arg}`;
                break;
            case 'log_context':
                setVectorMemory(prev => ({ ...prev, [arg.toLowerCase()]: arg }));
                output = `[VECTOR_MEM] Data logged: "${arg}"`;
                break;
            case 'search_context':
                const result = Object.values(vectorMemory).find(v => v.toLowerCase().includes(arg.toLowerCase()));
                output = `[VECTOR_MEM] Similarity search result for "${arg}": ${result ? `'${result}'` : 'Not Found'}`;
                break;
            case 'help':
                output = `Available commands:\n` +
                         `  request_contextual_data("query")\n` +
                         `  execute_safe_command("ID")\n` +
                         `  log_context("data")\n` +
                         `  search_context("query")\n` +
                         `  clear`;
                break;
            case 'clear':
                setHistory([]);
                return;
            default:
                output = `[SANDBOX_VIOLATION] Command rejected by Tool Manager. Unknown command: '${cmd}'. Type 'help' for available commands.`;
        }
        setHistory([...newHistory, { type: 'out', text: output }]);
    };
    
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            handleCommand(input.trim());
            setInput('');
        }
    };

    return (
        <div className="bg-slate-900/70 border border-slate-700 rounded-lg p-4 h-full flex flex-col font-mono">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Agent Terminal</h3>
            <div className="flex-grow overflow-y-auto text-xs pr-2">
                {history.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                        {line.type === 'in' ? (
                            <div className="flex">
                                <span className="text-cyan-400 mr-2">$</span>
                                <p className="text-slate-300">{line.text}</p>
                            </div>
                        ) : (
                            <p className={line.text.startsWith('[SANDBOX') ? 'text-red-400' : 'text-slate-400'}>{line.text}</p>
                        )}
                    </div>
                ))}
                <div ref={endOfHistoryRef} />
            </div>
            <div className="flex items-center mt-2 border-t border-slate-700 pt-2">
                <span className="text-cyan-400 mr-2">$</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent text-slate-300 focus:outline-none"
                    placeholder="Type agent command..."
                    autoFocus
                />
            </div>
        </div>
    );
};
