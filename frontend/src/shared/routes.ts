export const ROUTES = {
  home: '/',
  info: '/info',
  catalog: '/catalog',
  pay: '/pay',
  tasks: '/tasks',

  about: '/about',
  basket: '/basket',
  blog: '/blog',
  contact: '/contact',
  favorite: '/favorite',
  profile: '/profile',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
