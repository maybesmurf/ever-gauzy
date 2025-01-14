import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { TenantModule } from './../../tenant/tenant.module';
import { TimeSlot } from './time-slot.entity';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotMinute } from './time-slot-minute.entity';
import { TimeSlotService } from './time-slot.service';
import { TimeLogModule } from './../time-log/time-log.module';
import { EmployeeModule } from './../../employee/employee.module';
import { ActivityModule } from './../activity/activity.module';
import { UserModule } from './../../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
	controllers: [
		TimeSlotController
	],
	imports: [
		TypeOrmModule.forFeature([TimeSlot, TimeSlotMinute]),
		MikroOrmModule.forFeature([TimeSlot, TimeSlotMinute]),
		TenantModule,
		forwardRef(() => TimeLogModule),
		forwardRef(() => UserModule),
		forwardRef(() => EmployeeModule),
		forwardRef(() => ActivityModule),
		CqrsModule
	],
	providers: [
		TimeSlotService,
		...CommandHandlers
	],
	exports: [
		TimeSlotService,
		TypeOrmModule,
		MikroOrmModule
	]
})
export class TimeSlotModule { }
