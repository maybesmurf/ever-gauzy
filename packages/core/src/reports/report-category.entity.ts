import { Index, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { IReport, IReportCategory } from '@gauzy/contracts';
import { BaseEntity, Report } from '../core/entities/internal';
import { MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmReportCategoryRepository } from './repository/mikro-orm-report-category.repository';
import { MultiORMOneToMany } from '../core/decorators/entity/relations';

@MultiORMEntity('report_category', { mikroOrmRepository: () => MikroOrmReportCategoryRepository })
export class ReportCategory extends BaseEntity implements IReportCategory {

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	name?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@Column({ nullable: true })
	iconClass?: string;

	@ApiProperty({ type: () => Report })
	@MultiORMOneToMany(() => Report, (report) => report.category, {
		cascade: true
	})
	reports: IReport[];
}
