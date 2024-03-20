import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interm',
  templateUrl: './interm.component.html',
  styleUrls: ['./interm.component.css']
})
export class IntermComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl("listprod")

  }

}
