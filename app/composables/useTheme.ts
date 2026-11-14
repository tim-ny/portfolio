export type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = useState<Theme>('theme', () => {
    if (import.meta.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })

  const apply = (value: Theme, persist = true) => {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.dataset.theme = value
      if (persist) {
        try { localStorage.setItem('theme', value) } catch {}
      }
    }
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  onMounted(() => {
    let initial: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored === 'light' || stored === 'dark') initial = stored
    } catch {}
    apply(initial, false)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null
      try { stored = localStorage.getItem('theme') } catch {}
      if (!stored) apply(e.matches ? 'dark' : 'light', false)
    }
    mq.addEventListener('change', onChange)
    onBeforeUnmount(() => mq.removeEventListener('change', onChange))
  })

  return { theme, toggle, apply }
}