import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import github from './config/github';
import twitter from './config/twitter';
import facebook from './config/facebook';
import google from './config/google';
import linkedin from './config/linkedin';
import microsoft from './config/microsoft';

@Global()
@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			load: [github, twitter, facebook, google, linkedin, microsoft],
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService]
})
export class ConfigModule { }
