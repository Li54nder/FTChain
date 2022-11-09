import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './components/website/contact-page/contact-page.component';
import { HomePageComponent } from './components/website/home-page/home-page.component';
import { MonitoringPageComponent } from './components/website/monitoring-page/monitoring-page.component';
import { PublicationsPageComponent } from './components/website/publications-page/publications-page.component';
import { WebsiteComponent } from './components/website/website.component';

const routes: Routes = [
  {path: '', component: WebsiteComponent, children: [
    { path: '', component: HomePageComponent},
    { path: 'monitoring', component: MonitoringPageComponent},
    { path: 'publications', component: PublicationsPageComponent},
    { path: 'contact', component: ContactPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
