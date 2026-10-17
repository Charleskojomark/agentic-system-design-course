import { ModuleData } from '../types';
import module1 from '../../content/modules/module-1.json';
import module2 from '../../content/modules/module-2.json';
import module3 from '../../content/modules/module-3.json';
import module4 from '../../content/modules/module-4.json';
import module5 from '../../content/modules/module-5.json';
import module6 from '../../content/modules/module-6.json';

export const MODULE_COLORS: Record<number, string> = {
  1: '#6366f1',
  2: '#10b981',
  3: '#f59e0b',
  4: '#f43f5e',
  5: '#06b6d4',
  6: '#8b5cf6',
};

export const courseData: ModuleData[] = [
  module1 as unknown as ModuleData,
  module2 as unknown as ModuleData,
  module3 as unknown as ModuleData,
  module4 as unknown as ModuleData,
  module5 as unknown as ModuleData,
  module6 as unknown as ModuleData,
];
