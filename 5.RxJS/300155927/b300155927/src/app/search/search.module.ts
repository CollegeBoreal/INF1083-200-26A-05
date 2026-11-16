
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule
} from '@nativescript/angular';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SearchRoutingModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule {}
