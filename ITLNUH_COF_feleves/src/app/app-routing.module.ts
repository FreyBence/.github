import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AddTreeComponent } from './add-tree/add-tree.component';
import { DeleteTreeComponent } from './delete-tree/delete-tree.component';
import { UpdateTreeComponent } from './update-tree/update-tree.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add', component: AddTreeComponent, canActivate: [ApiService]},
  { path: 'delete', component: DeleteTreeComponent, canActivate: [ApiService]},
  { path: 'update/:id', component: UpdateTreeComponent, canActivate: [ApiService]},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
