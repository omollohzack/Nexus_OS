
import React from 'react';
import type { HardwareSpec } from '../types';
import { CpuIcon, RamIcon, GpuIcon, PowerIcon } from './icons';

interface HardwareSelectorProps {
  hardware: HardwareSpec;
  setHardware: React.Dispatch<React.SetStateAction<HardwareSpec>>;
  onBoot: () => void;
}

export const HardwareSelector: React.FC<HardwareSelectorProps> = ({ hardware, setHardware, onBoot }) => {
  const ramOptions = [2, 4, 8, 16, 32];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-cyan-500/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-400">NEXUS OS</h1>
          <p className="mt-2 text-slate-400">Adaptive Minimalism Engine</p>
        </div>

        <div className="space-y-6">
          {/* CPU Selection */}
          <div className="flex items-center space-x-4">
            <CpuIcon className="w-8 h-8 text-cyan-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300">CPU Type</label>
              <select
                value={hardware.cpu}
                onChange={(e) => setHardware({ ...hardware, cpu: e.target.value as 'low' | 'high' })}
                className="w-full p-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="low">Low Power Mobile</option>
                <option value="high">High Performance Desktop</option>
              </select>
            </div>
          </div>

          {/* RAM Selection */}
          <div className="flex items-center space-x-4">
            <RamIcon className="w-8 h-8 text-cyan-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300">Total System RAM</label>
              <select
                value={hardware.ram}
                onChange={(e) => setHardware({ ...hardware, ram: parseInt(e.target.value) })}
                className="w-full p-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              >
                {ramOptions.map(ram => <option key={ram} value={ram}>{ram} GB</option>)}
              </select>
            </div>
          </div>

          {/* GPU/NPU Selection */}
          <div className="flex items-center space-x-4">
            <GpuIcon className="w-8 h-8 text-cyan-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300">Dedicated GPU / NPU</label>
              <div className="flex items-center mt-2">
                <span className="mr-3 text-sm text-slate-400">Absent</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hardware.gpu}
                    onChange={(e) => setHardware({ ...hardware, gpu: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
                <span className="ml-3 text-sm text-cyan-400">Present</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onBoot}
          className="w-full flex items-center justify-center px-4 py-3 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
        >
          <PowerIcon className="w-6 h-6 mr-2" />
          Initiate Boot Sequence
        </button>
      </div>
    </div>
  );
};
