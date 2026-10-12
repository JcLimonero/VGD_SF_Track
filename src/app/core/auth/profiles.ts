/**
 * Perfiles de acceso del portal. Son dos cuentas compartidas, no un usuario
 * por persona: cada perfil entra con su propia contraseña, que valida el
 * servicio de acceso (carpeta `auth/`) y nunca viaja en este código.
 *
 * Los `id` de pestaña son los de `TabsComponent`.
 */
export type ProfileId = 'crabi' | 'sales_force';

export interface Profile {
  id: ProfileId;
  /** Nombre que ve el usuario */
  label: string;
  /** Pestañas que puede ver, en el orden en que aparecen */
  tabs: string[];
}

/** Orden en el que se ofrecen en el login: el primero es el que viene elegido. */
export const PROFILES: Profile[] = [
  {
    id: 'sales_force',
    label: 'SALES FORCE',
    // Todo lo demás: Crabi queda fuera a propósito
    tabs: [
      'orders',
      'inventory',
      'demos',
      'services',
      'clients',
      'leads',
      'dwh',
      'salesforce',
      'hondasf'
    ]
  },
  {
    id: 'crabi',
    label: 'CRABI',
    tabs: ['crabi']
  }
];

export function findProfile(id: string | null | undefined): Profile | undefined {
  return PROFILES.find((profile) => profile.id === id);
}
