
import React, { useState, useCallback } from 'react';
import { GrubMenu } from './components/GrubMenu';
import { BootScreen } from './components/BootScreen';
import { UltraLightShell } from './components/UltraLightShell';
import { WorkstationShell } from './components/WorkstationShell';
import type { HardwareSpec } from './types';
import { Profile } from './types';

type AppState = 'CONFIG' | 'BOOTING' | 'RUNNING';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('CONFIG');
  const [hardware, setHardware] = useState<HardwareSpec | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleGrubSelection = useCallback((selectedHardware: HardwareSpec) => {
    setHardware(selectedHardware);
    setAppState('BOOTING');
  }, []);

  const handleBootComplete = useCallback((determinedProfile: Profile) => {
    setProfile(determinedProfile);
    setAppState('RUNNING');
  }, []);

  const handleShutdown = useCallback(() => {
    setProfile(null);
    setHardware(null);
    setAppState('CONFIG');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'CONFIG':
        return <GrubMenu onSelectBootEntry={handleGrubSelection} />;
      case 'BOOTING':
        if (!hardware) {
            return <div>Error: Hardware not selected. <button onClick={handleShutdown}>Reset</button></div>;
        }
        return <BootScreen hardware={hardware} onBootComplete={handleBootComplete} />;
      case 'RUNNING':
        if (!hardware) {
             return <div>Error: Hardware not selected. <button onClick={handleShutdown}>Reset</button></div>;
        }
        if (profile === Profile.Workstation) {
          return <WorkstationShell hardware={hardware} onShutdown={handleShutdown} />;
        }
        if (profile === Profile.UltraLight) {
          return <UltraLightShell hardware={hardware} onShutdown={handleShutdown} />;
        }
        // Fallback in case profile is not set
        return <div>Error: Profile not determined. <button onClick={handleShutdown}>Reset</button></div>;
      default:
        return <div>Invalid State</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-mono">
      {renderContent()}
    </div>
  );
};

export default App;
