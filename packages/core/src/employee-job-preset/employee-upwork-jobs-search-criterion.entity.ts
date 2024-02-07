import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
	IEmployee,
	IEmployeeUpworkJobsSearchCriterion,
	IJobPreset,
	IJobSearchCategory,
	IJobSearchOccupation,
	JobPostTypeEnum
} from '@gauzy/contracts';
import {
	Employee,
	JobPreset,
	JobSearchCategory,
	JobSearchOccupation,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';
import { MultiORMColumn, MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmEmployeeUpworkJobsSearchCriterionRepository } from './repository/mikro-orm-employee-upwork-jobs-search-criterion.entity.repository';
import { MultiORMManyToOne } from '../core/decorators/entity/relations';

@MultiORMEntity('employee_upwork_job_search_criterion', { mikroOrmRepository: () => MikroOrmEmployeeUpworkJobsSearchCriterionRepository })
export class EmployeeUpworkJobsSearchCriterion extends TenantOrganizationBaseEntity implements IEmployeeUpworkJobsSearchCriterion {

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@MultiORMColumn({ nullable: true })
	jobPresetId?: string;

	@MultiORMManyToOne(() => JobPreset, (jobPreset) => jobPreset.employeeCriterions)
	jobPreset?: IJobPreset;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@MultiORMColumn()
	employeeId?: string;

	@MultiORMManyToOne(() => Employee, (employee) => employee.id)
	employee?: IEmployee;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@MultiORMColumn({ nullable: true })
	occupationId?: string;

	@MultiORMManyToOne(
		() => JobSearchOccupation,
		(occupation) => occupation.employeeCriterions
	)
	occupation?: IJobSearchOccupation;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@MultiORMColumn({ nullable: true })
	categoryId?: string;

	@MultiORMManyToOne(
		() => JobSearchCategory,
		(category) => category.employeeCriterions
	)
	category?: IJobSearchCategory;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@MultiORMColumn({ nullable: true })
	keyword?: string;

	@ApiProperty({ type: () => Boolean })
	@IsString()
	@IsNotEmpty()
	@MultiORMColumn({ type: 'text', nullable: true })
	jobType?: JobPostTypeEnum;
}
