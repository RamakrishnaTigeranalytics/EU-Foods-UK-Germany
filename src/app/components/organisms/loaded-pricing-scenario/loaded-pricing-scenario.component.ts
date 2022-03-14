import { Component, OnInit,Input } from '@angular/core';
import { ListPromotion } from '@core/models';

@Component({
  selector: 'nwn-loaded-pricing-scenario',
  templateUrl: './loaded-pricing-scenario.component.html',
  styleUrls: ['./loaded-pricing-scenario.component.css']
})
export class LoadedPricingScenarioComponent implements OnInit {
  @Input()
  promotion_viewed : ListPromotion = null as any

  constructor() { }

  ngOnInit(): void {
  }

}
