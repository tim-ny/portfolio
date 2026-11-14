<script setup lang="ts">
const { theme, toggle } = useTheme()
</script>

<template>
  <nav class="mbar" aria-label="Sections">
    <a href="#about">About</a>
    <a href="#journey">Journey</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
    <button type="button" class="theme-toggle" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`" @click="toggle">
      <Icon :name="theme === 'dark' ? 'sun' : 'moon'" />
    </button>
  </nav>
</template>