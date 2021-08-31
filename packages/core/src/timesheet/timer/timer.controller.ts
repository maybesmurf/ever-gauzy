import {
	Controller,
	UseGuards,
	HttpStatus,
	Post,
	Body,
	Get,
	Query
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
	ITimerToggleInput,
	ITimeLog,
	ITimerStatus,
	ITimerStatusInput,
	RolesEnum
} from '@gauzy/contracts';
import { TimerService } from './timer.service';
import { RoleGuard, TenantPermissionGuard } from './../../shared/guards';
import { Roles } from './../../shared/decorators';

@ApiTags('Timer')
@UseGuards(TenantPermissionGuard)
@Controller()
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@ApiOperation({ summary: 'Toggle timer' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'The timer has been successfully On/Off.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(RoleGuard)
	@Roles(RolesEnum.EMPLOYEE)
	@Get('/status')
	async getTimerStatus(
		@Query() query: ITimerStatusInput
	): Promise<ITimerStatus> {
		return await this.timerService.getTimerStatus(query);
	}

	@ApiOperation({ summary: 'Toggle timer' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'The timer has been successfully On/Off.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(RoleGuard)
	@Roles(RolesEnum.EMPLOYEE)
	@Post('/toggle')
	async toggleTimer(
		@Body() entity: ITimerToggleInput
	): Promise<ITimeLog> {
		return await this.timerService.toggleTimeLog(entity);
	}

	@ApiOperation({ summary: 'Start timer' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'The timer has been successfully On.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(RoleGuard)
	@Roles(RolesEnum.EMPLOYEE)
	@Post('/start')
	async startTimer(
		@Body() entity: ITimerToggleInput
	): Promise<ITimeLog> {
		return await this.timerService.startTimer(entity);
	}

	@ApiOperation({ summary: 'Stop timer' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'The timer has been successfully Off.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(RoleGuard)
	@Roles(RolesEnum.EMPLOYEE)
	@Post('/stop')
	async stopTimer(
		@Body() entity: ITimerToggleInput
	): Promise<ITimeLog> {
		return await this.timerService.stopTimer(entity);
	}
}
