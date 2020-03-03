import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	users: any = [];
  constructor(
  	private router: Router, 
	  	private route: ActivatedRoute,
	  	private storage: Storage,
	  	public alertController: AlertController) {}

  	ionViewDidEnter() {

  		let users = [];

		this.storage.forEach( (value, key, index) => {
			// console.log({value, key, index});
			users.push(JSON.parse(value));
		});

		this.users = users;



	}

	async presentAlertConfirm(id) {
	    const alert = await this.alertController.create({
	      header: 'Are you sure to delete?',
	      buttons: [
	        {
	          text: 'Cancel',
	          role: 'cancel',
	          cssClass: 'secondary',
	          handler: (blah) => {
	            
	          }
	        }, {
	          text: 'Yes',
	          handler: () => {
          		this.storage.remove(id);
				
				for (let i = 0; i < this.users.length; i ++){
					if (this.users[i].id == id){
						this.users.splice(i, 1);
					}
				}
	          }
	        }
	      ]
	    });

	    await alert.present();
	  }

	navigate(id){
		this.router.navigate(['/tabs/tab1/result/'+id]);
	}

	edit(id){
		this.router.navigate(['/tabs/tab1/'+id]);
	}

	delete(id){
		this.presentAlertConfirm(id);
	}

}
