import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/routes'
import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

export const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    const redirect = new URL('/', nextUrl).href
    return Response.redirect(redirect)
  }

  return
})

export const config = {
  matcher: ['/creator/:path*', '/editor/:path*', '/panel/:path*', '/login'],
}
