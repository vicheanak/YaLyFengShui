import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	user: any = { id: '1', gender: 'Female', name: 'Ya Ly', dob: '1988-05-24T19:34:22.033+07:00', time: '2020-03-02T15:34:22.034+07:00' };

	constructor(
	  	private router: Router, 
	    private storage: Storage
    	){}

	genID () {
	  // Math.random should be unique because of its seeding algorithm.
	  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
	  // after the decimal.
	  return '_' + Math.random().toString(36).substr(2, 9);
	};
	navigate(personId){

		console.log('user ==> ', this.user);

		let dob = moment(this.user.dob);
		let getDate = parseInt(dob.format('D'));
		let getMonth = parseInt(dob.format('M'));
		let getYear = parseInt(dob.format('Y'));
		let getHour = parseInt(dob.format('HH'));
		let getMinute = parseInt(dob.format('mm'));

		console.log({getDate, getMonth, getYear, getHour, getMinute});
		let ID = this.genID();
		this.user.id = ID 
	 	this.storage.set(this.user.id, JSON.stringify(this.user));

	 // 	this.storage.keys().then((val) => {
	 // 		let id = (val.length) ? 1 : val.length + 1;
	 // 		console.log({val, id});
	 // 		this.storage.set(this.genID(), JSON.stringify(this.user));
		// 	// val.forEach((i) => {
		// 	// 	console.log({i});
		// 	// 	let id = i + 1;
		// 		// this.storage.remove(i);
		// 		// this.storage.get(i).then(x => {
		// 		// 	console.log({i, x});
		// 		// });
		// 	// });
		// });

		// this.storage.keys().then((val) => {
		// 	val.forEach((i) => {
		// 		this.storage.remove(i);
		// 		this.storage.get(i).then(x => {
		// 			console.log({i, x});
		// 		});
		// 	});
		// });
		// Or to get a key/value pair
		// this.storage.get('age').then((val) => {
		// 	console.log('age', val);
		// });

		this.router.navigate(['/tabs/tab1/result/'+ID]);
	}
}
