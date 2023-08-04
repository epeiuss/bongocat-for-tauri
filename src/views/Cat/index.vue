<script setup lang="ts">
import { useListener } from '@/hooks';

const { keyPressImage, mousePress, mousePosition } = useListener();

const catRef = ref<HTMLDivElement | null>(null);
const mouseRef = ref();

// 上一次窗口鼠标的位置
const position = reactive<{ x: number; y: number }>({ x: 0, y: 0 });
// 映射到鼠标垫上的位置
const mapPosition = reactive<{ x: number; y: number }>({ x: 0, y: 0 });

const transformStyle = computed(() => {
  return {
    left: `${mapPosition.x}px`,
    top: `${mapPosition.y}px`
  };
});

/**
 * 设置可拖拽属性
 * @param element 元素
 */
const setDrag = (element: HTMLElement) => {
  element.setAttribute('data-tauri-drag-region', '');
};

onMounted(async () => {
  if (!catRef.value) return;

  setDrag(catRef.value);

  catRef.value.querySelectorAll('*').forEach((element) => {
    setDrag(element as HTMLElement);
  });
});

watch(
  mousePosition,
  async (newValue) => {
    if (!mouseRef.value) return;

    const [newX, newY] = newValue;

    const { x, y } = position;

    const diffX = newX - x;
    const diffY = newY - y;

    if (Math.abs(diffX) < 50 && Math.abs(diffY) < 50) return;

    position.x = newX;
    position.y = newY;

    const mouseRect = mouseRef.value.getBoundingClientRect();
    const { width, height } = await window.screen;

    const smallX = (diffX * mouseRect.width) / width;
    const smallY = (diffY * mouseRect.height) / height;

    const angle = -155; // 旋转角度
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    mapPosition.x = smallX * cos - smallY * sin;
    mapPosition.y = smallX * sin + smallY * cos;
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div ref="catRef" class="cat background relative h-screen overflow-hidden">
    <!-- mouse -->
    <div class="abs" ref="mouseRef">
      <!-- mouse -->
      <div
        class="background abs"
        style="background-image: url(src/assets/image/cat/mouse.png)"
        :style="transformStyle"
      ></div>
      <!-- hand -->
      <!-- <div
        class="background abs"
        style="background-image: url(src/assets/image/cat/mouse-hand.png)"
        :style="transformStyle"
      ></div> -->
      <div
        class="background abs"
        style="background-image: url(src/assets/image/cat/rightup.png)"
      ></div>
      <!-- mouse-press -->
      <template v-if="mousePress.length">
        <div
          v-for="item of 3"
          class="background abs"
          :style="{
            backgroundImage: `url(src/assets/image/mouse/${item}.png)`,
            ...transformStyle
          }"
          :key="item"
          v-show="mousePress.includes(String(item))"
        ></div>
      </template>
    </div>

    <!-- keyboard-up-hand -->
    <div
      class="background abs"
      style="background-image: url('src/assets/image/cat/keyboard-hand.png')"
      v-show="!keyPressImage.length"
    ></div>

    <!-- keyboard -->
    <div
      v-for="(_, index) of 50"
      :key="index"
      class="background abs"
      :style="{
        'background-image': `url(src/assets/image/keyboard/${index}.png)`
      }"
      v-show="keyPressImage.includes(index)"
    />

    <!-- keyboard-down-hand -->
    <div
      v-for="(_, index) in 50"
      :key="index"
      class="background abs"
      :style="{
        'background-image': `url(src/assets/image/keyboard-hand/${index}.png)`
      }"
      v-show="keyPressImage.at(-1) === index"
    />
  </div>
</template>

<style scoped lang="scss">
.cat {
  background-image: url('@/assets/image/cat/desktop.png'),
    url('@/assets/image/cat/cat.png');
}

.background {
  @apply bg-contain bg-no-repeat;
}

.abs {
  @apply absolute top-0 left-0 h-full w-full;
}
</style>
