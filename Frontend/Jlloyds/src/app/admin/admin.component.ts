import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  companies=[]
  constructor(private http: Http){

  }

  deactivateCompany(company_id){
    console.log("Company ID",company_id);
    this.http.put(`http://localhost:3000/company/${company_id}`,{}).subscribe((response:any)=>{
      console.log("Response",response);
      window.location.reload();
    },err=>{
      console.log("Error",err);
    });
  }

  ngOnInit() {
    this.http.get("http://localhost:3000/companies").subscribe((response:any) => {
      console.log("Response",response);
      this.companies = JSON.parse(response._body);
      console.log(this.companies)
    },err=>{
      console.log("Error",err);
    });
  }

}
