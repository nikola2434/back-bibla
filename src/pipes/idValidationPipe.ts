import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

export class idValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;

    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException('Не верен id');
    return value;
  }
}
