import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: HTMLIonLoadingElement | undefined;

  constructor(private loadingController: LoadingController) { }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Lütfen bekleyin...',
      duration: 2000
    });
    await this.loading.present();
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
