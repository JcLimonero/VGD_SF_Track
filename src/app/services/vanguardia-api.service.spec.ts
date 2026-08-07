import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../environments/environment';

import { VanguardiaApiService } from './vanguardia-api.service';

const BASE = environment.api.baseUrl;

describe('VanguardiaApiService', () => {
  let service: VanguardiaApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: httpTestProviders });
    service = TestBed.inject(VanguardiaApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getHondaPortal', () => {
    it('calls the endpoint it is given', () => {
      service.getHondaPortal('portalhondaleads').subscribe();

      const req = httpMock.expectOne(`${BASE}/vgd/portalhondaleads`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get(environment.api.providerTokenHeader)).toBe(
        environment.api.providerTokenValue
      );
      req.flush({});
    });

    it('unwraps items and total from the envelope', () => {
      let result: any;
      service.getHondaPortal('portalhondasales').subscribe((r) => (result = r));

      httpMock.expectOne(`${BASE}/vgd/portalhondasales`).flush({
        status: 200,
        data: { data: [{ id: '1' }], total_rows: 19, per_page: 5, page: 1 }
      });

      expect(result).toEqual({ items: [{ id: '1' }], total: 19 });
    });

    it('falls back to the row count when the API omits the total', () => {
      let result: any;
      service.getHondaPortal('portalhondaquotes').subscribe((r) => (result = r));

      httpMock
        .expectOne(`${BASE}/vgd/portalhondaquotes`)
        .flush({ status: 200, data: { data: [{ id: '1' }, { id: '2' }] } });

      expect(result.total).toBe(2);
    });

    it('returns nothing rather than failing on an unexpected shape', () => {
      let result: any;
      service.getHondaPortal('portalhondademos').subscribe((r) => (result = r));

      httpMock.expectOne(`${BASE}/vgd/portalhondademos`).flush({ oops: true });

      expect(result).toEqual({ items: [], total: 0 });
    });

    it('does not send empty filters', () => {
      // La API ignora lo que no reconoce, pero un parámetro vacío sí lo aplica
      // y devolvería cero registros
      service
        .getHondaPortal('portalhondacustomers', {
          page: 1,
          perpage: 100,
          email: '',
          rfc: null,
          dealer_id: undefined,
          customer_id: 'VGD-1'
        })
        .subscribe();

      const req = httpMock.expectOne(
        (r) => r.url === `${BASE}/vgd/portalhondacustomers`
      );

      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('perpage')).toBe('100');
      expect(req.request.params.get('customer_id')).toBe('VGD-1');
      expect(req.request.params.has('email')).toBeFalse();
      expect(req.request.params.has('rfc')).toBeFalse();
      expect(req.request.params.has('dealer_id')).toBeFalse();
      req.flush({});
    });

    it('refuses to build a request without an endpoint', () => {
      // Sin nombre la URL quedaría en `/vgd/`, que responde 401 y se leería
      // como un problema de credenciales
      expect(() => service.getHondaPortal('')).toThrowError(/endpoint/i);
    });
  });
});
