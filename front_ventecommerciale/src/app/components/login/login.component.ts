import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formClient:FormGroup
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  formUser: FormGroup
  user: User;
  affichageErreu: boolean = false;
  token: string = localStorage.getItem('token');

  
  constructor(private clientService:ClientService, private authService: AuthenticationService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
   }}

  ngOnInit(): void {
    this.formClient= this.formBuilder.group({
    
      username: '',

      password: '',
      role:'',
  });
  this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }
  userauth() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formClient.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.formClient.value.username, this.formClient.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data != null) {
            if (data.role == 'client') {
              this.user = data;
              localStorage.setItem('role', data.role)
              localStorage.setItem('nombre','0')
              console.log("role", data.role)
              localStorage.setItem('user', JSON.stringify(this.user))
              this.router.navigate([this.returnUrl]);
            }
          } else {
            this.affichageErreu = true
            console.log('here else');

          }

        },
        error => {
          this.affichageErreu = true;
          this.error = error;
          this.loading = false;
        });
  }

}