import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES, type AppRoute } from './routes'

type HistoryPath = AppRoute | string

type NavigationHistoryContextValue = {
  history: HistoryPath[]
  setHistory: React.Dispatch<React.SetStateAction<HistoryPath[]>>
}

const STORAGE_KEY = 'navigation_history_v1'

const NavigationHistoryContext = createContext<NavigationHistoryContextValue | null>(
  null
)

const normalizePathname = (pathname: string): string => {
  const qIndex = pathname.indexOf('?')
  const hIndex = pathname.indexOf('#')

  const cutIndex =
    qIndex === -1
      ? hIndex
      : hIndex === -1
        ? qIndex
        : Math.min(qIndex, hIndex)

  return cutIndex === -1 ? pathname : pathname.slice(0, cutIndex)
}

const readStoredHistory = (): HistoryPath[] | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    const items = parsed.filter((x): x is string => typeof x === 'string')
    if (items.length === 0) return null
    return items
  } catch {
    return null
  }
}

export const NavigationHistoryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const location = useLocation()

  const [history, setHistory] = useState<HistoryPath[]>(() => {
    const stored = typeof window !== 'undefined' ? readStoredHistory() : null
    const base: HistoryPath[] = stored ?? [ROUTES.home]
    if (base.length === 0 || base[0] !== ROUTES.home) {
      return [ROUTES.home, ...base.filter((p) => p !== ROUTES.home)]
    }
    return base
  })

  useEffect(() => {
    const current = normalizePathname(location.pathname)

    setHistory((prev) => {
      const ensuredBase =
        prev.length === 0 || prev[0] !== ROUTES.home
          ? [ROUTES.home, ...prev.filter((p) => p !== ROUTES.home)]
          : prev

      if (current === ROUTES.home) {
        const idxHome = ensuredBase.indexOf(ROUTES.home)
        return idxHome === -1 ? [ROUTES.home] : [ROUTES.home]
      }

      const last = ensuredBase[ensuredBase.length - 1]
      if (last === current) return ensuredBase

      const existingIndex = ensuredBase.indexOf(current)
      if (existingIndex !== -1) {
        return ensuredBase.slice(0, existingIndex + 1)
      }

      return [...ensuredBase, current]
    })
  }, [location.pathname])

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      null
    }
  }, [history])

  const value = useMemo<NavigationHistoryContextValue>(
    () => ({ history, setHistory }),
    [history]
  )

  return (
    <NavigationHistoryContext.Provider value={value}>
      {children}
    </NavigationHistoryContext.Provider>
  )
}

export const useNavigationHistory = () => {
  const ctx = useContext(NavigationHistoryContext)
  if (!ctx) {
    throw new Error('useNavigationHistory must be used within NavigationHistoryProvider')
  }
  return ctx
}
