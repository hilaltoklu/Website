import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from 'src/app/pages/services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingResolver implements Resolve<any> {

  constructor(private loadingService: LoadingService) { }

  resolve(): Promise<any> {
    return new Promise(async (resolve) => {
      await this.loadingService.showLoading();
      setTimeout(() => {
        this.loadingService.hideLoading();
        resolve(true);
      }, 100);
    });
  }
}
