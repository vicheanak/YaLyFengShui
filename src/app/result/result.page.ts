import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

	user: any = { 
		id: '', 
		gender: '', 
		name: '', 
		dob: '', 
		time: '', 
		HT: {}, 
		ET: {},
		HD: {},
		ED: {},
		HM: {},
		EM: {},
		HY: {},
		EY: {},
		hiddenT: [],
		hiddenD: [],
		hiddenM: [],
		hiddenY: [],
		veyChors: [],
		favorable: {},
		yearList: [],
		monthList: [],
		unluckyElement: "",
		unluckyElementColor: "",
		winElement: {},
		lostElement: {},
		motherElement: {},
		childElement: {},
		selfElement: {}
	 };

	HTable: any = {
			"H1": {
				"Element": "Wood",
				"Sign": "+",
				"Color": "green",
				"Chinese": "甲",
				"English": "Jia",
				"Shortcut": "H1",
				"Acro": "W"
			},
			"H2": {
				"Element": "Wood",
				"Sign": "-",
				"Color": "green",
				"Chinese": "乙",
				"English": "Yi",
				"Shortcut": "H2",
				"Acro": "W"
			},
			"H3": {
				"Element": "Fire",
				"Sign": "+",
				"Color": "red",
				"Chinese": "丙",
				"English": "Bing",
				"Shortcut": "H3",
				"Acro": "F"
			},
			"H4": {
				"Element": "Fire",
				"Sign": "-",
				"Color": "red",
				"Chinese": "丁",
				"English": "Ding",
				"Shortcut": "H4",
				"Acro": "F"
			},
			"H5": {
				"Element": "Earth",
				"Sign": "+",
				"Color": "brown",
				"Chinese": "戊",
				"English": "Wu",
				"Shortcut": "H5",
				"Acro": "E"
			},
			"H6": {
				"Element": "Earth",
				"Sign": "-",
				"Color": "brown",
				"Chinese": "己",
				"English": "Ji",
				"Shortcut": "H6",
				"Acro": "E"
			},
			"H7": {
				"Element": "Metal",
				"Sign": "+",
				"Color": "grey",
				"Chinese": "庚",
				"English": "Geng",
				"Shortcut": "H7",
				"Acro": "M"
			},
			"H8": {
				"Element": "Metal",
				"Sign": "-",
				"Color": "grey",
				"Chinese": "辛",
				"English": "Xin",
				"Shortcut": "H8",
				"Acro": "M"
			},
			"H9": {
				"Element": "Water",
				"Sign": "+",
				"Color": "blue",
				"Chinese": "壬",
				"English": "Ren",
				"Shortcut": "H9",
				"Acro": "W"
			},
			"H10": {
				"Element": "Water",
				"Sign": "-",
				"Color": "blue",
				"Chinese": "癸",
				"English": "Gui",
				"Shortcut": "H10",
				"Acro": "W"
			}
		};

	ETable: any = {
			"E1": {
				"Element": "Water",
				"Sign": "+",
				"Zodiac": "Rat",
				"Color": "blue",
				"Chinese": "子",
				"English": "Zi",
				"Shortcut": "E1"
			},
			"E2": {
				"Element": "Earth",
				"Sign": "-",
				"Zodiac": "Ox",
				"Color": "brown",
				"Chinese": "丑",
				"English": "Chou",
				"Shortcut": "E2"
			},
			"E3": {
				"Element": "Wood",
				"Sign": "+",
				"Zodiac": "Tiger",
				"Color": "green",
				"Chinese": "寅",
				"English": "Yin",
				"Shortcut": "E3"
			},
			"E4": {
				"Element": "Wood",
				"Sign": "-",
				"Zodiac": "Rabbit",
				"Color": "green",
				"Chinese": "卯",
				"English": "Mao",
				"Shortcut": "E4"
			},
			"E5": {
				"Element": "Earth",
				"Sign": "+",
				"Zodiac": "Dragon",
				"Color": "brown",
				"Chinese": "辰",
				"English": "Chen",
				"Shortcut": "E5"
			},
			"E6": {
				"Element": "Fire",
				"Sign": "-",
				"Zodiac": "Snake",
				"Color": "red",
				"Chinese": "巳",
				"English": "Si",
				"Shortcut": "E6"
			},
			"E7": {
				"Element": "Fire",
				"Sign": "+",
				"Zodiac": "Horse",
				"Color": "red",
				"Chinese": "午",
				"English": "Wu",
				"Shortcut": "E7"
			},
			"E8": {
				"Element": "Earth",
				"Sign": "-",
				"Zodiac": "Sheep",
				"Color": "brown",
				"Chinese": "未",
				"English": "Wei",
				"Shortcut": "E8"
			},
			"E9": {
				"Element": "Metal",
				"Sign": "+",
				"Zodiac": "Monkey",
				"Color": "grey",
				"Chinese": "申",
				"English": "Shen",
				"Shortcut": "E9"
			},
			"E10": {
				"Element": "Metal",
				"Sign": "-",
				"Zodiac": "Rooster",
				"Color": "grey",
				"Chinese": "酉",
				"English": "You",
				"Shortcut": "E10"
			},
			"E11": {
				"Element": "Earth",
				"Sign": "+",
				"Zodiac": "Dog",
				"Color": "brown",
				"Chinese": "戌",
				"English": "Xu",
				"Shortcut": "E11"
			},
			"E12": {
				"Element": "Water",
				"Sign": "-",
				"Zodiac": "Pig",
				"Color": "blue",
				"Chinese": "亥",
				"English": "Hai",
				"Shortcut": "E12"
			},
		};

  	constructor(
	  	private router: Router, 
	  	private route: ActivatedRoute,
	  	private storage: Storage,
	  	private location: Location){}

  	ionViewDidEnter() {

		

		let HD = 5;
		let ED = 9;
		let HM = 5;
		let EM = 3;
		let HY = 7;
		let EY = 1;

		let ALL = [8,6,4,5,5,6,7,7,7,7,8,7];
		
		//Riya 7/6/1989 1:15 Day: H4 - E4, Month: H7 - E7, Year: H6 - E6 ----- Time: H8 - E2, VeyChor: 0
		//VyLy 10/20/1984 18:15 Day: H4 - E12, Month: H1 - E11, Year: H1 - E1  ------ Time: H6 - E10, VeyChor: 4
		//Robert 3/2/1984 15:32 Day: H2 - E8, Month: H3 - E3, Year: H1 - E1 ------- Time: H1 - E9, VeyChor: 1
		//Boon 1/1/1977 2:22 Day: H5 - E7, Month: H7 - E1, Year: H4 - E6 ------ Time: H10 - E2, VeyChor: 8

		let userID = this.route.snapshot.params['userID'];

		this.storage.get(userID).then(x => {
			this.user = JSON.parse(x);

			let startYear = moment("1/1/1900", "MM/DD/YYYY");

			let rangeH = 10;
			let rangeE = 12;
			let startDate = moment("2/4/1900", "MM/DD/YYYY");
			// let endDate = moment("1/1/1977", "MM/DD/YYYY");
			let endDate = moment(this.user.dob);
			let time = moment(this.user.time);
			let dd = parseInt(endDate.format('D'));
			let mm = parseInt(endDate.format('M'));
			let yy = parseInt(endDate.format('Y'));
			let dob = mm+"/"+dd+"/"+yy;

			let gender = "Male";
			// let timeHour = 1;
			// let timeMinute = 15;

			// let middleDate = moment(endDate, "MM/DD/YYYY");
			let getDate = parseInt(endDate.format('D'));
			let getMonth = parseInt(endDate.format('M'));
			let getYear = parseInt(endDate.format('Y'));
		
			//YEAR
			let myYear = this.getYears(dob);
			HY = myYear["HY"];
			EY = myYear["EY"];

			//MONTH
			let myMonth = this.getMonths(dob);
			HM = myMonth["HM"];
			EM = myMonth["EM"];

			//DAY
			let myDays = this.getDays(dob);
			HD = myDays["HD"];
			ED = myDays["ED"];

			//TIME
			let timeHour = parseInt(time.format('HH'));
			let timeMinute = parseInt(time.format('mm'));
			let myTimes = this.getTimes(HD, timeHour, timeMinute);
			let HT = myTimes["HT"];
			let ET = myTimes["ET"];


			this.user.HT = this.HTable["H"+HT]; 
			this.user.ET = this.ETable["E"+ET];
			this.user.HD = this.HTable["H"+HD];
			this.user.ED = this.ETable["E"+ED];
			this.user.HM = this.HTable["H"+HM];
			this.user.EM = this.ETable["E"+EM];
			this.user.HY = this.HTable["H"+HY];
			this.user.EY = this.ETable["E"+EY];

			//ELEMENTS
			let HTimeElement = this.HTable["H"+HT]["Element"];
			let ETimeElement = this.ETable["E"+ET]["Element"];
			let HDayElement = this.HTable["H"+HD]["Element"];
			let EDayElement = this.ETable["E"+ED]["Element"];
			let HMonthElement = this.HTable["H"+HM]["Element"];
			let EMonthElement = this.ETable["E"+EM]["Element"];
			let HYearElement = this.HTable["H"+HY]["Element"];
			let EYearElement = this.ETable["E"+EY]["Element"];


			let allMyElements = [
				HTimeElement, 
				ETimeElement, 
				HDayElement, 
				EDayElement, 
				HMonthElement, 
				EMonthElement, 
				HYearElement, 
				EYearElement
			];
			
			let myElements = this.getElements(allMyElements, ET, ED);
			let count = myElements["count"];
			let elements = myElements["elements"];
			let elementsList = myElements["elementsList"]
			let sides = myElements["sides"];
			let businessElements = myElements["businessElements"];
			this.user.favorable = {
				count: count,
				elements: elements,
				elementsList: elementsList,
				sides: sides,
				businessElements: businessElements
			}

			
			//VEY CHOR
			let veyChors = [];
			let myVeyChors = this.getVeyChors(this.user.gender, dob);
			for (let i = 0; i < myVeyChors.length; i ++){
				let veyChor = myVeyChors[i];
				let veyChorKeys = Object.keys(veyChor);
				let keyT = veyChorKeys[0];
				let keyB = veyChorKeys[1];
				let VT = veyChor[keyT];
				let VB = veyChor[keyB];
				let isTopActive = false;
				let isBottomActive = false;
				
				let bornElements = ["Water", "Wood", "Fire", "Earth", "Metal"];
				let unluckyElementIndex = bornElements.indexOf(HDayElement);
				unluckyElementIndex = unluckyElementIndex - 2;
				unluckyElementIndex = (unluckyElementIndex == -1) ? 4 : unluckyElementIndex;
				unluckyElementIndex = (unluckyElementIndex == -2) ? 3 : unluckyElementIndex;
				this.user.unluckyElement = bornElements[unluckyElementIndex];
				let bornElementObject = {
					"Water": "blue", 
					"Wood": "green", 
					"Fire": "red", 
					"Earth": "brown", 
					"Metal": "grey"
				};
				this.user.unluckyElementColor = bornElementObject[this.user.unluckyElement];


				for (let j = 0; j < this.user.favorable.elements.length; j ++){
					let elm = this.user.favorable.elements[j]['Element'];
					if (elm == this.HTable["H"+VT]["Element"]){
						isTopActive = true;
					}
					if (elm == this.ETable["E"+VB]["Element"]){
						isBottomActive = true;
					}
				}
				veyChors.push({
					"YearTop": keyT + "-" + keyB,
					"YearBottom": keyB + "-" + (parseInt(keyB) + 5),
					"Top": this.HTable["H"+VT],
					"Bottom": this.ETable["E"+VB],
					"isTopActive": isTopActive,
					"isBottomActive": isBottomActive
				});
			}

			this.user.veyChors = veyChors;
			

			

			
			this.user.yearList = this.getYearList(this.user.dob);

			this.user.monthList = this.getMonthList(moment().format("M")+"/15/2020");

			this.user.hiddenT = this.getHidden(ET);
			this.user.hiddenD = this.getHidden(ED);
			this.user.hiddenM = this.getHidden(EM);
			this.user.hiddenY = this.getHidden(EY);


		});
  	}

	ngOnInit() {
		
	}


	getHidden(E){
		
		let HElements = {
			1: [this.HTable["H10"]],
			2: [this.HTable["H6"],this.HTable["H8"],this.HTable["H10"]],
			3: [this.HTable["H1"],this.HTable["H3"],this.HTable["H5"]],
			4: [this.HTable["H2"]],
			5: [this.HTable["H2"],this.HTable["H5"],this.HTable["H10"]],
			6: [this.HTable["H7"],this.HTable["H3"],this.HTable["H5"]],
			7: [this.HTable["H4"],this.HTable["H6"]],
			8: [this.HTable["H2"],this.HTable["H6"],this.HTable["H4"]],
			9: [this.HTable["H5"],this.HTable["H7"],this.HTable["H9"]],
			10: [this.HTable["H8"]],
			11: [this.HTable["H8"],this.HTable["H4"],this.HTable["H5"]],
			12: [this.HTable["H9"],this.HTable["H1"]]
		};

		return HElements[E];
	}

	getYearList(date){
		let birthday = moment(date);
		let age = Math.abs(moment.duration(moment().diff(birthday)).asYears());
		age = Math.ceil(age);

		let yearString = "5/15/"+moment().format("Y");
		let currentDate = moment(yearString, "MM/DD/YYYY");
		let twelveYears = [];
		for (let i = 0; i < 12; i ++){
			let year = this.getYears(currentDate.format('l'));
			let top = year["HY"];
			let bottom = year["EY"];

			let isTopActive = false;
			let isBottomActive = false;
			for (let j = 0; j < this.user.favorable.elements.length; j ++){
				let elm = this.user.favorable.elements[j]['Element'];
				if (elm == this.HTable['H'+top]["Element"]){
					isTopActive = true;
				}
				if (elm == this.ETable['E'+bottom]["Element"]){
					isBottomActive = true;
				}
			}
			twelveYears.push({
				year: currentDate.format('Y'),
				top: this.HTable['H'+top],
				bottom: this.ETable['E'+bottom],
				age: age,
				"isTopActive": isTopActive,
				"isBottomActive": isBottomActive
			})
			age ++;
			currentDate.add(1, 'y');
		}

		return twelveYears;
	}

	getMonthList(date){
		let currentDate = moment(date, "MM/DD/YYYY");

		let twelveMonths = [];
		let monthList = [];
		for (let i = 0; i < 12; i ++){
			let month = this.getMonths(currentDate.format('l'));
			let top = month["HM"];
			let bottom = month["EM"];

			let isTopActive = false;
			let isBottomActive = false;
			for (let j = 0; j < this.user.favorable.elements.length; j ++){
				let elm = this.user.favorable.elements[j]['Element'];
				if (elm == this.HTable['H'+top]["Element"]){
					isTopActive = true;
				}
				if (elm == this.ETable['E'+bottom]["Element"]){
					isBottomActive = true;
				}
			}

			twelveMonths.push({
				month: currentDate.format('MMM'),
				year: currentDate.format('YY'),
				top: this.HTable['H'+top],
				bottom: this.ETable['E'+bottom],
				"isTopActive": isTopActive,
				"isBottomActive": isBottomActive
			})
			currentDate.add(1, 'months');
		}

		

		return twelveMonths;
	}

	getYears(date){
		let rangeH = 10;
		let rangeE = 12;
		let HY = 7;
		let EY = 1;
		let startYear = moment("1/1/1900", "MM/DD/YYYY");
		let endDate = moment(date, "MM/DD/YYYY");
		let years = Math.abs(moment.duration(endDate.diff(startYear)).asYears());
		years = Math.floor(years);
		let getDate = parseInt(endDate.format('D'));
		let getMonth = parseInt(endDate.format('M'));
		let yearMonth = parseInt(endDate.format('M'));

		if (yearMonth == 12 && getDate >= 22){
			years ++;
		}

		let modHY = years % rangeH;
		let modEY = years % rangeE;

		HY = HY + modHY;
		EY = EY + modEY;

		HY = (HY > rangeH) ? HY % rangeH : HY;
		EY = (EY > rangeE) ? EY % rangeE : EY;


		return {HY: HY, EY: EY};
	}

	getMonths(date){
		let rangeH = 10;
		let rangeE = 12;
		let HM = 5;
		let EM = 3;
		let ALL = [8,6,4,5,5,6,7,7,7,7,8,7];
		let startYear = moment("1/1/1900", "MM/DD/YYYY");
		let startDate = moment("2/4/1900", "MM/DD/YYYY");
		let endDate = moment(date, "MM/DD/YYYY");

		let middleDate = moment(endDate, "MM/DD/YYYY");
		let getDate = parseInt(endDate.format('D'));
		let getMonth = parseInt(endDate.format('M'));
		let getYear = parseInt(endDate.format('Y'));

		getMonth = (getMonth == 12) ? 0 : getMonth;
		let leftDate = (getDate < 15) ? 15 - getDate : getDate;
		middleDate.add(leftDate, 'day');
		
		// let days = Math.abs(moment.duration(endDate.diff(startDate)).asDays());
		// days = Math.round(days);
		
		let months = Math.abs(moment.duration(endDate.diff(startDate)).asMonths());
		let middleMonth = Math.abs(moment.duration(middleDate.diff(startDate)).asMonths());
		let firstDateOfMonth = ALL[getMonth];
		let EMonth = getMonth;
		if (getDate >= firstDateOfMonth){
			EMonth = EMonth + 1;
		}


		let fMonths = Math.floor(months);
		let fMidMonth = Math.floor(middleMonth);

		if (getDate < firstDateOfMonth && fMonths == fMidMonth){
			months = Math.floor(months) - 1;
		}
		else{
			months = Math.floor(months);
		}

		let modHM = months % rangeH;
		let modEM = months % rangeE;

		HM = HM + modHM;
		EM = EM + modEM;

		HM = (HM > rangeH) ? HM % rangeH : HM;
		EM = (EM > rangeE) ? EM % rangeE : EM;

		HM = (EM < EMonth) ? HM + 1 : HM;
		if (HM > rangeH){
			HM = 1;
		}

		EM = (EM < EMonth) ? EM + 1 : EM;
		if (HM > rangeE){
			EM = 1;
		}


		return {HM: HM, EM: EM};
	}

	getDays(date){
		let rangeH = 10;
		let rangeE = 12;
		let HD = 5;
		let ED = 9;
		let startDate = moment("2/4/1900", "MM/DD/YYYY");
		let endDate = moment(date, "MM/DD/YYYY");
		let days = Math.abs(moment.duration(endDate.diff(startDate)).asDays());
		days = Math.round(days);

		let modHD = days % rangeH;
		let modED = days % rangeE;

		HD = HD + modHD;
		ED = ED + modED;

		HD = (HD > rangeH) ? HD % rangeH : HD;
		ED = (ED > rangeE) ? ED % rangeE : ED;

		return {HD: HD, ED: ED};
	}

	getTimes(HD, timeHour, timeMinute) {
		let timeTableH = {
			"H1": [1,2,3,4,5,6,7,8,9,10,1,2],
			"H2": [3,4,5,6,7,8,9,10,1,2,3,4],
			"H3": [5,6,7,8,9,10,1,2,3,4,5,6],
			"H4": [7,8,9,10,1,2,3,4,5,6,7,8],
			"H5": [9,10,1,2,3,4,5,6,7,8,9,10]
		}
		

		let ET = 1;

		if (timeHour < 23){
			ET = 12;
		}
		if (timeHour < 21){
			ET = 11;
		}
		if (timeHour < 19){
			ET = 10;
		}
		if (timeHour < 17){
			ET = 9;
		}
		if (timeHour < 15){
			ET = 8;
		}
		if (timeHour < 13){
			ET = 7;
		}
		if (timeHour < 11){
			ET = 6;
		}
		if (timeHour < 9){
			ET = 5;
		}
		if (timeHour < 7){
			ET = 4;
		}
		if (timeHour < 5){
			ET = 3;
		}
		if (timeHour < 3){
			ET = 2;
		}
		if (timeHour < 1){
			ET = 1;
		}


		let timeEIndex = ET - 1;
		
		timeEIndex = (timeEIndex == 0) ? 12 : timeEIndex;

		

		let HT = 1;
		if (HD == 1 || HD == 6){
			HT = timeTableH["H1"][timeEIndex];
		}
		else if (HD == 2 || HD == 7){
			HT = timeTableH["H2"][timeEIndex];
		}
		else if (HD == 3 || HD == 8){
			HT = timeTableH["H3"][timeEIndex];
		}
		else if (HD == 4 || HD == 9){
			HT = timeTableH["H4"][timeEIndex];
		}
		else if (HD == 5 || HD == 10){
			HT = timeTableH["H5"][timeEIndex];
		}

		return {HT: HT, ET: ET};

	}

	getVeyChors(gender, date){
		
		let startDate = moment("2/4/1900", "MM/DD/YYYY");
		let endDate = moment(date, "MM/DD/YYYY");
		let myYear = this.getYears(date);
		let HY = myYear["HY"];
		let myMonth = this.getMonths(date);
		let HM = myMonth["HM"];
		let EM = myMonth["EM"];
		let getDate = parseInt(endDate.format('D'));
		let getMonth = parseInt(endDate.format('M'));
		let getYear = parseInt(endDate.format('Y'));
		let ALL = [8,6,4,5,5,6,7,7,7,7,8,7];

		let days = Math.abs(moment.duration(endDate.diff(startDate)).asDays());
		days = Math.round(days);
		// Count Forward
		let myYearH = this.HTable["H" + HY];
		let checkMonth = ALL[getMonth];
		let countMonth = getMonth;
		let firstNewMonth = ALL[countMonth];
		let newCountMonth = (countMonth == 0) ? 12 : countMonth;
		let veyChorYears = getYear;
		let countDirection = "Forward";
		//Count Backward
		if ((gender == "Female" && myYearH['Sign'] == "+") || 
			(gender == "Male" && myYearH['Sign'] == "-")){
			countDirection = "Backward";
			if (getDate < checkMonth){
				countMonth --;
			}
			firstNewMonth = ALL[countMonth];
			newCountMonth = (countMonth == 0) ? 12 : countMonth;
			veyChorYears = getYear;
			if (getDate < checkMonth && getMonth == 1){
				veyChorYears --;
			}
		}

		//Count Forward
		if ((gender == "Female" && myYearH['Sign'] == "-") || 
			(gender == "Male" && myYearH['Sign'] == "+")){
			countDirection = "Forward";
			if (getDate >= checkMonth){
				countMonth ++;
			}
		 	firstNewMonth = ALL[countMonth];
			newCountMonth = (countMonth == 0) ? 12 : countMonth;
			veyChorYears = getYear;
			if (getDate > checkMonth && getMonth == 12){
				veyChorYears ++;
			}
		}

		let newMonthFirstDay = moment(newCountMonth+"/"+firstNewMonth+"/"+veyChorYears, "MM/DD/YYYY");
		let diffVeyChorDays = Math.round(Math.abs(moment.duration(endDate.diff(newMonthFirstDay)).asDays()));
		let veyChor = Math.round(diffVeyChorDays / 3);

		let countHM = HM;
		let countEM = EM;
		let myVeyChors = [];

		let birthday = moment(date, "MM/DD/YYYY");
		let age = Math.abs(moment.duration(moment().diff(birthday)).asYears());
		age = Math.ceil(age);

		for (let i = veyChor; i < 100; i = i + 10){
			
			if (countDirection == "Backward"){
				countHM --;
				countEM --;
				countHM = (countHM == 0) ? 10 : countHM;
				countEM = (countEM == 0) ? 12 : countEM;
			}
			if (countDirection == "Forward"){
				countHM ++;
				countEM ++;
				countHM = (countHM == 11) ? 1 : countHM;
				countEM = (countEM == 13) ? 1 : countEM;
			}

			let subVeyChors = {};
			subVeyChors[i] = countHM;
			subVeyChors[i+5] = countEM;

			// subVeyChors.push(countHM);
			// subVeyChors.push(countEM);
			if (i > (age - 10)){
				myVeyChors.push(subVeyChors);	
			}
			
			// let eachH = HTable["H"+countHM];
			// let eachE = ETable["E"+countEM];
		}

		return myVeyChors;
	}

	getElements(allMyElements, ET, ED){
			
		let bornElements = ["Water", "Wood", "Fire", "Earth", "Metal"];

		let relationshipElements = [
			{
				"sameGender": "Sixth Sense",
				"oppositGender": "Intelligence",
				"description": "Expressive Ability, Intelligence",
				"relationship": "Child"
			},
			{
				"sameGender": "Unexpected Wealth",
				"oppositGender": "Direct Wealth",
				"description": "Money, Wealth",
				"relationship": "Win"
			},
			{
				"sameGender": "Fighting Spirit",
				"oppositGender": "Authority",
				"description": "Power, Status, Fame",
				"relationship": "Lost"
			},
			{
				"sameGender": "Indirect Resource",
				"oppositGender": "Main Resource",
				"description": "Resource & Support",
				"relationship": "Mother"
			},
			{
				"sameGender": "Friends",
				"oppositGender": "Competitors",
				"description": "Colleagues, Friends, Competitors",
				"relationship": "Self"
			},
		];


		let HTimeElement = allMyElements[0];
		let ETimeElement = allMyElements[1];
		let HDayElement = allMyElements[2];
		let EDayElement = allMyElements[3];
		let HMonthElement = allMyElements[4];
		let EMonthElement = allMyElements[5];
		let HYearElement = allMyElements[6];
		let EYearElement = allMyElements[7];

		let myElement = HDayElement;
		let myElementIndex = bornElements.indexOf(myElement);
		let motherElementIndex = myElementIndex - 1;
		let myElementMother = (motherElementIndex == -1 ) ? bornElements[4] : bornElements[motherElementIndex];


		let winIndex = myElementIndex + 2;
		winIndex = (winIndex == 5) ? 0 : winIndex;
		winIndex = (winIndex == 6) ? 1 : winIndex;
		let sameGenderSign = this.user.HD.Sign;
		let oppositGenderSign = (this.user.HD.Sign == '-') ? '+' : '-';
		let lostRelationship = (this.user.gender == 'Female') ? 'Husband' : 'Child';
		let winRelationship = (this.user.gender == 'Male') ? 'Wife' : 'Father';
		let childRelationship = (this.user.gender == 'Female') ? 'Child' : 'Yourself';

		

		this.user.winElement = {
			"element": bornElements[winIndex],
			"sameGender": "Unexpected Wealth",
			"oppositGender": "Direct Wealth",
			"description": "Money, Wealth",
			"sameGenderSign": this.user.HD.Sign,
			"oppositGenderSign": oppositGenderSign,
			"relationship": winRelationship,
			"relationshipBetween": "Win"
		}

		let lostIndex = myElementIndex + 3;
		lostIndex = (lostIndex == 5) ? 0 : lostIndex;
		lostIndex = (lostIndex == 6) ? 1 : lostIndex;
		lostIndex = (lostIndex == 7) ? 2 : lostIndex;
		this.user.lostElement = {
			"element": bornElements[lostIndex],
			"sameGender": "Fighting Spirit",
			"oppositGender": "Authority",
			"description": "Power, Status, Fame",
			"sameGenderSign": this.user.HD.Sign,
			"oppositGenderSign": oppositGenderSign,
			"relationship": lostRelationship,
			"relationshipBetween": "Lost"
		}

		let motherIndex = myElementIndex - 1;
		motherIndex = (motherIndex == -1) ? 4 : motherIndex;
		this.user.motherElement = {
			"element": bornElements[motherIndex],
			"sameGender": "Indirect Resource",
			"oppositGender": "Main Resource",
			"description": "Resource & Support",
			"sameGenderSign": this.user.HD.Sign,
			"oppositGenderSign": oppositGenderSign,
			"relationship": "Mother",
			"relationshipBetween": "Mother"
		}
		
		let childIndex = myElementIndex + 1;
		childIndex = (childIndex == 5) ? 0 : childIndex;
		this.user.childElement = {
			"element": bornElements[childIndex],
			"sameGender": "Sixth Sense",
			"oppositGender": "Intelligence",
			"description": "Expressive Ability, Intelligence",
			"sameGenderSign": this.user.HD.Sign,
			"oppositGenderSign": oppositGenderSign,
			"relationship": childRelationship,
			"relationshipBetween": "Child"
		}
		
		let selfIndex = myElementIndex;
		this.user.selfElement = {
			"element": bornElements[selfIndex],
			"sameGender": "Friends",
			"oppositGender": "Competitors",
			"description": "Colleagues, Friends, Competitors",
			"sameGenderSign": this.user.HD.Sign,
			"oppositGenderSign": oppositGenderSign,
			"relationship": "Sibling",
			"relationshipBetween": "Self"
		}


		// let relationshipElements = {
		// 	"winElement": "Money",
		// 	"lostElement": "Power, Status, Fame",
		// 	"childElement": "Expressive Ability, Intelligence",
		// 	"motherElement": "Resource & Support",
		// 	"selfElement": "Colleagues, Friends, Competitors"
		// }

		let count = 0;

		if (HTimeElement == myElement || HTimeElement == myElementMother){
			count ++;
		}

		if (ETimeElement == myElement || ETimeElement == myElementMother){
			count ++;
		}

		if (EDayElement == myElement || EDayElement == myElementMother){
			count ++;
		}

		if (HMonthElement == myElement || HMonthElement == myElementMother){
			count ++;
		}

		if (EMonthElement == myElementMother){
			count ++;
		}

		if (EMonthElement == myElement){
			count = count + 2;
		}

		if (HYearElement == myElement || HYearElement == myElementMother){
			count ++;
		}

		if (EYearElement == myElement || EYearElement == myElementMother){
			count ++;
		}

		if (myElement == "Water" || myElement == "Wood") {
			if (ET == 5 || ET == 2){
				count = count + 0.5;
			}
			if (ED == 5 || ED == 2){
				count = count + 0.5;
			}
		}


		let matchElement = [];

		if (count < 4) {
			matchElement.push(myElement);
			matchElement.push(myElementMother);
			if (HTimeElement == myElementMother || 
				EDayElement == myElementMother || 
				HMonthElement == myElementMother) {
				let myElementGrandMaIndex = motherElementIndex - 1;
				let myElementGrandma = (myElementGrandMaIndex == -1) ? bornElements[4] : bornElements[myElementGrandMaIndex];
				matchElement.push(myElementGrandma);
			}
		}

		if (count >= 4) {
			let sonElementIndex = myElementIndex + 1;
			sonElementIndex = (sonElementIndex == 5) ? 0 : sonElementIndex;
			let grandsonElementIndex = sonElementIndex + 1;
			grandsonElementIndex = (grandsonElementIndex == 5) ? 0 : grandsonElementIndex;
			matchElement = [];
			matchElement.push(bornElements[sonElementIndex]);
			matchElement.push(bornElements[grandsonElementIndex]);
		}


		// Special Case DT

		let elementDT;
		let elementDTIndex;


		if (allMyElements.filter(x => x == bornElements[0]).length >= 5) {
			elementDT = bornElements[0];
			elementDTIndex = 0;
		}
		if (allMyElements.filter(x => x == bornElements[1]).length >= 5) {
			elementDT = bornElements[1];
			elementDTIndex = 1;
		}
		if (allMyElements.filter(x => x == bornElements[2]).length >= 5) {
			elementDT = bornElements[2];
			elementDTIndex = 2;
		}
		if (allMyElements.filter(x => x == bornElements[3]).length >= 5) {
			elementDT = bornElements[3];
			elementDTIndex = 3
		}
		if (allMyElements.filter(x => x == bornElements[4]).length >= 5) {
			elementDT = bornElements[4];
			elementDTIndex = 4
		}


		if (elementDT){
			matchElement = [];
			matchElement.push(elementDT);
			let dtMotherIndex = elementDTIndex - 1;
			let dtMother = (dtMotherIndex == -1) ? bornElements[4] : bornElements[dtMotherIndex];
			matchElement.push(dtMother);
		}

		let tempMatchElement = [];
		let elementsList = [];
		for (let i = 0; i < matchElement.length; i ++){
			let element = matchElement[i];
			if (element == "Water"){
				// elementsList.push("Water");
				element = {
					"Element": element,
					"Color": "blue"
				}
			}
			if (element == "Fire"){
				element = {
					"Element": element,
					"Color": "red"
				}
			}
			if (element == "Earth"){
				element = {
					"Element": element,
					"Color": "brown"
				}
			}
			if (element == "Metal"){
				element = {
					"Element": element,
					"Color": "grey"
				}
			}
			if (element == "Wood"){
				element = {
					"Element": element,
					"Color": "green"
				}
			}
			elementsList.push(matchElement[i]);
			tempMatchElement.push(element);
		}

		//sides

		let sideElements = {
			"Water": ["North"],
			"Fire": ["South"],
			"Earth": ["N/E", "S/W"],
			"Metal": ["N/W", "West"],
			"Wood": ["East", "S/E"]
		}


		let mySides = []
		for (let i = 0; i < tempMatchElement.length; i ++){
			let matchElement = tempMatchElement[i]['Element'];
			mySides.push(sideElements[matchElement]);
		}

		let sides = [].concat.apply([], mySides);


		let businessElements = {
			"Water": {
				"element": "Water",
				"content": "លក់ភេសជ្ជះ, ទេសចរណ៍, ក្លិបកំសាន្ត, អ្នកនាំភ្ញៀវទេសចរណ៍, ហាងម៉ាស្សា, នាំចេញនាំចូលក្រៅប្រទេស, សណ្ឋាគារ, បន្ទប់ជួល, ខារ៉ាអូខេ",
				"color": "blue"
			},
			"Metal": {
				"element": "Metal",
				"content": "វិស្វករ, មេធាវី, សំណង់អាគារ, ដេគ័រ ឌីស្សាញ, ហាងលក់ថ្នាំពេទ្យ, ហាងផ្កា, រៀបចំសួនផ្កា, គ្រូបង្រៀន, សាលារៀន, លក់គ្រឿងឈេី, ជាងចម្លាក់",
				"color": "grey"
			},
			"Fire": {
				"element": "Fire",
				"content": "លក់គ្រឿងភ្លេីង, គ្រឿងសំអាង, ឧបករណ៍អេឡិចត្រូនិក, តារា, ក្រុមហ៊ុនផ្សព្វផ្សាយ, ទិញលក់ភាគហ៊ុន, ហាងកាហ្វេ, ការ៉ាសសាំង, លក់ហ្គាស, លក់សូឡា",
				"color": "red"
			},
			"Wood": {
				"element": "Wood",
				"content": "លក់គ្រឿងអល្ល័ង្ការ, វេរលុយ, ដូរលុយ, គ្រឿងដែក, លក់ឥវ៉ាន់ប្រេន",
				"color": "green"
			},
			"Earth": {
				"element": "Earth",
				"content": "អចលនទ្រព្យ, ភោជនីយ៍ដ្ឋាន, លក់ឥវ៉ាន់រាយ និងបោះដុំ, ធនាគារ, រំលោះ បញ្ចាំ",
				"color": "brown"
			}
		};

		let myBusinessElements = [];
		for (let i = 0; i < tempMatchElement.length; i ++){
			let matchElement = tempMatchElement[i]['Element'];
			myBusinessElements.push(businessElements[matchElement]);
		}


		return {
			count: count, 
			elements: tempMatchElement, 
			sides: sides.join(', '), 
			businessElements: myBusinessElements,
			elementsList: elementsList
		};

	}

	getBusinessElements(elements){

	}


	navigate(){
		this.router.navigate(['/tabs/tab1/element/1,2,3']);
	}


	goBack(){
		this.location.back();
	}
}
