import { TableColumn } from '../../../@vex/interfaces/table-column.interface';

export interface DynamicColumnOptions {
  /** Etiqueta a mostrar para un campo, en lugar de la generada automáticamente. */
  labels?: Record<string, string>;
  /** Campos que van primero, en este orden. El resto conserva su orden natural. */
  order?: string[];
  /** Campos que no se muestran en la tabla. */
  exclude?: string[];
  /**
   * Únicos campos que se muestran, en este orden. Tiene prioridad sobre
   * `order` y `exclude`.
   *
   * Es para las tablas de esquema conocido pero muy ancho: Honda SF tiene tablas
   * de hasta 55 campos, donde enumerar los que sobran es más frágil que
   * enumerar los que caben. Los que no vengan en los datos simplemente no se
   * pintan, así que quitar un campo en la API no deja una columna vacía.
   */
  include?: string[];
}

/**
 * Convierte el nombre de un campo en una etiqueta legible.
 * `order_dms` -> `Order Dms`, `idAgency` -> `Id Agency`
 */
export function humanizeFieldName(field: string): string {
  return field
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase -> camel Case
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Construye las columnas de una tabla a partir de los datos, sin necesidad de
 * conocer el esquema de antemano.
 *
 * Se usa en Honda SF, donde el esquema cambia entre las siete sub-pestañas.
 * Crabi no lo necesita: es una sola tabla y sus columnas están declaradas.
 */
export function buildColumns(
  rows: any[],
  opts: DynamicColumnOptions = {}
): TableColumn<any>[] {
  if (!rows || rows.length === 0) return [];

  const { labels = {}, order = [], exclude = [], include } = opts;

  const present = Object.keys(rows[0]);

  // Con `include` la lista blanca ya define cuáles y en qué orden; sin él se
  // parte de todos los campos del registro menos los excluidos.
  const fields = include
    ? include.filter((field) => present.includes(field))
    : present.filter((field) => !exclude.includes(field));

  const ordered = [
    ...order.filter((field) => fields.includes(field)),
    ...fields.filter((field) => !order.includes(field))
  ];

  return ordered.map((field) => ({
    property: field,
    label: labels[field] ?? humanizeFieldName(field),
    type: 'text' as const
  }));
}
