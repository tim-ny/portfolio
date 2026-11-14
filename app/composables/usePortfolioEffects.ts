export function usePortfolioEffects() {
  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) document.body.classList.add('loaded')
    else setTimeout(() => document.body.classList.add('loaded'), 60)

    // cursor glow
    const onPointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // year
    const yr = document.getElementById('yr')
    if (yr) yr.textContent = String(new Date().getFullYear())

    // career dots light up
    const items = document.querySelectorAll<HTMLElement>('.story .item')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          x.target.classList.toggle('in', x.isIntersecting || x.boundingClientRect.top < 0)
        })
      },
      { rootMargin: '0px 0px -45% 0px' }
    )
    items.forEach((i) => io.observe(i))

    // reveal sections on scroll
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')
    const rio = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) x.target.classList.add('in')
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )
    revealEls.forEach((el) => rio.observe(el))

    // active nav
    const sections = document.querySelectorAll<HTMLElement>('main section[id]')
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav a, .mbar a')
    const nio = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            navLinks.forEach((a) => a.classList.toggle('on', a.hash === `#${x.target.id}`))
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => nio.observe(s))

    // parallax + story line
    const parallaxEls = document.querySelectorAll<HTMLElement>('[data-speed]')
    const story = document.getElementById('story')
    let tick = false
    const frame = () => {
      tick = false
      if (!reduce) {
        parallaxEls.forEach((el) => {
          el.style.transform = `translate3d(0, ${-window.scrollY * Number(el.dataset.speed)}px, 0)`
        })
      }
      if (story) {
        const r = story.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height))
        story.style.setProperty('--p', String(p))
      }
    }
    const onScroll = () => {
      document.body.classList.add('scrolled')
      if (!tick) {
        tick = true
        requestAnimationFrame(frame)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (window.scrollY > 0) document.body.classList.add('scrolled')
    window.addEventListener('resize', frame)
    frame()

    onBeforeUnmount(() => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', frame)
      io.disconnect()
      nio.disconnect()
      rio.disconnect()
    })
  })
}