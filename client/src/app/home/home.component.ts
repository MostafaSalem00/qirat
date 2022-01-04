import { Component, OnInit } from '@angular/core';
// declare var homeObject: any;
declare var main2: any;
// https://stackoverflow.com/questions/44817349/how-do-i-include-a-javascript-script-file-in-angular-and-call-a-function-from-th
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    //webGlObject.init();
    main2.init();
    //homeObject.init();
  }

}
