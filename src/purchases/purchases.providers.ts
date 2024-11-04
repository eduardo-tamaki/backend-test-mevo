import { Connection } from 'mongoose';
import { PurchaseSchema } from '../schemas/purchase.schema';

export const purchasesProviders = [
  {
    provide: 'PURCHASE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Purchase', PurchaseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
