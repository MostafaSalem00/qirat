import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetalApiService } from '../shared/services/metal-api.service';
// declare var homeObject: any;
declare var main2: any;
// https://stackoverflow.com/questions/44817349/how-do-i-include-a-javascript-script-file-in-angular-and-call-a-function-from-th
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentMetalList$: Observable<any[]>;
  constructor(private metalApiService: MetalApiService) { }

  ngOnInit(): void {
    //webGlObject.init();
    main2.init();
    this.metalApiService.fetchMetalEveryXSecond();
    this.recentMetalList$ = this.metalApiService.currentMetalList$.pipe(
      tap(data => {
        console.log(data);
    }));
  }

  ngOnDestroy(): void {
    this.metalApiService.subscription.unsubscribe();
  }

}
