import { ProfileId } from '../app/core/auth/profiles';

/** Deja una sesión vigente de ese perfil, como si ya hubiera entrado. */
export function loginAs(profile: ProfileId): void {
  localStorage.setItem(
    'vgd_session',
    JSON.stringify({
      token: 'token-de-prueba',
      profile,
      expiresAt: Date.now() + 60 * 60 * 1000
    })
  );
}

export function clearSession(): void {
  localStorage.removeItem('vgd_session');
}
