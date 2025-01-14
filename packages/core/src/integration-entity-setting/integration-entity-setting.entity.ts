import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	JoinColumn,
	RelationId,
	ManyToOne,
	OneToMany,
	Index
} from 'typeorm';
import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import {
	IIntegrationEntitySetting,
	IIntegrationEntitySettingTied,
	IIntegrationTenant,
	IntegrationEntity
} from '@gauzy/contracts';
import {
	IntegrationEntitySettingTied,
	IntegrationTenant,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';
import { MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmIntegrationEntitySettingRepository } from './repository/mikro-orm-integration-entity-setting.repository';

@MultiORMEntity('integration_entity_setting', { mikroOrmRepository: () => MikroOrmIntegrationEntitySettingRepository })
export class IntegrationEntitySetting extends TenantOrganizationBaseEntity implements IIntegrationEntitySetting {

	@ApiProperty({ type: () => String, enum: IntegrationEntity })
	@IsNotEmpty()
	@IsEnum(IntegrationEntity)
	@Column()
	entity: IntegrationEntity;

	@ApiProperty({ type: () => Boolean })
	@IsNotEmpty()
	@IsBoolean()
	@Column()
	sync: boolean;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * IntegrationTenant
	 */
	@ApiPropertyOptional({ type: () => IntegrationTenant })
	@ManyToOne(() => IntegrationTenant, (it) => it.entitySettings, {
		/** Database cascade action on delete. */
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	integration?: IIntegrationTenant;

	@ApiProperty({ type: () => String })
	@IsUUID()
	@RelationId((it: IntegrationEntitySetting) => it.integration)
	@Index()
	@Column()
	integrationId?: IIntegrationTenant['id'];

	/*
	|--------------------------------------------------------------------------
	| @OneToMany
	|--------------------------------------------------------------------------
	*/

	/**
	 * IntegrationEntitySettingTied
	 */
	@OneToMany(() => IntegrationEntitySettingTied, (it) => it.integrationEntitySetting, {
		cascade: true
	})
	@JoinColumn()
	tiedEntities?: IIntegrationEntitySettingTied[];
}
