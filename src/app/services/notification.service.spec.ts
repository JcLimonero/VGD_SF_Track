import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let opened: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideNoopAnimations()] });
    service = TestBed.inject(NotificationService);
    // Se espía `open` en vez de montar el overlay: lo que importa aquí es con
    // qué configuración se abre cada tipo de aviso, no cómo se pinta.
    opened = spyOn(TestBed.inject(MatSnackBar), 'open');
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('passes the message through untouched', () => {
    service.success('Orden 2160 marcada para reenvío a Crabi');

    expect(opened.calls.mostRecent().args[0]).toBe(
      'Orden 2160 marcada para reenvío a Crabi'
    );
  });

  it('gives an error more time on screen than a success', () => {
    // Un error hay que leerlo y decidir si se reintenta; una confirmación no.
    service.success('ok');
    const exito = opened.calls.mostRecent().args[2]!.duration!;

    service.error('boom');
    const fallo = opened.calls.mostRecent().args[2]!.duration!;

    expect(fallo).toBeGreaterThan(exito);
  });

  /**
   * El aviso de "filtra antes de descargar" es una instrucción, no un
   * resultado: si caducara solo, el usuario se quedaría sin saber qué hacer.
   * En MatSnackBar `duration: 0` significa que no se cierra solo.
   */
  it('does not let a warning dismiss itself', () => {
    service.warning('Aplica un filtro y vuelve a intentarlo.');

    expect(opened.calls.mostRecent().args[2]!.duration).toBe(0);
  });

  it('always offers a way to close the notice', () => {
    for (const notify of [
      () => service.success('a'),
      () => service.error('b'),
      () => service.warning('c')
    ]) {
      notify();
      expect(opened.calls.mostRecent().args[1]).toBe('Cerrar');
    }
  });

  it('marks each kind with its own panel class', () => {
    const clases = () => opened.calls.mostRecent().args[2]!.panelClass;

    service.success('a');
    expect(clases()).toEqual(['vgd-notif', 'vgd-notif-exito']);

    service.error('b');
    expect(clases()).toEqual(['vgd-notif', 'vgd-notif-error']);

    service.warning('c');
    expect(clases()).toEqual(['vgd-notif', 'vgd-notif-aviso']);
  });
});
