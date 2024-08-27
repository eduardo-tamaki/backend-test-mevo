import { PartialType } from '@nestjs/mapped-types';
import { CreateImportacoeDto } from './create-importacoe.dto';

export class UpdateImportacoeDto extends PartialType(CreateImportacoeDto) {}
