import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/base.scss'
import './styles/_variables.scss'
import { ROUTES, type AppRoute } from './shared/routes'
import Header from './components/Header/Header'

import favoriteIcon from './assets/images/icons/favoriteIcon.png'
import basketIcon from './assets/images/icons/basketIcon.png'
import userIcon from './assets/images/icons/userIcon.png'
import Footer from './components/Footer/Footer'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const InfoPage = lazy(() => import('./pages/InfoPage/InfoPage'))
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'))
const PayPage = lazy(() => import('./pages/PayPage/PayPage'))
const TasksPage = lazy(() => import('./pages/TasksPage/TasksPage'))

const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))
const BasketPage = lazy(() => import('./pages/BasketPage/BasketPage'))
const BlogPage = lazy(() => import('./pages/BlogPage/BlogPage'))
const ContactUsPage = lazy(() => import('./pages/ContactUsPage/ContactUsPage'))
const FavoritePage = lazy(() => import('./pages/FavoritePage/FavoritePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'))

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

export type HeaderNavLinkItem = {
  label: string
  to: AppRoute
}

export type HeaderNavActionItem = {
  icon: string
  to: AppRoute
}

export type FooterLinkItem = {
  label: string
  href: string
}

const headerNavLinks: HeaderNavLinkItem[] = [
  { label: 'Home', to: ROUTES.home },
  { label: 'About', to: ROUTES.about },
  { label: 'Contact Us', to: ROUTES.contact },
  { label: 'Blog', to: ROUTES.blog },
  { label: 'Tasks', to: ROUTES.tasks },
]

const headerNavActions: HeaderNavActionItem[] = [
  { icon: favoriteIcon, to: ROUTES.favorite },
  { icon: basketIcon, to: ROUTES.basket },
  { icon: userIcon, to: ROUTES.profile },
]



const App = () => {
  return (
    <>
      <Header links={headerNavLinks} actions={headerNavActions} />
      <Suspense fallback={null}>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.info} element={<InfoPage />} />
          <Route path={ROUTES.catalog} element={<CatalogPage />} />
          <Route path={ROUTES.pay} element={<PayPage />} />
          <Route path={ROUTES.tasks} element={<TasksPage />} />

          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.basket} element={<BasketPage />} />
          <Route path={ROUTES.blog} element={<BlogPage />} />
          <Route path={ROUTES.contact} element={<ContactUsPage />} />
          <Route path={ROUTES.favorite} element={<FavoritePage />} />
          <Route path={ROUTES.profile} element={<ProfilePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
