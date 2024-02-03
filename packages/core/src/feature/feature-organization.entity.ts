import { ApiProperty } from '@nestjs/swagger';
import { Column, Index, JoinColumn, RelationId } from 'typeorm';
import { IFeature, IFeatureOrganization } from '@gauzy/contracts';
import {
	Feature,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';
import { IsString } from 'class-validator';
import { MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmFeatureOrganizationRepository } from './repository/mikro-orm-feature-organization.repository';
import { MultiORMManyToOne } from '../core/decorators/entity/relations';

@MultiORMEntity('feature_organization', { mikroOrmRepository: () => MikroOrmFeatureOrganizationRepository })
export class FeatureOrganization extends TenantOrganizationBaseEntity implements IFeatureOrganization {

	@Column({ default: true })
	isEnabled: boolean;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * Feature
	 */
	@ApiProperty({ type: () => Feature })
	@MultiORMManyToOne(() => Feature, (feature) => feature.featureOrganizations, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	feature: IFeature;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: FeatureOrganization) => it.feature)
	@IsString()
	@Index()
	@Column()
	readonly featureId: string;
}
