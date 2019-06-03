import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showregister= true;
  constructor(private http: Http, private notifierService: NotifierService){

  }

  showAdmin(){
    this.showregister = false;
  }

  showRegister(){
    this.showregister = true;
  }

  onClickSubmit(data){
    console.log("Submit Data",data);
    this.http.post("http://localhost:3000/register",data).subscribe((response) => {
      console.log("Response",response);
      this.notifierService.notify( 'success', 'Company Registered successfully!  Go to admin tab for checking the registered company' );
    },err=>{
      console.log("Error",err);
      this.notifierService.notify( 'error', String(err._body) );
    });
  }


}
