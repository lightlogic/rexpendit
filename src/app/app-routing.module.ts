import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationListComponent } from './organisations/organisation-list/organisation-list.component';
//import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  //  { path: '', component: HomepageComponent },
  { path: 'list', component: OrganisationListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
