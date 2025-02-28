import { Module, DynamicModule } from '@nestjs/common'
import {
  ConfigModule,
  ConfigService,
  ConfigModuleOptions,
} from '@nestjs/config'
import { EnvConfigService } from './env-config.service'
import { join } from 'node:path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
    }),
  ],
  providers: [ConfigService, EnvConfigService], // Adicionando ConfigService
  exports: [ConfigService, EnvConfigService],
})
export class EnvConfigModule {
  static forRoot<ValidationOptions extends Record<string, any>>(
    options?: ConfigModuleOptions<ValidationOptions>,
  ): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          envFilePath: join(
            __dirname,
            `../../../../.env.${process.env.NODE_ENV}`,
          ),
        }),
      ],
    }
  }
}
