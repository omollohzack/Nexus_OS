
import type { HardwareSpec, OSProcess, AIAgent } from './types';

export const INITIAL_HARDWARE: HardwareSpec = {
  cpu: 'low',
  ram: 4,
  gpu: false,
};

export const WORKSTATION_PROCESSES: OSProcess[] = [
  { pid: 1, name: 'nexus.kernel', user: 'kernel', cpu: '0.1%', mem: '7.8MB', status: 'Running' },
  { pid: 101, name: 'ncs.service', user: 'system', cpu: '0.5%', mem: '12.3MB', status: 'Running' },
  { pid: 102, name: 'ipc_manager', user: 'kernel', cpu: '0.2%', mem: '4.1MB', status: 'Running' },
  { pid: 105, name: 'gui_shell_ws', user: 'system', cpu: '2.3%', mem: '128.5MB', status: 'Running' },
  { pid: 210, name: 'nv_gpu_driver.sys', user: 'system', cpu: '1.1%', mem: '45.2MB', status: 'Running' },
  { pid: 301, name: 'aios.scheduler', user: 'system', cpu: '3.5%', mem: '98.0MB', status: 'Running' },
  { pid: 302, name: 'tool_manager.api', user: 'system', cpu: '0.8%', mem: '33.1MB', status: 'Running' },
  { pid: 303, name: 'vector_mem.fs', user: 'system', cpu: '0.4%', mem: '64.7MB', status: 'Running' },
];

export const ULTRALIGHT_PROCESSES: OSProcess[] = [
    { pid: 1, name: 'nexus.kernel', user: 'kernel', cpu: '0.1%', mem: '7.8MB', status: 'Running' },
    { pid: 101, name: 'ncs.service', user: 'system', cpu: '0.2%', mem: '8.1MB', status: 'Running' },
    { pid: 102, name: 'ipc_manager', user: 'kernel', cpu: '0.1%', mem: '2.5MB', status: 'Running' },
    { pid: 105, name: 'gui_shell_ul', user: 'system', cpu: '0.9%', mem: '32.6MB', status: 'Running' },
];

export const AI_AGENTS: AIAgent[] = [
  { id: 'Agent_Cognito_01', status: 'Idle', resourceUsage: 0 },
  { id: 'Agent_Synth_02', status: 'Idle', resourceUsage: 0 },
];
