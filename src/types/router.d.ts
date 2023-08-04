import type { RouteRecordRaw } from 'vue-router';
import type { WindowOptions } from '@tauri-apps/api/window';
import type { Rewrite } from '.';

export type Path = '/home' | '/cat';

export type Route = Rewrite<
  RouteRecordRaw,
  {
    path: Path;
    name: string;
    meta?: {
      windowOption?: WindowOptions;
      [key: string]: any;
    };
  }
>;
