import { NextResponse } from 'next/server'
import authHeaderToBase64 from './libs/authHeaderToBase64'
//import apiMiddleware from './components/middleware/api'
// import authMiddleware from './components/middleware/auth'
//import editMiddleware from './components/middleware/edit'
// import logoutMiddleware from './components/middleware/logout'

function matchPathname(url, pathname) {
  return url.pathname.startsWith(pathname)
}

export async function middleware(req) {
  const url = req.nextUrl.clone()
  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    return authFail(req)
  } else {
    const [user, password] = authHeaderToBase64(authHeader)

    if (user!==process.env.USERNAME || password!==process.env.PASSWORD) {
      return authFail(req)
    }
  }
  // if (matchPathname(url, '/api')) {
  //   return apiMiddleware(req)
  // }
  //
  // if (matchPathname(url, '/edit')) {
  //   return editMiddleware(req)
  // }

  // if (matchPathname(url, '/logout')) {
  //   return logoutMiddleware(req)
  // }
  //
  // if (matchPathname(url, '/auth')) {
  //   return authMiddleware(req)
  // }

  return NextResponse.next()
}

function authFail(req){
  return NextResponse.rewrite(
      `${req.nextUrl.protocol}//${req.nextUrl.host}/api/auth`,
      {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      }
    );

}
