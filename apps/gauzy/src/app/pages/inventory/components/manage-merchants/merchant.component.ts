import { Component } from '@angular/core';

@Component({
	selector: 'ga-merchant-layout-selector',
	template: `
		<div class="content">
			<router-outlet></router-outlet>
		</div>
	`
})
export class MerchantComponent { }
