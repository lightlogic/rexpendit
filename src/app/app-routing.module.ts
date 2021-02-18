import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDetailComponent } from './orgs/org-detail/org-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgListComponent } from './orgs/org-list/org-list.component';
import { ReceiptAddComponent } from './receipts/receipt-add/receipt-add.component';
import { ReceiptListComponent } from './receipts/receipt-list/receipt-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orglist', component: OrgListComponent },
  { path: 'orgdetail', component: OrgDetailComponent },
  { path: 'receiptlist', component: ReceiptListComponent },
  { path: 'receiptadd', component: ReceiptAddComponent },
  { path: 'userdetail', component: UserDetailComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
