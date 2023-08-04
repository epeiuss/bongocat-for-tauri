import { LogicalSize, WebviewWindow, appWindow } from '@tauri-apps/api/window';
import { routes } from '@/router';
import type { Path } from '@/types';
import { getWindowStore } from '@/store';

/**
 * 开启新窗口
 * @param url 窗口的路由地址
 */
export const openNewWindow = async (url: Path) => {
  const route = routes.find(({ path }) => path === url);

  if (!route) return;

  // 窗口 label
  const label = route.name;
  // 窗口 option
  const option = route.meta?.windowOption || {};

  // 查找是否存在窗口 存在就显示并获取焦点 不存在则新建
  const window = WebviewWindow.getByLabel(label);

  if (window) {
    window.show();
    window.setFocus();
  } else {
    const store = getWindowStore(label);
    const window = new WebviewWindow(label, {
      url,
      ...option,
      ...store.value
    });

    window.onResized(async () => {
      store.value = await getWindowInfo(window);
    });
    window.onMoved(async () => {
      store.value = await getWindowInfo(window);
    });
  }
};

/**
 * 最小化窗口
 */
export const minimizeWindow = () => appWindow.minimize();

/**
 * 关闭窗口
 */
export const closeWindow = () => {
  appWindow.close();
};

/**
 *
 * @param value 是否置顶
 */
export const setWindowOnTop = (value: boolean) =>
  appWindow.setAlwaysOnTop(value);

/**
 * 设置窗口大小
 * @param width 窗口宽度
 * @param height 窗口高度
 */
export const setWindowSize = (width: number, height: number) =>
  appWindow.setSize(new LogicalSize(width, height));

/**
 * 获取当前窗口的信息
 * @param currentWindow 当前窗口
 */
export async function getWindowInfo(currentWindow: WebviewWindow) {
  const scale = await currentWindow.scaleFactor();
  const position = await currentWindow.innerPosition();
  const real_position = position.toLogical(scale);
  const size = await currentWindow.innerSize();
  const real_size = size.toLogical(scale);

  return {
    width: real_size.width,
    height: real_size.height,
    x: real_position.x,
    y: real_position.y
  };
}
