import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }
  async login(email:string,password:string): Promise<boolean>{  
    if(email &&password)
    {
      await this._storage?.set('isAuthenticated',true);
      return true;
    }
    return false;
  }
  async logout()
  {
    await this._storage?.remove('isAuthenticated');
    this.router.navigate(['/login']);
  }
  async isLoggedIn():Promise<boolean>{
    return (await this._storage?.get('isAuthenticated'))===true;
  }
}
