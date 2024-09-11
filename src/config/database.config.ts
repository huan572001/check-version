/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EEnvKey, ELogLevel } from 'src/constants/env.constant';
import { entities } from 'src/models/entities';

const configService = new ConfigService();

export const dbConfig = getDatabaseConfig(configService);

export const defaultConfig = {
    ...dbConfig,
    autoLoadEntities: true,
};

export interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logging: boolean | string[] | string;
    maxQueryExecutionTime: number;
    synchronize?: boolean;
}

export function getDatabaseConfig(configService: ConfigService): DatabaseConfig {

    return {
        type: configService.get<string>(EEnvKey.DB_TYPE) || "postgres",
        host: configService.get<string>(EEnvKey.DB_HOST) || "localhost",
        port: configService.get<number>(EEnvKey.DB_PORT) || 5432,
        username: configService.get<string>(EEnvKey.DB_USER) || "recipe",
        password: configService.get<string>(EEnvKey.DB_PASSWORD) || "RecipePassword",
        database: configService.get<string>(EEnvKey.DB_DATABASE) || 'checkVersion',
        logging: configService.get(EEnvKey.LOG_LEVEL) === ELogLevel.TRACE,
        maxQueryExecutionTime: configService.get<number>(EEnvKey.DB_MAX_QUERY_EXECUTION_TIME) || 5000,
        synchronize: true,
    };
}

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
    imports: [
        ConfigModule
    ],
    inject: [ConfigService],
    useFactory: () =>
        ({
            ...defaultConfig,
            entities: entities,
            logger: 'advanced-console',
            logging: true,
        }) as TypeOrmModuleOptions,
};