import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyApiService } from '../../services/currency-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectComponent {
  @Input() baseOpt!: any;
  @Input() baseCurrency!: string;

  constructor (
    private currencySvc: CurrencyApiService
  ) { }

  public async selectRate(event): Promise<void> {
    await this.currencySvc.setBaseCurrency(event.value);
    this.currencySvc.getBaseCompareLatest(event.value).pipe(take(1)).subscribe(rates => {
      this.currencySvc.updateFavorite();
    });
  }

}
