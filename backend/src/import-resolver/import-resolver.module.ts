import { Module } from '@nestjs/common';
import { ImportResolverService } from './import-resolver.service';

@Module({
  providers: [ImportResolverService],
  exports: [ImportResolverService],
})
export class ImportResolverModule {}