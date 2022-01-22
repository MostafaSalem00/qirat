import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetalApiService } from '../shared/services/metal-api.service';
declare var main2: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  recentMetalList$: Observable<any[]>;
  
  constructor(private metalApiService: MetalApiService) { }

  ngOnInit(): void {
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
