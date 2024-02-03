import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Index } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { RolesEnum, IRolePermission, IRole } from '@gauzy/contracts';
import { RolePermission, TenantBaseEntity } from '../core/entities/internal';
import { MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmRoleRepository } from './repository/mikro-orm-role.repository';
import { MultiORMOneToMany } from '../core/decorators/entity/relations';

@MultiORMEntity('role', { mikroOrmRepository: () => MikroOrmRoleRepository })
export class Role extends TenantBaseEntity implements IRole {

	@ApiProperty({ type: () => String, enum: RolesEnum })
	@IsNotEmpty()
	@Index()
	@Column()
	name: string;

	@ApiPropertyOptional({ type: () => Boolean, default: false })
	@IsOptional()
	@IsBoolean()
	@Column({ default: false })
	isSystem?: boolean;

	/*
	|--------------------------------------------------------------------------
	| @OneToMany
	|--------------------------------------------------------------------------
	*/

	/**
	 * Role Permissions
	 */
	@MultiORMOneToMany(() => RolePermission, (it) => it.role, {
		cascade: true
	})
	rolePermissions?: IRolePermission[];
}
