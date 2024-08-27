import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  origem: string;

  @Column({ type: 'varchar' })
  destino: string;

  @Column({ type: 'double' })
  valor: number;

  @Column({ type: 'boolean' })
  transacao_suspeita: boolean;
}
