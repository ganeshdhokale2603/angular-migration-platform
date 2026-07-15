import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {

    let service: DashboardService;

    beforeEach(() => {

        service = new DashboardService(
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any
        );

    });

    it('should be defined', () => {

        expect(service).toBeDefined();

    });

});