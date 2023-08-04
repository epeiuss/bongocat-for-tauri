import { invoke } from '@tauri-apps/api';
import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { getKeyPressImage } from '@/utils';
import type { Timeout } from '@/types';

export const useListener = () => {
  // 记录当前按下的键盘按键
  const keyPress = ref<string[]>([]);
  // 记录当前按下的键盘按键对应的图片
  const keyPressImage = ref<number[]>([]);
  //  记录当前按下的鼠标按键
  const mousePress = ref<string[]>([]);
  //  记录当前鼠标的位置
  const mousePosition = ref<number[]>([]);
  // 用于处理 CapsLock 键的定时器
  const listener = ref<UnlistenFn[]>([]);
  // 用于处理 CapsLock 键的定时器
  let timer: Timeout = null;

  /**
   * 处理键盘按下和抬起时候的数据
   * @param event 事件名称
   * @param payload 事件返回的参数
   */
  const handleKeyPress = (event: 'up' | 'down', payload: string) => {
    const imageKey = getKeyPressImage(payload);

    if (event === 'down') {
      keyPress.value.push(payload);

      keyPressImage.value.push(imageKey);
    } else {
      keyPress.value = keyPress.value.filter((item) => item !== payload);

      keyPressImage.value = keyPressImage.value.filter(
        (item) => item !== imageKey
      );
    }
  };

  /**
   * 监听按下和抬起
   * @param event 事件名称
   * @param payload 事件返回的参数
   */
  const pressListener = (event: 'up' | 'down', payload: any) => {
    const newPayload = payload as string;

    if (newPayload.match(/^[123]$/)) {
      if (event === 'down') {
        mousePress.value.push(newPayload);
      } else {
        mousePress.value = mousePress.value.filter(
          (item) => item !== newPayload
        );
      }
    } else if (newPayload === 'CapsLock') {
      // 此按键比较特殊，只返回一个动作，所以需要手动释放
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      handleKeyPress('down', newPayload);

      timer = setTimeout(() => {
        handleKeyPress('up', newPayload);
      }, 100);
    } else {
      handleKeyPress(event, newPayload);
    }
  };

  onMounted(async () => {
    invoke('start_bongo');

    listener.value.push(
      await listen('bongo-move', ({ payload }) => {
        mousePosition.value = payload as number[];
      }),

      await listen('bongo-down', ({ payload }) => {
        pressListener('down', payload);
      }),

      await listen('bongo-up', ({ payload }) => {
        pressListener('up', payload);
      })
    );
  });

  onBeforeUnmount(() => {
    invoke('stop_bongo');

    listener.value.forEach((item) => item());
  });

  return {
    keyPress,
    keyPressImage,
    mousePress,
    mousePosition
  };
};
