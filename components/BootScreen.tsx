
import React, { useState, useEffect } from 'react';
import type { HardwareSpec } from '../types';
import { Profile } from '../types';

interface BootScreenProps {
  hardware: HardwareSpec;
  onBootComplete: (profile: Profile) => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ hardware, onBootComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const determinedProfile = (hardware.ram > 8 && hardware.gpu) ? Profile.Workstation : Profile.UltraLight;

    const bootSequence = [
      "Nexus OS Bootloader v1.0",
      "Initializing HAL...",
      `[HAL] CPU Detected: ${hardware.cpu === 'high' ? 'High Performance' : 'Low Power'} Core`,
      `[HAL] System RAM: ${hardware.ram}GB`,
      `[HAL] GPU/NPU: ${hardware.gpu ? 'Present' : 'Absent'}`,
      "Loading Microkernel...",
      "[KERNEL] Nexus Kernel v0.8.1 loaded. Image size: 7.8MB. OK.",
      "[KERNEL] Initializing memory management...",
      "[KERNEL] Starting IPC manager...",
      "Executing Nexus Core Scanner (NCS)...",
      "[NCS] Deep Hardware Triage initiated.",
      "[NCS] Analysis complete.",
      `[NCS] Generating manifest for detected hardware profile: ${determinedProfile}`,
      "[NCS] Manifest generated.",
      "Initializing dynamic module loader...",
      `[LOADER] Loading graphical shell for profile: ${determinedProfile}`,
      "Starting sandbox framework...",
      `[SANDBOX] Security context established.`,
      determinedProfile === Profile.Workstation ? "[AIOS] Loading AI Agent System services..." : "Skipping AIOS module loading.",
      "Boot sequence complete. Launching shell...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => onBootComplete(determinedProfile), 1000);
      }
    }, 200);

    const dotInterval = setInterval(() => {
        setDots(d => d.length >= 3 ? '' : d + '.');
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(dotInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware, onBootComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl font-mono text-sm">
        {logs.filter(log => typeof log === 'string').map((log, index) => (
          <div key={index} className="flex">
            <span className="text-cyan-400 mr-2">{log.startsWith('[') ? '' : '>'}</span>
            <p className={log.includes('OK') ? 'text-green-400' : 'text-slate-300'}>{log}</p>
          </div>
        ))}
        <div className="flex">
            <span className="text-cyan-400 mr-2">&gt;</span>
            <p>{dots}</p>
        </div>
      </div>
    </div>
  );
};
