import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { HONDA_SF_TABLES, HondaSfFilterField } from '../honda-sf.catalog';

/** Opción de una lista desplegable: lo que se ve y lo que se manda a la API. */
interface FilterOption {
  label: string;
  value: string;
}

/**
 * Filtros de Honda SF.
 *
 * A diferencia de los demás módulos, los campos no están fijos en la plantilla:
 * cada sub-pestaña consulta una tabla distinta, así que se arman a partir de lo
 * que declara el catálogo.
 *
 * Todos los valores se mandan tal cual y la API compara EXACTO: no hay búsqueda
 * por fragmento. Por eso los campos con pocos valores posibles son listas y no
 * cajas de texto -- escribir "Consul" en lugar de "Consulta" no devolvería
 * nada, y sin error: la API simplemente responde cero registros.
 */
@Component({
    selector: 'vex-honda-sf-filter',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './honda-sf-filter.component.html',
    styleUrl: './honda-sf-filter.component.scss'
})
export class HondaSfFilterComponent implements OnInit, OnChanges {
  /** Campos de la sub-pestaña activa */
  @Input() fields: HondaSfFilterField[] = HONDA_SF_TABLES[0]?.filters ?? [];

  @Output() filterChange = new EventEmitter<Record<string, string>>();

  /** Se emite cuando el usuario solicita descargar el Excel */
  @Output() downloadRequested = new EventEmitter<void>();

  /** El padre indica si hay una descarga de Excel en curso */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  agencies: any[] = [];

  /** Etiqueta elegida en cada lista, para mostrarla en el botón del desplegable */
  selected: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private vanguardiaApi: VanguardiaApiService
  ) {
    this.filterForm = this.fb.group({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadAgencies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // También en el primer cambio: el constructor arma el formulario con los
    // campos por defecto, y el valor que llega del padre puede ser otro.
    if ('fields' in changes) {
      this.buildForm();
    }
  }

  /** Opciones de un campo: del catálogo de agencias o de la lista declarada. */
  optionsFor(field: HondaSfFilterField): FilterOption[] {
    if (field.fromAgencies) {
      return this.agencies.map((agency) => ({
        label: agency.name,
        value: agency.idAgency
      }));
    }

    return (field.options ?? []).map((option) => ({
      label: option,
      value: option
    }));
  }

  isDropdown(field: HondaSfFilterField): boolean {
    return !!field.fromAgencies || !!field.options?.length;
  }

  onFilter(): void {
    this.filterChange.emit(this.filterForm.value as Record<string, string>);
  }

  onClearFilters(): void {
    this.selected = {};
    this.filterForm.reset(this.emptyValues());
    this.filterChange.emit(this.emptyValues());
  }

  onOptionToggle(
    field: HondaSfFilterField,
    option: FilterOption,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selected[field.field] = option.label;
      this.filterForm.patchValue(
        { [field.field]: option.value },
        { emitEvent: false }
      );
    } else if (this.selected[field.field] === option.label) {
      delete this.selected[field.field];
      this.filterForm.patchValue({ [field.field]: '' }, { emitEvent: false });
    }
  }

  isChecked(field: HondaSfFilterField, option: FilterOption): boolean {
    return this.selected[field.field] === option.label;
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const details = target.closest('details.dropdown') as HTMLDetailsElement | null;
    if (details) {
      // Se cierra una vez que el formulario terminó de actualizarse
      setTimeout(() => {
        details.open = false;
      });
    }
  }

  private loadAgencies(): void {
    this.vanguardiaApi.getAgencies().subscribe({
      next: (agencies) => {
        this.agencies = agencies;
      },
      error: (error) => {
        console.error('Error al cargar agencias para Honda SF:', error);
      }
    });
  }

  /**
   * Rehace el formulario al cambiar de sub-pestaña. No se conservan los valores
   * anteriores: los campos de una tabla no existen en la otra, y mandarlos
   * igual no daría error -- la API ignora lo que no reconoce y devolvería el
   * listado completo como si no hubiera filtro.
   */
  private buildForm(): void {
    this.selected = {};
    this.filterForm = this.fb.group(
      this.fields.reduce(
        (controls, field) => ({ ...controls, [field.field]: [''] }),
        {} as Record<string, any>
      )
    );
  }

  private emptyValues(): Record<string, string> {
    return this.fields.reduce(
      (values, field) => ({ ...values, [field.field]: '' }),
      {} as Record<string, string>
    );
  }
}
