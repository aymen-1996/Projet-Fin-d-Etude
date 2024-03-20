import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  formUser: FormGroup
  user: User;
  affichageErreu: boolean = false;
  token: string = localStorage.getItem('token');


  constructor(private authService: AuthenticationService, private userService: UserService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    if (this.authService.currentUserValue ) {
      this.router.navigate(['/']);
    }


  }

  ngOnInit(): void {

    this.formUser = this.formBuilder.group({

      username:['', Validators.required],

      password: ['', Validators.required],
      enabled: ''
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }
  userauth() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formUser.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.formUser.value.username, this.formUser.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data !=null) {
            if (data.role == 'fournisseur' && data.enabled != false ) {
              this.user = data;
              localStorage.setItem('role', data.role)
              console.log("role", data.role)
              localStorage.setItem('user', JSON.stringify(this.user))
              this.router.navigate(['listproduit']);
            }
            if (data !=null) {
              if (data.role == 'admin') {
                this.user = data;
                localStorage.setItem('role', data.role)
                console.log("role", data.role)
                localStorage.setItem('user', JSON.stringify(this.user))
                this.router.navigate(['dashboard']);
              }}
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

};
    //  userauth(){
    //   this.authService.login(this.formUser.value.username,this.formUser.value.password).subscribe((res:any)=>{
    //   console.log("data",res);
    //   console.log("user",res.user);
    //   console.log("user.enable",res.user.enabel);
    //   console.log("user.role",res.user.role);
    //   if(res!=null  ){
    //     if(res.user.role=='fournisseur' && res.user.enabel !=false  || res.user.role=='admin' ){
    //    this.users=res.user;
    //    localStorage.setItem('token',res.token)
    //    localStorage.setItem('state','Bearer'+'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaG91YWliaWF5bWVuMDNAZ21haWwuY29tIiwiY3JlYXRlZCI6MTY1NjcwNDc5OTgwMywiZXhwIjoxNzE3MTg0Nzk5fQ.4cFpA1r7q1dWeX77-tFfa6KU9BKn2YW2bCAkgQaPW8zQgPU3sdvmwQhAlUtT27-_ML8dJBs45Jey4IfUVUgR8g')
    //    localStorage.setItem('role',res.user.role)
    //    console.log("role",res.user.role)
    //   localStorage.setItem('user',JSON.stringify(this.users))
    //    this.router.navigateByUrl('');}
    //   }else {

    //     this.affichageErreu=true
    //     console.log('here else');

    //   }

    //  });

    //    }






