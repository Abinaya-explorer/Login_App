import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule] 
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  async login() {
    const success = await this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']); 
    } else {
      const toast = await this.toastController.create({
        message: 'Invalid username or password',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
