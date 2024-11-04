import { Connection } from 'mongoose';
import { ImportSchema } from '../schemas/import.schema';

export const importsProviders = [
  {
    provide: 'IMPORT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Import', ImportSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
