import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {
  user:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageUser:string = "http://localhost:8080/user/files/"
  formUser: FormGroup
  hidden:boolean=false;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    console.log(this.id)
    this.userById()
    
    this.formUser = this.formBuilder.group({
      nom: "",
      prenom: "",
      mail: "",
      password: "",
      numtel: "",
    })

  }
  userById(){
    this.userService.getById(this.id).subscribe((res:any)=>{
      this.user=res
      this.srcImageUser=this.srcImageUser + this.user.image
      console.log("src image",this.srcImageUser)
      console.log("user",this.user)
      
    });
    
  }

  updateUser() {    
    this.userService.updateUser(this.formUser.value, this.id).subscribe((res: any) => {
      
      console.log("user", this.user)
      this.route.navigateByUrl('/listuser')
    });
     console.log("here user to update : ",this.formUser.value);
  }


  update(){
    this.hidden=true
    this.formUser.patchValue({
      nom:this.user.nom,
      prenom:this.user.prenom,
      mail:this.user.mail,
      password:this.user.password,
      numtel:this.user.numtel
    })
  }
    
  }


