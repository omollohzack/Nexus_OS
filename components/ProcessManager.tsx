
import React, { useState } from 'react';
import type { OSProcess } from '../types';

interface ProcessManagerProps {
    initialProcesses: OSProcess[];
}

export const ProcessManager: React.FC<ProcessManagerProps> = ({ initialProcesses }) => {
    const [processes, setProcesses] = useState<OSProcess[]>(initialProcesses);
    const [log, setLog] = useState<string>('');

    const handleProcessAction = (pid: number, action: 'kill' | 'restart') => {
        setProcesses(prev => prev.map(p => {
            if (p.pid === pid) {
                const newStatus = action === 'kill' ? 'Killed' : 'Running';
                setLog(`[IPC_KERNEL] Process '${p.name}' (${pid}) ${action} command received. Status: ${newStatus}. OK.`);
                return { ...p, status: newStatus };
            }
            return p;
        }));
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Process Manager</h3>
            <div className="flex-grow overflow-y-auto pr-2">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-600 text-slate-400">
                            <th className="p-1">PID</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">User</th>
                            <th className="p-1">CPU</th>
                            <th className="p-1">MEM</th>
                            <th className="p-1">Status</th>
                            <th className="p-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processes.map(p => (
                            <tr key={p.pid} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                <td className="p-1">{p.pid}</td>
                                <td className="p-1">{p.name}</td>
                                <td className="p-1">{p.user}</td>
                                <td className="p-1">{p.cpu}</td>
                                <td className="p-1">{p.mem}</td>
                                <td className={`p-1 ${p.status === 'Running' ? 'text-green-400' : 'text-red-400'}`}>{p.status}</td>
                                <td className="p-1">
                                    {p.name.includes('driver') && (
                                        p.status === 'Running' ? (
                                            <button onClick={() => handleProcessAction(p.pid, 'kill')} className="text-red-400 hover:text-red-300">Kill</button>
                                        ) : (
                                            <button onClick={() => handleProcessAction(p.pid, 'restart')} className="text-green-400 hover:text-green-300">Restart</button>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {log && <div className="mt-2 text-xs text-slate-400 border-t border-slate-700 pt-2">{log}</div>}
        </div>
    );
};
