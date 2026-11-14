<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let raf: number | null = null

const sync = () => {
  const active = document.querySelector<HTMLElement>('.mbar a.on')
  const indicator = document.querySelector<HTMLElement>('.mbar-indicator')
  if (!active || !indicator) return
  if (raf) cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    indicator.style.left = `${Math.round(active.offsetLeft)}px`
    indicator.style.width = `${Math.round(active.offsetWidth)}px`
  })
}

onMounted(() => {
  sync()
  window.addEventListener('resize', sync)
  window.addEventListener('scroll', sync, { passive: true })
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('resize', sync)
  window.removeEventListener('scroll', sync)
})
</script>

<template>
  <nav class="mbar" aria-label="Sections">
    <a href="#about">About</a>
    <a href="#journey">Journey</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
    <span class="mbar-indicator" />
  </nav>
</template>

<style scoped>
.mbar-indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 0;
  background: var(--accent);
  border-radius: 2px;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}
</style>
