import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user.edit',
  templateUrl: './user.edit.html',
  styleUrls: ['./user.edit.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserInfoEditModalPage implements OnInit {
  @Input() userData: any;
  showPassword : boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  saveChanges() {
    this.modalController.dismiss(this.userData);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
