import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  users:any
  srcImageUser:string = "http://localhost:8080/user/files/"
  term:String="";
  p:number=1;
 



  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getAllusers();
  }
 
  

  getAllusers(){
   this.userService.getAllUser().subscribe((res:any)=>{
      this.users=res;
      console.log("user : ", res);
      
    })
  }
 deleteUser(id:any){
  this.userService.deleteUser(id).subscribe(
    (res: any) => {
      console.log("deleted");
      this.getAllusers();
    })
    
 }
}