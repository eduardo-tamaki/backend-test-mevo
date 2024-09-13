import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancaDto } from './create-financa.dto';

export class UpdateFinancaDto extends PartialType(CreateFinancaDto) {}
