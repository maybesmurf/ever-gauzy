import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { Language } from './language.entity';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
	imports: [
		RouterModule.register([{ path: '/languages', module: LanguageModule }]),
		TypeOrmModule.forFeature([Language]),
		MikroOrmModule.forFeature([Language]),
		UserModule
	],
	controllers: [LanguageController],
	providers: [LanguageService],
	exports: [LanguageService]
})
export class LanguageModule { }
