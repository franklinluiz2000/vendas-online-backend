import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  complement: string;

  @IsNumber({}, { message: 'O campo número deve ser um número' })
  numberAddress: number;

  @IsString()
  cep: string;

  @IsNumber()
  cityId: number;
}
