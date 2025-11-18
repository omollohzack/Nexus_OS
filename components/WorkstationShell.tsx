
import React from 'react';
import type { HardwareSpec } from '../types';
import { Profile } from '../types';
import { WORKSTATION_PROCESSES, AI_AGENTS } from '../constants';
import { ProcessManager } from './ProcessManager';
import { AIOSMonitor } from './AIOSMonitor';
import { AgentTerminal } from './AgentTerminal';
import { CpuIcon, GpuIcon, PowerIcon, RamIcon } from './icons';

interface WorkstationShellProps {
  hardware: HardwareSpec;
  onShutdown: () => void;
}

export const WorkstationShell: React.FC<WorkstationShellProps> = ({ hardware, onShutdown }) => {
  return (
    <div className="flex flex-col h-screen p-4 bg-slate-900 animate-fadeIn space-y-4">
      <header className="flex justify-between items-center border-b border-cyan-500/30 pb-2 flex-shrink-0">
        <h1 className="text-2xl font-bold text-cyan-400">Nexus OS // {Profile.Workstation}</h1>
        
        {/* Hardware Info Display */}
        <div className="hidden lg:flex items-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center" title="CPU Type"><CpuIcon className="w-5 h-5 mr-2 text-cyan-500"/> {hardware.cpu === 'high' ? 'High Performance' : 'Low Power'}</div>
            <div className="flex items-center" title="System RAM"><RamIcon className="w-5 h-5 mr-2 text-cyan-500"/> {hardware.ram} GB</div>
            <div className="flex items-center" title="GPU/NPU Status"><GpuIcon className="w-5 h-5 mr-2 text-cyan-500"/> {hardware.gpu ? 'Present' : 'Absent'}</div>
        </div>

        <button onClick={onShutdown} className="flex items-center text-sm text-red-400 hover:text-red-300">
          <PowerIcon className="w-4 h-4 mr-1" />
          Shutdown
        </button>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        <div className="lg:col-span-2 grid grid-rows-2 gap-4">
          <div className="row-span-1">
             <ProcessManager initialProcesses={WORKSTATION_PROCESSES} />
          </div>
          <div className="row-span-1">
            <AgentTerminal />
          </div>
        </div>
        <div className="lg:col-span-1">
          <AIOSMonitor initialAgents={AI_AGENTS} />
        </div>
      </main>
    </div>
  );
};
