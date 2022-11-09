import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/website/header/header.component';
import { FooterComponent } from './components/website/footer/footer.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { PreviewDialogComponent } from './components/shared/dialogs/preview-dialog/preview-dialog.component';
import { WebsiteComponent } from './components/website/website.component';
import { HomePageComponent } from './components/website/home-page/home-page.component';
import { MonitoringPageComponent } from './components/website/monitoring-page/monitoring-page.component';
import { PublicationsPageComponent } from './components/website/publications-page/publications-page.component';
import { ContactPageComponent } from './components/website/contact-page/contact-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './services/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    PreviewDialogComponent,
    WebsiteComponent,
    HomePageComponent,
    MonitoringPageComponent,
    PublicationsPageComponent,
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
