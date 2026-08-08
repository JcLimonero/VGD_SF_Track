/**
 * Catálogo de las tablas de Honda SF.
 *
 * Cada entrada es un endpoint real de la API de Vanguardia. Los siete se
 * verificaron contra producción el 2026-08-06; los nombres que no están en esta
 * lista (`portalhondaorders`, `portalhondaservices`, ...) responden 401, así que
 * estos son todos los que existen.
 *
 * Cómo se comporta la API, verificado endpoint por endpoint:
 *
 *  - Filtra por cualquier columna real, pero SOLO con coincidencia exacta:
 *    `brand=HOND` devuelve 0 y `brand=HONDA` devuelve 13,641. Por eso los
 *    filtros de texto libre se limitan a campos que se copian y pegan (VIN,
 *    correo, ID de cliente) y el resto son listas de valores.
 *  - Los parámetros que no reconoce los ignora en silencio y devuelve todo.
 *  - No acepta rangos de fecha: se probaron `date_from`, `date_to`,
 *    `start_date`, `end_date`, `from` y `to`, y los seis se ignoran.
 *  - `perpage` topa en 1000 aunque se pida más.
 *  - `orderby` / `ordertype` funcionan con casi cualquier columna real, con una
 *    excepción medida: `portalhondacustomers` ignora `orderby=record_date` y
 *    devuelve exactamente lo mismo con `asc` que con `desc`. Ese endpoint
 *    parece traer su propio orden por esa columna. Ver `noSort`.
 */

export interface HondaSfFilterField {
  /** Nombre del parámetro, tal cual lo espera la API */
  field: string;
  label: string;
  /**
   * Valores de la lista desplegable. Sin esto el campo es de texto libre.
   *
   * Se llenan a mano porque la API no expone un catálogo de estos valores y el
   * filtrado es exacto: escribirlos a mano no es viable para el usuario. Salen
   * de muestrear 1000 registros de cada tabla el 2026-08-06, así que un valor
   * nuevo en la base no aparecerá aquí hasta que se agregue.
   */
  options?: string[];
  /** La lista se arma con el catálogo de `/vgd/agenciesfilter` */
  fromAgencies?: boolean;
}

export interface HondaSfTable {
  /** Endpoint bajo `/vgd/`, y también el identificador de la sub-pestaña */
  id: string;
  /** Etiqueta de la sub-pestaña */
  label: string;
  /** Nombre de la hoja del Excel (Excel admite 31 caracteres) */
  sheet: string;
  /** Columnas visibles en la tabla, en este orden. El detalle muestra todas. */
  columns: string[];
  /**
   * Columnas visibles por las que la API no ordena.
   *
   * Sin esto la tabla ofrecería el encabezado clicable y no pasaría nada: la
   * API no da error, simplemente devuelve el mismo listado.
   */
  noSort?: string[];
  defaultSort: { column: string; direction: 'asc' | 'desc' };
  filters: HondaSfFilterField[];
}

/**
 * Etiquetas de todos los campos que devuelven los siete endpoints.
 *
 * Es un solo mapa y no uno por tabla porque los esquemas se traslapan mucho
 * (`customer_id`, `brand`, `model_name`... salen en casi todas). Lo que no esté
 * aquí se muestra con el nombre del campo humanizado, no en blanco.
 */
export const HONDA_SF_LABELS: Record<string, string> = {
  id: 'ID',
  dealer_id: 'Clave Distribuidor',
  dealerName: 'Distribuidor',
  customer_id: 'ID Cliente',
  customer_type: 'Tipo de Cliente',
  company_name: 'Empresa',
  economic_activity: 'Actividad Económica',
  customer_name: 'Nombre',
  customer_lastname: 'Apellidos',
  gender: 'Género',
  occupation: 'Ocupación',
  marital_status: 'Estado Civil',
  birthdate: 'Fecha de Nacimiento',
  rfc: 'RFC',
  curp: 'CURP',
  email: 'Correo',
  additional_email: 'Correo Adicional',
  phone: 'Teléfono',
  mobile: 'Celular',
  alternative_phone: 'Teléfono Alterno',
  address: 'Domicilio',
  city: 'Ciudad',
  state: 'Estado',
  postal_code: 'Código Postal',
  customer_source: 'Origen del Cliente',
  marketing_campaign: 'Campaña',
  preferred_contact_method: 'Contacto Preferido',
  record_date: 'Fecha de Registro',
  created_at: 'Fecha de Creación',
  updated_at: 'Última Actualización',
  vin: 'VIN',
  brand: 'Marca',
  model_name: 'Modelo',
  model_trim: 'Versión',
  model_year: 'Año',
  exterior_color: 'Color Exterior',
  interior_color: 'Color Interior',
  demo_date: 'Fecha de Demo',
  payment_type: 'Forma de Pago',
  vehicle_price: 'Precio del Vehículo',
  layaway: 'Apartado',
  layaway_amount: 'Monto del Apartado',
  layaway_date: 'Fecha del Apartado',
  down_payment: 'Enganche',
  down_payment_date: 'Fecha del Enganche',
  financial_institution: 'Financiera',
  loan_status: 'Estado del Crédito',
  loan_term: 'Plazo',
  loan_origination_date: 'Fecha de Originación',
  payoff_date: 'Fecha de Liquidación',
  interest_rate: 'Tasa de Interés',
  remarks: 'Observaciones',
  lead_source: 'Origen del Lead',
  last_contact_timestamp: 'Último Contacto',
  lead_traffic_light: 'Semáforo',
  lead_stage: 'Etapa',
  tasks_completed: 'Tareas Completadas',
  tasks_missed: 'Tareas Vencidas',
  trade_in_vehicle_brand: 'Marca a Cuenta',
  trade_in_vehicle_model: 'Modelo a Cuenta',
  trade_in_vehicle_model_year: 'Año a Cuenta',
  trade_in_vehicle_version: 'Versión a Cuenta',
  opportunity_type: 'Tipo de Oportunidad',
  opportunity_status: 'Estado de la Oportunidad',
  estimated_close_deal_date: 'Cierre Estimado',
  cancelation_date: 'Fecha de Cancelación',
  purchase_date: 'Fecha de Compra',
  dealer_delivery_date: 'Fecha de Entrega'
};

