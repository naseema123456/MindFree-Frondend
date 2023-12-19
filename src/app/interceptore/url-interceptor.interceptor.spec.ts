import { TestBed } from '@angular/core/testing';

import { UrlInterceptorInterceptor } from './url-interceptor.interceptor';

describe('UrlInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UrlInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UrlInterceptorInterceptor = TestBed.inject(UrlInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
