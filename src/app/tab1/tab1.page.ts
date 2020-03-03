import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	user: any = { id: '', gender: '', name: '', dob: '', time: '' };

	constructor(
	  	private router: Router, 
	    private storage: Storage,
	  	private route: ActivatedRoute,
	  	private location: Location
    	){}

	genID () {
	  // Math.random should be unique because of its seeding algorithm.
	  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
	  // after the decimal.
	  return '_' + Math.random().toString(36).substr(2, 9);
	};

	ionViewDidEnter(){
		let userID = this.route.snapshot.params['userID'];
		if (userID){
			this.storage.get(userID).then(x => {
				this.user = JSON.parse(x);
			})
		}
	}

	goBack(){
		this.location.back();
	}

	navigate(personId){

		let dob = moment(this.user.dob);
		let getDate = parseInt(dob.format('D'));
		let getMonth = parseInt(dob.format('M'));
		let getYear = parseInt(dob.format('Y'));
		let getHour = parseInt(dob.format('HH'));
		let getMinute = parseInt(dob.format('mm'));

		this.user.id = (this.user.id == "") ? this.genID() : this.user.id;
	 	this.storage.set(this.user.id, JSON.stringify(this.user));
		this.router.navigate(['/tabs/tab1/result/'+this.user.id]);
	}
}
