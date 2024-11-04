import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Purchase } from './interfaces/purchase.interface';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PURCHASE_MODEL')
    private purchaseModel: Model<Purchase>,
  ) {}

  async create(createCatDto: any): Promise<Purchase> {
    const createdPurchase = new this.purchaseModel({
      ...createCatDto,
      created_at: new Date(),
    });
    return createdPurchase.save();
  }

  async insertMany(createCatDtos: any[]): Promise<Purchase[]> {
    const createdPurchase = createCatDtos.map((dto) => ({
      ...dto,
      created_at: new Date(),
    }));
    const result = await this.purchaseModel.insertMany(createdPurchase);
    return result as Purchase[];
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchaseModel.find().exec();
  }
}
