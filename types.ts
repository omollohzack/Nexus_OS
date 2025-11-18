
export interface HardwareSpec {
  cpu: 'low' | 'high';
  ram: number; // in GB
  gpu: boolean;
}

export enum Profile {
  UltraLight = 'Ultra-Light Profile',
  Workstation = 'Workstation Profile',
}

export interface OSProcess {
  pid: number;
  name: string;
  user: 'kernel' | 'system' | 'agent';
  cpu: string;
  mem: string;
  status: 'Running' | 'Killed';
}

export interface AIAgent {
  id: string;
  status: 'Idle' | 'Processing' | 'Waiting';
  resourceUsage: number;
}
