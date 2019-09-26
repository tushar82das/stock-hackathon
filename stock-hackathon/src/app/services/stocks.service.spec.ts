import { TestBed, inject } from '@angular/core/testing';

import { StocksService } from './stocks.service';

describe('StocksService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [StocksService]
    }));

    it('should be created', () => {
        const service: StocksService = TestBed.get(StocksService);
        expect(service).toBeTruthy();
    });
});
