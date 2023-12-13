import { NgModule } from '@angular/core';

import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [PublicRoutingModule, CommonModule],
  providers: [],
  bootstrap: [PublicComponent],
})
export class PublicModule {}
