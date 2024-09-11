import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { CreateFinancaDto } from './dto/create-financa.dto';
import { UpdateFinancaDto } from './dto/update-financa.dto';
import { TrasactionsDto } from './dto/transaction.dto';

@Injectable()
export class FinancasService {
  async create(filePath: string) {
    const json = await this.converterFileInJson(filePath);

    return json;
  }

  async converterFileInJson(filePath: string) {
   

    const sheet = xlsx.readFile(filePath);

    if (!sheet) {
      throw new NotFoundException('No file');
    }

    const sheetNameList = sheet.SheetNames;

    const jsonData: TrasactionsDto[] = xlsx.utils.sheet_to_json(
      sheet.Sheets[sheetNameList[0]],
    );

    await this.validateOparations(jsonData);

    return jsonData;
  }

  

  async validateOparations(data: TrasactionsDto[]) {

    console.log(data.length)
    const numbersAmountNegatives = data.filter((index) => {
      if (index.amount < 0) {
        return index;
      } 
    });

    const validateValorAcima  = data.filter((index) => {
      if ((index.amount / 100) > 50000) {
        return index;
      } 
    });

    const trancaoesFromDuplicates = this.getDuplicates(data)

    // const duplicatedTransactionsid = 

    console.log('----------------------------------');
    console.log('----------------------------------');
    console.log(numbersAmountNegatives.length);
    console.log(numbersAmountNegatives[0]);
    console.log('----------------------------------');
    console.log('----------------------------------');
    console.log(validateValorAcima.length);
    console.log(validateValorAcima[0]);
    console.log('----------------------------------');
    console.log('----------------------------------');
    console.log(trancaoesFromDuplicates.length);
    console.log(trancaoesFromDuplicates);
    console.log('----------------------------------');
    console.log('----------------------------------');
  }


  getDuplicates(data:TrasactionsDto[], ) {
    const map = {};
    const duplicates = [];

    const fromArray = data.map((index) => index.from)

    

    return duplicates;
}

}
