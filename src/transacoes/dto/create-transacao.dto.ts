export class CreateTransacaoDto {
  origem: string;
  destino: string;
  valor: number;
  transacao_suspeita: boolean;
}
