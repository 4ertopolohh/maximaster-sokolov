import '../Story/Story.scss'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/routes'
import { useNavigationHistory } from '../../shared/navigationHistory'

const ROUTE_LABELS: Record<string, string> = {
  [ROUTES.home]: 'Home',
  [ROUTES.catalog]: 'Catalog',
  [ROUTES.info]: 'Info',
  [ROUTES.pay]: 'Pay',
  [ROUTES.tasks]: 'Tasks',
  [ROUTES.about]: 'About',
  [ROUTES.basket]: 'Basket',
  [ROUTES.blog]: 'Blog',
  [ROUTES.contact]: 'Contact Us',
  [ROUTES.favorite]: 'Favorite',
  [ROUTES.profile]: 'Profile',
}

const labelFromPath = (path: string): string => {
  const exact = ROUTE_LABELS[path]
  if (exact) return exact

  const cleaned = path.replace(/\/+$/, '')
  const last = cleaned.split('/').filter(Boolean).pop()
  if (!last) return 'Home'

  const withSpaces = last.replace(/[-_]+/g, ' ')
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

const Story = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { history, setHistory } = useNavigationHistory()

  const items = useMemo(() => {
    return history.map((path) => {
      const p = typeof path === 'string' ? path : String(path)
      return { path: p, label: labelFromPath(p) }
    })
  }, [history])

  const handleClick = (index: number, path: string) => (e: React.MouseEvent) => {
    e.preventDefault()

    setHistory((prev) => {
      const normalizedPrev =
        prev.length === 0 || prev[0] !== ROUTES.home
          ? [ROUTES.home, ...prev.filter((p) => p !== ROUTES.home)]
          : prev
      return normalizedPrev.slice(0, index + 1)
    })

    if (location.pathname !== path) {
      navigate(path)
    }
  }

  return (
    <section className="story">
      <div className="container">
        {items.map((item, index) => {
          const isActive = index === items.length - 1
          return (
            <a
              key={`${item.path}-${index}`}
              href={item.path}
              className={`storyItem${isActive ? ' storyItem--active' : ''}`}
              onClick={handleClick(index, item.path)}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Story
