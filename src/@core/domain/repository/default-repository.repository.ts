export interface DefaultRepository {
  insertOne(data: unknown): Promise<unknown>;
}
