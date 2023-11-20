import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BodyParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // * const serverUrl = req.protocol + '://' + req.get('host');
    console.log(value);
    return value;
  }
}
