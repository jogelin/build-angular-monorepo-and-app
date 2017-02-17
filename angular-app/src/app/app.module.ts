import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Lib1Module} from '@bamaa/lib-1';
import {Lib2Module} from '@bamaa/lib-2';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Lib1Module,
        Lib2Module
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
