import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { GenericTableComponent } from './generic-table.component';
import { GenericDetailModalComponent } from './generic-detail-modal.component';

describe('GenericTableComponent', () => {
  let component: GenericTableComponent;
  let fixture: ComponentFixture<GenericTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericTableComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isSortable', () => {
    it('falls back to the built-in list when no override is given', () => {
      expect(component.sortableColumns).toBeNull();
      expect(component.isSortable('order_dms')).toBeTrue();
      expect(component.isSortable('billing_date')).toBeTrue();
      expect(component.isSortable('premium')).toBeFalse();
    });

    it('uses the override when provided', () => {
      component.sortableColumns = ['premium'];

      expect(component.isSortable('premium')).toBeTrue();
      // El override reemplaza la lista por defecto, no la extiende
      expect(component.isSortable('order_dms')).toBeFalse();
    });

    it('treats an empty override as nothing being sortable', () => {
      component.sortableColumns = [];
      expect(component.isSortable('order_dms')).toBeFalse();
    });
  });

  describe('openModal', () => {
    it('uses the explicit modal component and forwards the labels', () => {
      const open = spyOn(component.dialog, 'open');
      component.modalComponent = GenericDetailModalComponent;
      component.detailLabels = { vin: 'VIN' };

      const row = { vin: 'VIN1' };
      component.openModal(row);

      expect(open).toHaveBeenCalled();
      const [modal, config] = open.calls.mostRecent().args as any[];
      expect(modal).toBe(GenericDetailModalComponent);
      expect(config.data).toEqual({
        row,
        labels: { vin: 'VIN' },
        exclude: null,
        valueLabels: null,
        title: null
      });
    });

    it('forwards the coded value translations', () => {
      const open = spyOn(component.dialog, 'open');
      component.modalComponent = GenericDetailModalComponent;
      component.detailValueLabels = { isSend: { '1': 'Enviado a Crabi' } };

      component.openModal({ isSend: '1' });

      const [, config] = open.calls.mostRecent().args as any[];
      expect(config.data.valueLabels).toEqual({
        isSend: { '1': 'Enviado a Crabi' }
      });
    });

    it('forwards the excluded fields', () => {
      const open = spyOn(component.dialog, 'open');
      component.modalComponent = GenericDetailModalComponent;
      component.detailExclude = ['request_body'];

      component.openModal({ vin: 'VIN1', request_body: '{}' });

      const [, config] = open.calls.mostRecent().args as any[];
      expect(config.data.exclude).toEqual(['request_body']);
    });

    it('forwards the title so each module names its entity', () => {
      // Sin esto el modal generico se titula 'Detalles del registro', que no es
      // como el usuario llama a lo que esta viendo
      const open = spyOn(component.dialog, 'open');
      component.modalComponent = GenericDetailModalComponent;
      component.detailTitle = 'Detalles de la Orden';

      component.openModal({ vin: 'VIN1' });

      const [, config] = open.calls.mostRecent().args as any[];
      expect(config.data.title).toBe('Detalles de la Orden');
    });

    it('falls back to shape detection when no modal is given', () => {
      // Esta ruta sí se suscribe a afterClosed(), así que el espía debe
      // devolver algo parecido a un MatDialogRef.
      const open = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(undefined)
      } as any);
      expect(component.modalComponent).toBeNull();

      // Un registro de leads debe abrir el modal de leads, no el genérico
      component.openModal({ LeadNo: 'LD1', FullName: 'Test' });

      expect(open).toHaveBeenCalled();
      const [modal, config] = open.calls.mostRecent().args as any[];
      expect(modal).not.toBe(GenericDetailModalComponent);
      // En la ruta anterior el registro se pasa tal cual
      expect(config.data.LeadNo).toBe('LD1');
    });
  });

  describe('openJsonModal', () => {
    function openWith(row: any) {
      const open = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(undefined)
      } as any);
      component.openJsonModal(row);
      const [, config] = open.calls.mostRecent().args as any[];
      return config.data;
    }

    it('shows sf_jsonRequest by default', () => {
      // Los módulos que mandan a Salesforce no configuran nada; el
      // comportamiento previo al modal de varias secciones debe mantenerse
      expect(component.jsonField).toBe('sf_jsonRequest');
      expect(component.jsonFields).toBeNull();

      const data = openWith({ sf_jsonRequest: '{"a":1}', other: 'x' });

      expect(data.title).toBe('JSON Request - SalesForce');
      expect(data.sections).toEqual([{ label: '', value: '{"a":1}' }]);
    });

    it('shows one section per configured field', () => {
      component.jsonTitle = 'Petición y respuesta - Crabi';
      component.jsonFields = [
        { field: 'request_body', label: 'Petición' },
        { field: 'response_body', label: 'Respuesta' }
      ];

      const data = openWith({
        request_body: '{"rfc":"X"}',
        response_body: '{"code":201}'
      });

      expect(data.title).toBe('Petición y respuesta - Crabi');
      expect(data.sections).toEqual([
        { label: 'Petición', value: '{"rfc":"X"}' },
        { label: 'Respuesta', value: '{"code":201}' }
      ]);
    });
  });

  describe('cellValue', () => {
    it('reads nested properties', () => {
      expect(component.cellValue({ a: { b: 'x' } }, 'a.b')).toBe('x');
    });

    it('returns empty string for a missing property name', () => {
      expect(component.cellValue({ a: 1 }, '')).toBe('');
    });

    it('does not throw on a missing path', () => {
      expect(component.cellValue({}, 'a.b.c')).toBeUndefined();
    });
  });

  describe('pagination', () => {
    it('computes the page count from the total', () => {
      component.total = 43;
      component.pageSize = 5;
      component.updatePagination();
      expect(component.totalPages).toBe(9);
    });

    it('reports no pages when there is no data', () => {
      component.total = 0;
      component.updatePagination();
      expect(component.totalPages).toBe(0);
      expect(component.canGoNext).toBeFalse();
      expect(component.canGoPrevious).toBeFalse();
    });

    it('emits the new page when navigating', () => {
      const emitted: any[] = [];
      component.pageChanged.subscribe((e) => emitted.push(e));
      component.total = 43;
      component.pageSize = 5;
      component.updatePagination();

      component.goToNextPage();
      expect(emitted).toEqual([{ pageIndex: 1, pageSize: 5 }]);

      component.goToLastPage();
      expect(emitted[1]).toEqual({ pageIndex: 8, pageSize: 5 });
    });

    it('resets to the first page when the page size changes', () => {
      const emitted: any[] = [];
      component.total = 43;
      component.pageSize = 5;
      component.updatePagination();
      component.goToNextPage();
      component.pageChanged.subscribe((e) => emitted.push(e));

      component.onPageSizeChange(25);

      expect(component.currentPage).toBe(0);
      expect(emitted).toEqual([{ pageIndex: 0, pageSize: 25 }]);
    });
  });

  describe('toggleSort', () => {
    it('cycles asc -> desc -> cleared', () => {
      const emitted: any[] = [];
      component.sortChanged.subscribe((e) => emitted.push(e));

      component.toggleSort('order_dms');
      expect(emitted[0]).toEqual({ column: 'order_dms', direction: 'asc' });

      component.toggleSort('order_dms');
      expect(emitted[1]).toEqual({ column: 'order_dms', direction: 'desc' });

      component.toggleSort('order_dms');
      expect(emitted[2]).toEqual({ column: '', direction: 'asc' });
      expect(component.sortColumn).toBeNull();
    });

    it('starts a new column at ascending', () => {
      const emitted: any[] = [];
      component.sortChanged.subscribe((e) => emitted.push(e));

      component.toggleSort('order_dms');
      component.toggleSort('billing_date');

      expect(emitted[1]).toEqual({ column: 'billing_date', direction: 'asc' });
    });
  });
});
