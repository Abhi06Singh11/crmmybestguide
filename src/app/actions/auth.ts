
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Role = 'Marketer' | 'Developer' | 'Support' | 'Super Admin';

export async function login(role: Role) {
  cookies().set('dev-auth-role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  let redirectTo = '/';
  switch (role) {
    case 'Marketer':
      redirectTo = '/dashboard/marketer';
      break;
    case 'Developer':
      redirectTo = '/dashboard/developer';
      break;
    case 'Support':
      redirectTo = '/dashboard/support';
      break;
    case 'Super Admin':
      redirectTo = '/dashboard/admin';
      break;
  }
  redirect(redirectTo);
}

export async function logout() {
  cookies().delete('dev-auth-role');
  redirect('/login');
}
