import { ApiProperty } from '@nestjs/swagger';

export class TransformImportsDto {

  @ApiProperty({
    description: 'TypeScript source code to transform',
    example: `
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class TestComponent {

  value!: Observable<any>;

  subject = new Subject<any>();

}
`
  })
  source: string;
}