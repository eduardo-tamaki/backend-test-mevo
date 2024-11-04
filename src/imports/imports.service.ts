import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Import } from './interfaces/import.interface';

@Injectable()
export class ImportsService {
  constructor(
    @Inject('IMPORT_MODEL')
    private purchaseModel: Model<Import>,
  ) {}

  async create(createCatDto: any): Promise<Import> {
    const createdImport = new this.purchaseModel({
      ...createCatDto,
      created_at: new Date(),
    });
    return createdImport.save();
  }

  async findAll(): Promise<Import[]> {
    return this.purchaseModel.find().exec();
  }
}
