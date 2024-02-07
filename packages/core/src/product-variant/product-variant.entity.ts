import {
	RelationId,
	JoinColumn,
	JoinTable,
	Index
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IProductVariant,
	BillingInvoicingPolicyEnum,
	IProductTranslatable,
	IProductVariantPrice,
	IProductVariantSetting,
	IProductOptionTranslatable,
	IWarehouseProductVariant
} from '@gauzy/contracts';
import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import {
	ImageAsset,
	Product,
	ProductOption,
	ProductVariantPrice,
	ProductVariantSetting,
	TenantOrganizationBaseEntity,
	WarehouseProductVariant
} from '../core/entities/internal';
import { MultiORMColumn, MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmProductVariantRepository } from './repository/mikro-orm-product-variant.repository';
import { MultiORMManyToMany, MultiORMManyToOne, MultiORMOneToMany, MultiORMOneToOne } from '../core/decorators/entity/relations';

@MultiORMEntity('product_variant', { mikroOrmRepository: () => MikroOrmProductVariantRepository })
export class ProductVariant extends TenantOrganizationBaseEntity implements IProductVariant {
	@ApiProperty({ type: () => Number })
	@IsNumber()
	@MultiORMColumn({ default: 0 })
	taxes: number;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@MultiORMColumn({ nullable: true })
	notes: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@MultiORMColumn({ default: 0 })
	quantity: number;

	@ApiProperty({ type: () => String })
	@IsEnum(BillingInvoicingPolicyEnum)
	@MultiORMColumn({ default: BillingInvoicingPolicyEnum.QUANTITY_ORDERED })
	billingInvoicingPolicy: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@MultiORMColumn({ nullable: true })
	internalReference: string;

	@ApiPropertyOptional({ type: () => Boolean })
	@MultiORMColumn({ default: true })
	enabled: boolean;

	/*
	|--------------------------------------------------------------------------
	| @OneToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * ProductVariantPrice
	 */
	@MultiORMOneToOne(() => ProductVariantPrice, (variantPrice) => variantPrice.productVariant, {
		/** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
		eager: true,

		/** Database cascade action on delete. */
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	price: IProductVariantPrice;

	/**
	 * ProductVariantSetting
	 */
	@MultiORMOneToOne(() => ProductVariantSetting, (settings) => settings.productVariant, {
		/** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
		eager: true,

		/** Database cascade action on delete. */
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	setting: IProductVariantSetting;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * Product
	 */
	@ApiProperty({ type: () => Product })
	@MultiORMManyToOne(() => Product, (product) => product.variants, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	product?: IProductTranslatable;

	@ApiProperty({ type: () => String })
	@RelationId((it: ProductVariant) => it.product)
	@IsString()
	@Index()
	@MultiORMColumn({ nullable: true })
	productId?: string;

	/**
	 * ImageAsset
	 */
	@ApiProperty({ type: () => ImageAsset })
	@MultiORMManyToOne(() => ImageAsset, {
		/** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
		eager: true,
	})
	@JoinColumn()
	image?: ImageAsset;

	@ApiProperty({ type: () => String })
	@RelationId((it: ProductVariant) => it.image)
	@IsString()
	@Index()
	@MultiORMColumn({ nullable: true })
	imageId?: string;

	/*
	|--------------------------------------------------------------------------
	| @OneToMany
	|--------------------------------------------------------------------------
	*/

	/**
	 * ProductOption
	 */
	@ApiProperty({ type: () => WarehouseProductVariant, isArray: true })
	@MultiORMOneToMany(() => WarehouseProductVariant, (warehouseProductVariant) => warehouseProductVariant.variant, {
		cascade: true
	})
	warehouseProductVariants?: IWarehouseProductVariant[];

	/*
	|--------------------------------------------------------------------------
	| @ManyToMany
	|--------------------------------------------------------------------------
	*/

	/**
	 * ProductOption
	 */
	@ApiProperty({ type: () => ProductOption })
	@MultiORMManyToMany(() => ProductOption, { eager: true })
	@JoinTable()
	options: IProductOptionTranslatable[];
}