/** Filtro por agencia; lo llevan las siete tablas, todas traen `dealer_id`. */
const DEALER_FILTER: HondaSfFilterField = {
  field: 'dealer_id',
  label: 'Distribuidor',
  fromAgencies: true
};

export const HONDA_SF_TABLES: HondaSfTable[] = [
  {
    id: 'portalhondacustomers',
    label: 'Clientes',
    sheet: 'Clientes',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'email',
      'mobile',
      'city',
      'record_date',
      'created_at'
    ],
    // La API ignora `orderby=record_date` en este endpoint y solo en este, así
    // que la tabla arranca por `created_at`, que sí obedece.
    noSort: ['record_date'],
    defaultSort: { column: 'created_at', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'email', label: 'Correo' },
      { field: 'rfc', label: 'RFC' },
      {
        field: 'customer_type',
        label: 'Tipo de Cliente',
        options: ['Persona Física', 'Persona Moral']
      }
    ]
  },
  {
    id: 'portalhondaleads',
    label: 'Leads',
    sheet: 'Leads',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'email',
      'mobile',
      'lead_source',
      'lead_stage',
      'lead_traffic_light',
      'record_date'
    ],
    defaultSort: { column: 'record_date', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'email', label: 'Correo' },
      {
        field: 'lead_stage',
        label: 'Etapa',
        options: [
          'Nuevo',
          'Consulta',
          'Calificado',
          'Seguimiento',
          'Cita Agendada',
          'Descalificado'
        ]
      },
      {
        field: 'lead_source',
        label: 'Origen',
        options: ['Internet', 'Piso', 'Base de Datos', 'Llamada entrante']
      },
      {
        field: 'lead_traffic_light',
        label: 'Semáforo',
        options: ['Caliente', 'Tibio', 'Frio']
      }
    ]
  },
  {
    id: 'portalhondaopportunities',
    label: 'Oportunidades',
    sheet: 'Oportunidades',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'brand',
      'model_name',
      'opportunity_status',
      'vehicle_price',
      'record_date'
    ],
    defaultSort: { column: 'record_date', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'vin', label: 'VIN' },
      {
        field: 'opportunity_status',
        label: 'Estado',
        options: [
          'Seguimiento',
          'Cotizaciones',
          'Prueba de manejo',
          'Cita Vehiculos',
          'Entrega del vehiculo',
          'Perdida'
        ]
      },
      {
        field: 'payment_type',
        label: 'Forma de Pago',
        options: ['CONTADO', 'FINANCIAMIENTO', 'AUTOFINANCIEMIENTO']
      }
    ]
  },
  {
    id: 'portalhondademos',
    label: 'Demos',
    sheet: 'Demos',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'vin',
      'brand',
      'model_name',
      'model_year',
      'demo_date'
    ],
    defaultSort: { column: 'demo_date', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'vin', label: 'VIN' },
      // Marca y modelo van como texto libre: la tabla trae 21 marcas y 47
      // modelos distintos, muchos mal capturados ("VOLSWAGEN", "CRV"), así que
      // una lista cerrada dejaría fuera registros reales.
      { field: 'brand', label: 'Marca' },
      { field: 'model_name', label: 'Modelo' }
    ]
  },
  {
    id: 'portalhondasales',
    label: 'Ventas',
    sheet: 'Ventas',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'vin',
      'brand',
      'model_name',
      'payment_type',
      'vehicle_price',
      'purchase_date'
    ],
    defaultSort: { column: 'purchase_date', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'vin', label: 'VIN' },
      {
        field: 'payment_type',
        label: 'Forma de Pago',
        options: ['CONTADO', 'FINANCIAMIENTO']
      },
      {
        field: 'lead_source',
        label: 'Origen',
        options: ['Piso', 'Base de Datos', 'Internet', 'Llamada entrante']
      }
    ]
  },
  {
    id: 'portalhondaquotes',
    label: 'Cotizaciones',
    sheet: 'Cotizaciones',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'brand',
      'model_name',
      'payment_type',
      'vehicle_price',
      'created_at'
    ],
    defaultSort: { column: 'created_at', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'email', label: 'Correo' },
      {
        field: 'payment_type',
        label: 'Forma de Pago',
        options: ['CONTADO', 'FINANCIAMIENTO']
      }
    ]
  },
  {
    id: 'portalhondafinances',
    label: 'Financiamientos',
    sheet: 'Financiamientos',
    columns: [
      'dealerName',
      'customer_id',
      'customer_name',
      'customer_lastname',
      'vin',
      'brand',
      'model_name',
      'financial_institution',
      'vehicle_price',
      'created_at'
    ],
    defaultSort: { column: 'created_at', direction: 'desc' },
    filters: [
      DEALER_FILTER,
      { field: 'customer_id', label: 'ID Cliente' },
      { field: 'vin', label: 'VIN' },
      // Sin lista de valores para `loan_status` ni `payment_type`: la tabla
      // tiene 5 registros y en todos vienen vacíos, no hay de dónde sacarlos.
      { field: 'financial_institution', label: 'Financiera' }
    ]
  }
];

/** Configuración de una tabla por su endpoint. */
export function findHondaSfTable(id: string): HondaSfTable | undefined {
  return HONDA_SF_TABLES.find((table) => table.id === id);
}
