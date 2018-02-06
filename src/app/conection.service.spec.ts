import { TestBed, inject } from '@angular/core/testing';

import { ConectionService } from './conection.service';

describe('ConectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConectionService]
    });
  });

  it('should be created', inject([ConectionService], (service: ConectionService) => {
    expect(service).toBeTruthy();
  }));
});
