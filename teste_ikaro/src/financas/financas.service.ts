import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { CreateFinancaDto } from './dto/create-financa.dto';
import { UpdateFinancaDto } from './dto/update-financa.dto';
import { TrasactionsDto } from './dto/transaction.dto';
import { TransactionInvalidDto } from './dto/transaction_invalida.dto';

@Injectable()
export class FinancasService {
  async create(filePath: string) {
    const { arrayNotValid, arrayValid } =
      await this.converterFileInJson(filePath);

    return {
      arrayValid,
      arrayNotValid,
    };
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

    const { arrayNotValid, arrayValid } =
      await this.validateOparations(jsonData);

    this.deteleFile(filePath);

    return {
      arrayValid,
      arrayNotValid,
    };
  }

  async validateOparations(data: TrasactionsDto[]) {
    const trancacoesDuplicates = this.searchDuplicates(data).map((index) => {
      return {
        from: index.from,
        to: index.to,
        amount: index.amount,
        description: 'value_duplicated',
      };
    }) as TransactionInvalidDto[];

    const numbersAmountNegatives = data
      .filter((index) => {
        if (index.amount < 0) {
          return {
            ...index,
          };
        }
      })
      .map((index) => {
        return {
          ...index,
          description: 'value_negative',
        };
      }) as TransactionInvalidDto[];

    const validateValorAcima: TransactionInvalidDto[] = data
      .filter((index) => {
        if (index.amount / 100 > 50000) {
          return {
            ...index,
          };
        }
        return;
      })
      .map((index) => {
        return { ...index, description: 'value_above_limit' };
      }) as TransactionInvalidDto[];

    const valorAcima = this.separatorArrayDuplicatesAndValueAbove(
      trancacoesDuplicates,
      validateValorAcima,
    );

    console.log('Negative array', numbersAmountNegatives.length);
    console.log('Acima do valor array', valorAcima.length);
    console.log('Duplicated array', trancacoesDuplicates.length);

    const arrayFinal = numbersAmountNegatives.concat(
      valorAcima,
      trancacoesDuplicates,
    );

    const dataFinal = this.separatorArrayValidAndNotValid(data, arrayFinal);

    return {
      arrayValid: dataFinal,
      arrayNotValid: arrayFinal,
    };
  }
  searchDuplicates(data: TrasactionsDto[]) {
    const duplicates = [];

    const newData = data.map((index) => {
      return {
        ...index,
        verificador: `${index.from}-${index.to}-${index.amount}`,
      };
    });

    for (let i = 0; i < data.length; i++) {
      const { from, to, amount } = data[i];
      const item = `${from}-${to}-${amount}`;

      const filter = newData.filter((filter) => filter.verificador === item);

      if (filter.length >= 2) {
        duplicates.push(filter[0]);
      }
    }

    return duplicates;
  }

  separatorArrayValidAndNotValid(
    data: TrasactionsDto[],
    dataNotValid: TransactionInvalidDto[],
  ) {
    const newData = data.map((index) => {
      return {
        ...index,
        verificador: `${index.from}-${index.to}-${index.amount}`,
      };
    });
    const newNotValidData = dataNotValid.map((index) => {
      return {
        ...index,
        verificador: `${index.from}-${index.to}-${index.amount}`,
      };
    });

    const dataValid: TrasactionsDto[] = newData.filter((filter) => {
      if (
        newNotValidData.some(
          (some) => some.verificador === filter.verificador,
        ) === false
      ) {
        return {
          ...filter,
        };
      }
    });

    return dataValid;
  }

  separatorArrayDuplicatesAndValueAbove(
    dataDuplicates: TransactionInvalidDto[],
    dataValorAcima: TransactionInvalidDto[],
  ) {
    const newDuplicates = dataDuplicates.map((index) => {
      return {
        ...index,
        verificador: `${index.from}-${index.to}-${index.amount}`,
      };
    });
    const newDataValorAcima = dataValorAcima.map((index) => {
      return {
        ...index,
        verificador: `${index.from}-${index.to}-${index.amount}`,
      };
    });

    const dataAcimaValorFinal: TransactionInvalidDto[] = newDataValorAcima
      .filter((filter) => {
        if (
          newDuplicates.some(
            (some) => some.verificador === filter.verificador,
          ) === false
        ) {
          return {
            ...filter,
          };
        }
      })
      .map((index) => {
        const { verificador, ...resto } = index;
        return resto;
      });
    return dataAcimaValorFinal;
  }

  deteleFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('--------------------------------');
        console.log(`${filePath} deletado com sucesso.`);
        console.log('--------------------------------');
      }
    });
  }
}
