import { Component } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginPage {

  username: string = '';
  password: string = '';

   girisYap() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);

    console.log('Kullanıcı bilgileri kaydedildi!');
  }

  constructor() { }


  // Oturum açma sayfası yüklendiğinde, kullanıcı bilgilerini kontrol et
  // Eğer kullanıcı bilgileri varsa, bu bilgileri form alanlarına doldur
  ngOnInit() {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');

  if (savedUsername && savedPassword) {
    this.username = savedUsername;
    this.password = savedPassword;
  }
}



}
