import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDetailComponent } from './orgs/org-detail/org-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgListComponent } from './orgs/org-list/org-list.component';
import { ReimbAddComponent } from './reimbs/reimb-add/reimb-add.component';
import { ReimbListComponent } from './reimbs/reimb-list/reimb-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'orglist', component: OrgListComponent },
  { path: 'orgdetail', component: OrgDetailComponent },
  { path: 'reimblist', component: ReimbListComponent },
  { path: 'reimbadd', component: ReimbAddComponent },
  { path: 'userdetail', component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
