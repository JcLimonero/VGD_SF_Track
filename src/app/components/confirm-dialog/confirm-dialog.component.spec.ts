import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let closed: (boolean | undefined)[];

  beforeEach(async () => {
    closed = [];
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: { close: (v?: boolean) => closed.push(v) } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Reenviar todos',
            lines: ['Primera línea', 'Segunda línea'],
            confirmLabel: 'Reenviar 3'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.detectChanges();
  });

  it('muestra el título, el mensaje y el botón de confirmar', () => {
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Reenviar todos');
    expect(text).toContain('Primera línea');
    expect(text).toContain('Segunda línea');
    expect(fixture.nativeElement.querySelector('.confirm-btn--primary').textContent.trim()).toBe('Reenviar 3');
  });

  it('confirmar devuelve true y cancelar no devuelve nada', () => {
    fixture.nativeElement.querySelector('.confirm-btn--primary').click();
    fixture.nativeElement.querySelector('.confirm-btn--secondary').click();

    expect(closed).toEqual([true, undefined]);
  });
});
