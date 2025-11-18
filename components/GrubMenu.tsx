
import React, { useState, useEffect, useCallback } from 'react';
import type { HardwareSpec } from '../types';

interface GrubMenuProps {
  onSelectBootEntry: (hardware: HardwareSpec) => void;
}

const bootOptions = [
  { 
    name: 'Nexus OS v0.8.1 (Workstation Profile)', 
    description: 'High Performance, GPU/NPU Enabled, AIOS Active',
    hardware: { cpu: 'high', ram: 16, gpu: true } as HardwareSpec
  },
  { 
    name: 'Nexus OS v0.8.1 (Ultra-Light Profile)', 
    description: 'Low Power, Minimal Footprint, AIOS Disabled',
    hardware: { cpu: 'low', ram: 4, gpu: false } as HardwareSpec
  },
  {
    name: 'Memory Test',
    description: 'Run system memory diagnostics (memtest86+)',
    hardware: null
  }
];

const MemoryTest: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                return p + 1;
            });
        }, 50);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="bg-blue-900 text-white p-4 h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">memtest86+ v5.01</h2>
            <div className="w-full max-w-2xl mt-4 border-2 border-white p-1">
                <div className="bg-blue-500 h-6" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="mt-2">Pass {progress}% - Testing: 16384M - OK</p>
            {progress === 100 && <p className="mt-4 animate-pulse">Test complete. No errors found. Rebooting in 1s...</p>}
        </div>
    );
};


export const GrubMenu: React.FC<GrubMenuProps> = ({ onSelectBootEntry }) => {
  const [selected, setSelected] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [showMemtest, setShowMemtest] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setCountdown(10); // Reset countdown on keypress
    if (e.key === 'ArrowUp') {
      setSelected(prev => (prev > 0 ? prev - 1 : bootOptions.length - 1));
    } else if (e.key === 'ArrowDown') {
      setSelected(prev => (prev < bootOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Enter') {
      const option = bootOptions[selected];
      if(option.hardware) {
        onSelectBootEntry(option.hardware);
      } else {
        setShowMemtest(true);
      }
    }
  }, [selected, onSelectBootEntry]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          const defaultOption = bootOptions[0]; // Boot default
          if(defaultOption.hardware) onSelectBootEntry(defaultOption.hardware);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timer);
    };
  }, [handleKeyDown, onSelectBootEntry]);
  
  if (showMemtest) {
      return <MemoryTest onComplete={() => setShowMemtest(false)} />;
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl border-2 border-gray-500 p-2">
        <div className="bg-[#0000AA] text-white text-center font-bold">
          GNU GRUB version 2.02
        </div>
        <div className="p-4 space-y-2">
          {bootOptions.map((option, index) => (
            <div
              key={option.name}
              className={`p-1 ${selected === index ? 'bg-white text-black' : ''}`}
            >
              {option.name}
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-500 p-2 text-sm">
          <p>
            Use the <span className="bg-gray-700 p-0.5 rounded-sm">↑</span> and <span className="bg-gray-700 p-0.5 rounded-sm">↓</span> keys to select which entry is highlighted.
          </p>
          <p>
            Press enter to boot the selected OS, or 'e' to edit the commands before booting.
          </p>
          <div className="mt-2">
            The selected entry will be started automatically in <span className="font-bold">{countdown}</span> seconds.
          </div>
          <div className="mt-4 text-xs text-gray-400">
            <h3 className="font-bold text-white">Description:</h3>
            <p>{bootOptions[selected].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
