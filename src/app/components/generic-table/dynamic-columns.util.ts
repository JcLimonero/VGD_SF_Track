import { TableColumn } from '../../../@vex/interfaces/table-column.interface';

export interface DynamicColumnOptions {
  /** Etiqueta a mostrar para un campo, en lugar de la generada automáticamente. */
  labels?: Record<string, string>;
  /** Campos que van primero, en este orden. El resto conserva su orden natural. */
  order?: string[];
  /** Campos que no se muestran en la tabla. */
  exclude?: string[];
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
 * Se usa en Integración SF y Honda SF, donde el esquema real todavía no está
 * definido y en el caso de Integración SF además cambia entre tablas. Crabi ya
 * no lo necesita: consume la API real y sus columnas están declaradas.
 */
export function buildColumns(
  rows: any[],
  opts: DynamicColumnOptions = {}
): TableColumn<any>[] {
  if (!rows || rows.length === 0) return [];

  const { labels = {}, order = [], exclude = [] } = opts;

  const fields = Object.keys(rows[0]).filter(
    (field) => !exclude.includes(field)
  );

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
