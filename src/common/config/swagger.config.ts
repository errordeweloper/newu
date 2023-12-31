import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('Instagram.com')
    .setDescription('API for writing posts')
    .setVersion('1.0')
    .addTag('Endpoints')
    .build();