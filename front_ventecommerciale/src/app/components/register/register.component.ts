import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  text: string = "text pardefaut"
  formClient:FormGroup
  alert:boolean=false
  fileUpload:Array<File>=[];

  constructor(private formBuilder:FormBuilder, private clientService:ClientService , private route: Router) { }

  ngOnInit(): void {
this.formClient=this.formBuilder.group({
  nom:"",
      prenom:"",
      mail:"",
      password:"",
      numtel: "",
     adresse:"",
    image:"",

})

this.getAllClient();
}
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

addClient() {
  console.log(this.formClient.value)

  let formData = new FormData();
  formData.append("nom", this.formClient.value.nom);
  formData.append("prenom", this.formClient.value.prenom);
  formData.append("mail", this.formClient.value.mail);
  formData.append("password", this.formClient.value.password);
  formData.append("numtel", this.formClient.value.numtel);
  formData.append("adresse", this.formClient.value.adresse);
  formData.append("file",this.fileUpload[0]);

  this.clientService.saveClient(formData).subscribe(
    (res: any) => {
      console.log("add ");
      this.getAllClient()
      window.scrollTo(0,0)
      this.alert=true
      this.formClient.reset({})

    })}
    getAllClient() {
      this.clientService.getAllClient().subscribe(
        (response: any) => console.log("fournisseur is : ", response))
    }
    closeAlert(){
      this.alert=false
    }
  }
