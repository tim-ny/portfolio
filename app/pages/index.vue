<script setup lang="ts">
import { ref, reactive } from 'vue'

usePortfolioEffects()

const { data: site } = await useSiteSettings()
const { data: experience } = await useExperience()
const { data: skills } = await useSkills()
const { data: projects } = await useProjects()

const { data: aboutPage } = await useAsyncData('about-page', () =>
  queryCollection('pages').path('/pages/about').first()
)

const contactEmail = computed(() => site.value?.email ?? '')

const name = ref('')
const email = ref('')
const message = ref('')
const errors = reactive({ name: '', email: '', message: '' })

function validateField(field: 'name' | 'email' | 'message') {
  if (field === 'name') {
    const v = name.value.trim()
    if (!v) errors.name = 'Please enter your name.'
    else if (v.length < 2) errors.name = 'Name must be at least 2 characters.'
    else if (v.length > 60) errors.name = 'Name must be under 60 characters.'
    else errors.name = ''
  }
  if (field === 'email') {
    const v = email.value.trim()
    if (!v) errors.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors.email = 'Please enter a valid email address.'
    else errors.email = ''
  }
  if (field === 'message') {
    const v = message.value.trim()
    if (!v) errors.message = 'Please enter a message.'
    else if (v.length < 10) errors.message = 'Message must be at least 10 characters.'
    else if (v.length > 1000) errors.message = 'Message must be under 1000 characters.'
    else errors.message = ''
  }
}

function validateAll() {
  validateField('name')
  validateField('email')
  validateField('message')
  return !errors.name && !errors.email && !errors.message
}

function onSubmit(e: Event) {
  e.preventDefault()
  if (!validateAll()) return
  const mail = contactEmail.value
  location.href =
    'mailto:' + mail +
    '?subject=' + encodeURIComponent('Hello from ' + name.value.trim()) +
    '&body=' + encodeURIComponent(message.value.trim() + '\n\n' + name.value.trim() + ' (' + email.value.trim() + ')')
}

useHead(() => ({
  title: site.value ? `${site.value.name} · ${site.value.role}` : 'Portfolio',
  meta: [
    { name: 'description', content: site.value?.headline ?? '' },
  ],
}))
</script>

<template>
  <div>
    <AmbientBackground />
    <MobileNav />
    <div class="layout">
      <SiteSidebar />
      <main id="main">

        <!-- About -->
        <section id="about" class="reveal">
          <h2>About</h2>
          <div v-if="aboutPage" class="prose">
            <ContentRenderer :value="aboutPage" />
          </div>
          <template v-else>
            <p v-for="(para, i) in site?.about" :key="i">{{ para }}</p>
          </template>
        </section>

        <!-- Journey -->
        <section id="journey" class="reveal">
          <h2>Journey</h2>
          <div class="story items" id="story"><i></i>
            <article v-for="e in experience" :key="e.company + e.period" class="item">
              <div class="when">{{ e.period }}</div>
              <div>
                <h3>{{ e.role }} · {{ e.company }}</h3>
                <ul>
                  <li v-for="b in e.bullets" :key="b">{{ b }}</li>
                </ul>
                <ul class="tags">
                  <li v-for="t in e.tags" :key="t">{{ t }}</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <!-- Skills -->
        <section id="skills" class="reveal">
          <h2>Skills</h2>
          <dl class="skills">
            <div v-for="g in skills" :key="g.category">
              <dt>{{ g.category }}</dt>
              <dd>{{ g.items.join(', ') }}</dd>
            </div>
          </dl>
        </section>

        <!-- Projects -->
        <section id="projects" class="reveal">
          <h2>Projects</h2>
          <div class="items">
            <component
              :is="p.url ? 'a' : 'article'"
              v-for="p in projects"
              :key="p.title"
              class="item project-card"
              :href="p.url || undefined"
              :target="p.url ? '_blank' : undefined"
              :rel="p.url ? 'noopener' : undefined"
            >
              <img :src="p.image || '/project-placeholder.svg'" :alt="p.title" class="project-image" loading="lazy" />
              <div class="project-text">
                <h3>
                  {{ p.title }} <span class="arrow">↗</span>
                </h3>
                <p>{{ p.description }}</p>
                <ul class="tags">
                  <li v-for="t in p.tags" :key="t">{{ t }}</li>
                </ul>
              </div>
            </component>
          </div>
          <p class="note">Add a link to each project in its content file when you have one.</p>
        </section>

        <!-- Contact -->
        <section id="contact" class="reveal">
          <h2>Contact</h2>
          <p>Have a project, a role or a question? I'd like to hear about it.</p>
          <p style="margin-top: 1.4rem">
            <a class="mail" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
          </p>
          <form class="form" @submit="onSubmit">
            <label>
              Your name
              <input v-model="name" type="text" autocomplete="name" :class="{ invalid: !!errors.name }" @blur="validateField('name')" @input="errors.name && validateField('name')" />
              <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
            </label>
            <label>
              Your email
              <input v-model="email" type="email" autocomplete="email" :class="{ invalid: !!errors.email }" @blur="validateField('email')" @input="errors.email && validateField('email')" />
              <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
            </label>
            <label>
              Message
              <textarea v-model="message" rows="5" :class="{ invalid: !!errors.message }" @blur="validateField('message')" @input="errors.message && validateField('message')" />
              <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
            </label>
            <button type="submit">Send message</button>
          </form>
        </section>

        <footer>{{ site?.footer ?? '' }} <span id="yr" /></footer>
      </main>
    </div>
  </div>
</template>