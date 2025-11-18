
import React from 'react';
import type { HardwareSpec } from '../types';
import { Profile } from '../types';
import { ULTRALIGHT_PROCESSES } from '../constants';
import { CpuIcon, RamIcon, GpuIcon, PowerIcon } from './icons';

interface UltraLightShellProps {
  hardware: HardwareSpec;
  onShutdown: () => void;
}

export const UltraLightShell: React.FC<UltraLightShellProps> = ({ hardware, onShutdown }) => {
  return (
    <div className="flex flex-col h-screen p-4 bg-slate-900 animate-fadeIn">
      <header className="flex justify-between items-center border-b border-cyan-500/30 pb-2 mb-4">
        <h1 className="text-2xl font-bold text-cyan-400">Nexus OS // {Profile.UltraLight}</h1>
        <button onClick={onShutdown} className="flex items-center text-sm text-red-400 hover:text-red-300">
          <PowerIcon className="w-4 h-4 mr-1" />
          Shutdown
        </button>
      </header>
      
      <main className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* System Info */}
        <div className="md:col-span-1 bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">System Hardware</h3>
            <div className="space-y-3 text-sm">
                <div className="flex items-center"><CpuIcon className="w-5 h-5 mr-3 text-cyan-500"/> CPU: {hardware.cpu === 'high' ? 'High Performance' : 'Low Power'}</div>
                <div className="flex items-center"><RamIcon className="w-5 h-5 mr-3 text-cyan-500"/> RAM: {hardware.ram} GB</div>
                <div className="flex items-center"><GpuIcon className="w-5 h-5 mr-3 text-cyan-500"/> GPU/NPU: {hardware.gpu ? 'Present' : 'Absent'}</div>
            </div>
        </div>
        
        {/* Process List */}
        <div className="md:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Running Processes</h3>
            <div className="flex-grow overflow-y-auto pr-2">
                 <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-600 text-slate-400">
                            <th className="p-1">PID</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">User</th>
                            <th className="p-1">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ULTRALIGHT_PROCESSES.map(p => (
                            <tr key={p.pid} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                <td className="p-1">{p.pid}</td>
                                <td className="p-1">{p.name}</td>
                                <td className="p-1">{p.user}</td>
                                <td className="p-1 text-green-400">{p.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 pt-4 mt-4 border-t border-cyan-500/30">
        Nexus OS v0.8.1 - Adaptive Minimalism Engine
      </footer>
    </div>
  );
};
