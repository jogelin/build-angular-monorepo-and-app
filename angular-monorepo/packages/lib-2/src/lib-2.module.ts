/**
 * Created by JGE on 17/01/2017.
 */
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule, Http} from '@angular/http';
import {
    TranslateStaticLoader,
    TranslateLoader,
    TranslateModule,
    TranslatePipe,
    TranslateDirective
} from 'ng2-translate';

export function translateLoaderFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    imports: [
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (translateLoaderFactory),
            deps: [Http]
        })
    ],
    providers: [],
    exports: [
        TranslatePipe,
        TranslateDirective
    ]
})
export class Lib2Module {

    constructor(@Optional() @SkipSelf() parentModule: Lib2Module) {
        if (parentModule) {
            throw new Error('Already loaded. Import it in the AppModule only');
        }
    }

}
