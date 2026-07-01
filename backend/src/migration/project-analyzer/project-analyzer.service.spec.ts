import { Test, TestingModule } from '@nestjs/testing';
import { ProjectAnalyzerService } from './project-analyzer.service';

describe('ProjectAnalyzerService', () => {
  let service: ProjectAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectAnalyzerService],
    }).compile();

    service = module.get<ProjectAnalyzerService>(ProjectAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
