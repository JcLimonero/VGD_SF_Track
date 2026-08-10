// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * Inicializa el entorno de pruebas de Angular.
 *
 * Sin `teardown: { destroyAfterEach: false }`, que estaba puesto desde el
 * template: era la opcion de compatibilidad de Angular 12 y desde la 13 el
 * valor por defecto es destruir el componente despues de cada prueba.
 *
 * Con `false`, los componentes de una prueba seguian vivos durante las
 * siguientes: sus nodos se quedaban en el DOM y sus suscripciones abiertas.
 * Eso deja pasar pruebas que en realidad dependen del estado que dejo otra, y
 * hace que el orden importe.
 */
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
