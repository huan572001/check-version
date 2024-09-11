/* eslint-disable prettier/prettier */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';


export function initSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .addApiKey(
            {
                type: 'apiKey',
                name: 'x-api-key',
                in: 'header',
            },
            'apiKey',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
