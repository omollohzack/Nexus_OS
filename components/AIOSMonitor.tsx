
import React, { useState, useEffect } from 'react';
import type { AIAgent } from '../types';

interface AIOSMonitorProps {
    initialAgents: AIAgent[];
}

export const AIOSMonitor: React.FC<AIOSMonitorProps> = ({ initialAgents }) => {
    const [agents, setAgents] = useState<AIAgent[]>(initialAgents);

    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prevAgents => {
                const activeAgentIndex = Math.random() > 0.5 ? 0 : 1;
                const otherAgentStatus = Math.random() > 0.3 ? 'Waiting' : 'Idle';
                return prevAgents.map((agent, index) => {
                    if (index === activeAgentIndex) {
                        return { ...agent, status: 'Processing', resourceUsage: Math.floor(Math.random() * 50) + 50 };
                    }
                    return { ...agent, status: otherAgentStatus, resourceUsage: otherAgentStatus === 'Waiting' ? Math.floor(Math.random() * 10) : 0 };
                });
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const totalUsage = agents.reduce((acc, agent) => acc + agent.resourceUsage, 0);

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">AIOS Monitor</h3>
            <p className="text-xs text-slate-400 mb-4">Native Agent Scheduling (LLM)</p>
            
            <div className="mb-4">
                <p className="text-sm">Shared AI Accelerator Resource</p>
                <div className="w-full bg-slate-700 rounded-full h-2.5 mt-1">
                    <div 
                        className="bg-purple-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(totalUsage, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-right text-slate-400">{Math.min(totalUsage, 100)}% Utilization</p>
            </div>

            <div className="space-y-4">
                {agents.map(agent => (
                    <div key={agent.id}>
                        <div className="flex justify-between items-center text-sm">
                            <span>{agent.id}</span>
                            <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${
                                    agent.status === 'Processing' ? 'bg-purple-400 animate-pulse' :
                                    agent.status === 'Waiting' ? 'bg-yellow-400' :
                                    'bg-slate-500'
                                }`}></span>
                                <span className={
                                    agent.status === 'Processing' ? 'text-purple-400' :
                                    agent.status === 'Waiting' ? 'text-yellow-400' :
                                    'text-slate-400'
                                }>{agent.status}</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                            <div 
                                className="bg-purple-400 h-1.5 rounded-full transition-all duration-500" 
                                style={{ width: `${agent.resourceUsage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
