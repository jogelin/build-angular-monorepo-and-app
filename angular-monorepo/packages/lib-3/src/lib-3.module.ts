/**
 * Created by JGE on 17/01/2017.
 */
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Lib2Module} from '@bamaa/lib-2';


@NgModule({
    imports: [
        HttpModule,
        Lib2Module
    ],
    providers: [],
    exports: [

    ]
})
export class Lib3Module {

    constructor(@Optional() @SkipSelf() parentModule: Lib2Module) {
        if (parentModule) {
            throw new Error('Already loaded. Import it in the AppModule only');
        }
    }

}
