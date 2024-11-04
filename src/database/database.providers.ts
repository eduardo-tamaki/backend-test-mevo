import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://nillgoterra:385a04oMizt26x1y@db-mongodb-eventx-dev-8284dc0e.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-eventx-dev',
      ),
  },
];
