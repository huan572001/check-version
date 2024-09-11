/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class AppDto {
    @MinLength(1)
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'name app',
        example:
            'huan',
        required: false,
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'name app',
        example:
            '0.0.1',
        required: false,
    })
    version: string
}