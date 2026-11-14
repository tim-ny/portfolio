<script setup lang="ts">
const { data: site } = await useSiteSettings()
const { data: socials } = await useSocials()
const { theme, toggle } = useTheme()

const firstName = computed(() => site.value?.name?.split(' ')[0] ?? '')
const lastName = computed(() => site.value?.name?.split(' ').slice(1).join(' ') ?? '')
</script>

<template>
  <aside>
    <div>
      <h1 v-if="site">{{ firstName }}<br>{{ lastName }}</h1>
      <h2 v-if="site">{{ site.role }}</h2>
      <p class="loc" v-if="site">{{ site.location }}</p>
      <p v-if="site">{{ site.headline }}</p>
      <ul class="nav" aria-label="Sections">
        <li><a href="#about">About</a></li>
        <li><a href="#journey">Journey</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div class="cta-row">
        <a class="btn" href="/resume.pdf" download="Tim_Resume.pdf">
          <Icon name="download" /> Resume
        </a>
        <button type="button" class="theme-toggle" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`" @click="toggle">
          <Icon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
      </div>
    </div>
    <ul class="social">
      <li v-for="s in socials" :key="s.label">
        <a :href="s.url" :rel="s.url.startsWith('http') ? 'noopener' : undefined" class="social-link">
          <Icon v-if="s.label.toLowerCase().includes('github')" name="github" />
          <Icon v-else-if="s.label.toLowerCase().includes('instagram')" name="instagram" />
          <Icon v-else-if="s.label.toLowerCase().includes('linkedin')" name="linkedin" />
          <Icon v-else-if="s.label.toLowerCase().includes('email') || s.url.startsWith('mailto:')" name="mail" />
          <Icon v-else-if="s.label.toLowerCase().includes('whatsapp') || s.url.includes('wa.me')" name="whatsapp" />
          <Icon v-else name="link" />
          <span class="social-label">{{ s.label }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>

.cta-row { display: flex; align-items: center; gap: .8rem; margin-top: 2rem; }
.btn {
  display: inline-flex; align-items: center; gap: .45rem;
  padding: .6rem 1.1rem; border-radius: 999px; border: 1px solid var(--edge);
  background: var(--hover); color: var(--head); font-weight: 500; font-size: .9rem;
  transition: background .2s, border-color .2s, transform .2s;
}
.btn:hover { background: var(--accent); color: var(--on-accent); border-color: var(--accent); transform: translateY(-2px); }
.theme-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.3rem; height: 2.3rem; border-radius: 999px; border: 1px solid var(--edge);
  background: var(--hover); color: var(--head); cursor: pointer; transition: background .2s, border-color .2s;
}
.theme-toggle:hover { border-color: var(--accent); color: var(--accent); }
.social-link { display: inline-flex; align-items: center; gap: .45rem; }
.social a .icon { transition: transform .25s cubic-bezier(.2,.8,.2,1), filter .25s; }
.social a:hover .icon { transform: scale(1.3) rotate(-8deg); filter: brightness(1.15) saturate(1.2); }
@media (max-width: 1000px) {
  .social-label { display: none; }
  .social a { justify-content: center; }
}
</style>