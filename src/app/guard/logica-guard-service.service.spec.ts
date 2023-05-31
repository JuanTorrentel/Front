import { TestBed } from '@angular/core/testing';

import { LogicaGuardServiceService } from './logica-guard-service.service';

describe('LogicaGuardServiceService', () => {
  let service: LogicaGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicaGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
