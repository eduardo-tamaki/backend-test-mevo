import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Purchase } from './interfaces/purchase.interface';
//import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PURCHASE_MODEL')
    private purchaseModel: Model<Purchase>,
  ) {}

  async create(createCatDto: any): Promise<Purchase> {
    const createdCat = new this.purchaseModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchaseModel.find().exec();
  }
}
