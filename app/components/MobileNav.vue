<script setup lang="ts">
import { onMounted, onBeforeUnmount, nextTick } from 'vue'

let raf: number | null = null
let observer: MutationObserver | null = null

const sync = () => {
  const mbar = document.querySelector<HTMLElement>('.mbar')
  const active = document.querySelector<HTMLElement>('.mbar a.on')
  const indicator = document.querySelector<HTMLElement>('.mbar-indicator')
  if (!mbar || !active || !indicator) return
  if (raf) cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const mRect = mbar.getBoundingClientRect()
    const aRect = active.getBoundingClientRect()
    indicator.style.left = `${Math.round(aRect.left - mRect.left)}px`
    indicator.style.width = `${Math.round(aRect.width)}px`
  })
}

const observe = () => {
  const mbar = document.querySelector<HTMLElement>('.mbar')
  if (!mbar) return
  observer = new MutationObserver(() => sync())
  observer.observe(mbar, { attributes: true, childList: true, subtree: true })
}

onMounted(() => {
  nextTick(() => {
    sync()
    observe()
  })
  window.addEventListener('resize', sync, { passive: true })
  window.addEventListener('scroll', sync, { passive: true })
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('resize', sync)
  window.removeEventListener('scroll', sync)
  observer?.disconnect()
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
  transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
  pointer-events: none;
}
</style>
