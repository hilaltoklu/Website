import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UpdatePage implements OnInit {
  @Input() article: any;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  updateArticle() {
    this.modalController.dismiss({
      ...this.article,
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
