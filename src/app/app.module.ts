import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@web/app/auth/auth.module';
import { AppRoutingModule } from '@web/app/app-routing.module';
import { AppLangModule } from '@web/app/app-lang.module';
import { AppGraphqlModule } from '@web/app/app-graphql.module';
import { SharedModule } from '@web/app/shared/shared.module';
import { CoreModule } from '@web/app/core/core.module';

import { IndexPageCoreComponent } from '@web/app/core/containers/index-page-core/index-page-core.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    AppLangModule,
    AppGraphqlModule,
    SharedModule,
    CoreModule.forRoot()
  ],
  bootstrap: [IndexPageCoreComponent]
})
export class AppModule { }
