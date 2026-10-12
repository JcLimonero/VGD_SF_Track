import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Profile, ProfileId, findProfile } from './profiles';

const STORAGE_KEY = 'vgd_session';

/** Llaves del acceso anterior (una contraseña compartida en el navegador). */
const LEGACY_KEYS = ['isAuthenticated', 'loginTime'];

interface Session {
  token: string;
  profile: ProfileId;
  /** Milisegundos desde 1970 */
  expiresAt: number;
}

interface LoginResponse {
  token: string;
  profile: ProfileId;
  expiresAt: number;
}

/**
 * Sesión del portal. La contraseña la valida el servicio de acceso; aquí solo
 * se guarda el token que devuelve y se decide qué pestañas ve cada perfil.
 *
 * Ojo: ocultar pestañas aquí es control de pantalla. Que un perfil no pueda
 * llamar a otros endpoints depende de que la API valide el perfil.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {
    LEGACY_KEYS.forEach((key) => this.safeRemove(key));
  }

  login(profile: ProfileId, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('/auth/login', { profile, password })
      .pipe(tap((res) => this.save(res)));
  }

  logout(): void {
    this.safeRemove(STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.profile() !== null;
  }

  /** Perfil de la sesión vigente, o null si no hay sesión o ya caducó. */
  profile(): Profile | null {
    const session = this.read();
    if (!session) return null;
    if (session.expiresAt <= Date.now()) {
      this.logout();
      return null;
    }
    return findProfile(session.profile) ?? null;
  }

  /** Sin sesión no se ve ninguna pestaña. */
  canSee(tabId: string): boolean {
    return this.profile()?.tabs.includes(tabId) ?? false;
  }

  /** Pestaña con la que abre el portal este perfil. */
  defaultTab(): string | null {
    return this.profile()?.tabs[0] ?? null;
  }

  private save(res: LoginResponse): void {
    const session: Session = {
      token: res.token,
      profile: res.profile,
      expiresAt: res.expiresAt
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      /* sin almacenamiento disponible: la sesión no se conserva */
    }
  }

  private read(): Session | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as Partial<Session>;
      if (
        typeof session.token !== 'string' ||
        typeof session.expiresAt !== 'number' ||
        !findProfile(session.profile)
      ) {
        return null;
      }
      return session as Session;
    } catch {
      return null;
    }
  }

  private safeRemove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignorar */
    }
  }
}
