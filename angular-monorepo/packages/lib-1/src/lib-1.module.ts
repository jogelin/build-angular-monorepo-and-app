/**
 * Created by JGE on 17/01/2017.
 */
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [],
    exports: []
})
export class Lib1Module {
    constructor(@Optional() @SkipSelf() parentModule: Lib1Module) {
        if (parentModule) {
            throw new Error('Already loaded. Import it in the AppModule only');
        }
    }
}
