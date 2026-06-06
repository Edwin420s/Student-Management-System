import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isPublic = publicRoutes.includes(request.nextUrl.pathname);
  
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && isPublic) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Verify token by making a request to the API
  if (token && !isPublic) {
    try {
      const verifyUrl = new URL('/api/auth/me', request.url);
      const response = await fetch(verifyUrl.toString(), {
        headers: {
          cookie: `token=${token}`,
        },
      });
      
      if (!response.ok) {
        // Token is invalid, redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    } catch (error) {
      // If verification fails, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };