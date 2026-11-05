import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import {
  BulkSearchDialogComponent,
  BulkSearchRequest
} from './bulk-search-dialog.component';

describe('BulkSearchDialogComponent', () => {
  let component: BulkSearchDialogComponent;
  let fixture: ComponentFixture<BulkSearchDialogComponent>;
  let closed: (BulkSearchRequest | undefined)[];

  beforeEach(async () => {
    closed = [];
    await TestBed.configureTestingModule({
      imports: [BulkSearchDialogComponent],
      providers: [
        provideNoopAnimations(),
        {
          provide: MatDialogRef,
          useValue: { close: (value?: BulkSearchRequest) => closed.push(value) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BulkSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('abre buscando por número de pedido y sin nada que buscar', () => {
    expect(component.field).toBe('order_dms');
    expect(component.canSearch).toBeFalse();
  });

  it('ofrece buscar por pedido o por VIN', () => {
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('.bulk-option')
    ).map((el) => (el as HTMLElement).textContent?.trim());
    expect(labels).toEqual(['Número de pedido', 'VIN']);
  });

  it('cuenta los valores y avisa de los repetidos', () => {
    component.text = '20905\n20906\n20905';
    fixture.detectChanges();

    expect(component.count).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('2 de 200 pedidos');
    expect(fixture.nativeElement.textContent).toContain('1 repetido');
  });

  it('devuelve el tipo y los valores al buscar', () => {
    component.text = '20905, 20906';
    component.search();

    expect(closed).toEqual([
      { field: 'order_dms', label: 'pedidos', values: ['20905', '20906'], duplicates: 0 }
    ]);
  });

  it('no muestra el selector de agencia si no hay agencias', () => {
    expect(fixture.nativeElement.querySelector('.bulk-agency')).toBeNull();
  });

  it('con VIN pasa a mayúsculas', () => {
    component.selectField('vin');
    component.text = 'kndpu3adxp7186704';
    component.search();

    expect(closed[0]?.field).toBe('vin');
    expect(closed[0]?.values).toEqual(['KNDPU3ADXP7186704']);
  });

  it('no busca con la lista vacía ni pasada de 200', () => {
    component.search();
    expect(closed).toEqual([]);

    component.text = Array.from({ length: 201 }, (_, i) => `P${i}`).join('\n');
    fixture.detectChanges();
    expect(component.overLimit).toBeTrue();
    expect(component.canSearch).toBeFalse();
    component.search();
    expect(closed).toEqual([]);
    expect(
      fixture.nativeElement.querySelector('.bulk-btn--primary').disabled
    ).toBeTrue();
  });

  it('cancelar cierra sin resultado', () => {
    component.cancel();
    expect(closed).toEqual([undefined]);
  });

  describe('con agencias', () => {
    const open = (data: object) => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [BulkSearchDialogComponent],
        providers: [
          provideNoopAnimations(),
          { provide: MAT_DIALOG_DATA, useValue: data },
          {
            provide: MatDialogRef,
            useValue: { close: (value?: BulkSearchRequest) => closed.push(value) }
          }
        ]
      });
      fixture = TestBed.createComponent(BulkSearchDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    };

    it('ofrece las agencias y arranca con la que estaba elegida', () => {
      open({ agencies: ['GEELY GALERIAS', 'KIA'], agencyName: 'KIA' });

      const options = Array.from(
        fixture.nativeElement.querySelectorAll('.bulk-agency option')
      ).map((el) => (el as HTMLElement).textContent?.trim());
      expect(options).toEqual(['Todas las agencias', 'GEELY GALERIAS', 'KIA']);
      expect(component.agencyName).toBe('KIA');
    });

    it('devuelve la agencia elegida', () => {
      open({ agencies: ['GEELY GALERIAS'] });
      component.agencyName = 'GEELY GALERIAS';
      component.text = '2762';
      component.search();

      expect(closed[0]?.agencyName).toBe('GEELY GALERIAS');
    });

    it('sin agencia no manda el campo', () => {
      open({ agencies: ['GEELY GALERIAS'] });
      component.text = '2762';
      component.search();

      expect('agencyName' in closed[0]!).toBeFalse();
    });
  });
});
