import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TokenComponent } from './token/token.component';
import { TokenModule } from './token.module';



const routes: Routes = [
  { path: '', component: TokenComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TokenModule
  ]
})
export class TokenRoutingModule { }
