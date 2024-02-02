import { CqrsModule } from '@nestjs/cqrs';
import { forwardRef, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrganizationProject } from './organization-project.entity';
import { OrganizationProjectController } from './organization-project.controller';
import { OrganizationProjectService } from './organization-project.service';
import { CommandHandlers } from './commands/handlers';
import { UserModule } from './../user/user.module';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/organization-projects',
				module: OrganizationProjectModule
			}
		]),
		TypeOrmModule.forFeature([OrganizationProject]),
		MikroOrmModule.forFeature([OrganizationProject]),
		CqrsModule,
		forwardRef(() => TenantModule),
		forwardRef(() => UserModule)
	],
	controllers: [OrganizationProjectController],
	providers: [OrganizationProjectService, ...CommandHandlers],
	exports: [TypeOrmModule, MikroOrmModule, OrganizationProjectService]
})
export class OrganizationProjectModule { }
