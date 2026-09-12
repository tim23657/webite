import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cloudflare terminates both plain HTTP and HTTPS for the zone, so a request
// can reach this Worker over http:// regardless of the "Always Use HTTPS"
// dashboard toggle. Enforce it here too, at the application layer.
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

export function proxy(request: NextRequest) {
  const { protocol, hostname } = request.nextUrl;
  if (protocol === 'http:' && !LOCAL_HOSTNAMES.has(hostname)) {
    const secureUrl = request.nextUrl.clone();
    secureUrl.protocol = 'https:';
    return NextResponse.redirect(secureUrl, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
