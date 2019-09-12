// Inspireret af https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
//
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://teknik.bbr.dk/kodelister';

async function main(url) {
	//debugger;
	let html= await rp(url);
	//console.log(html);
	let kodelister= $('div > select > option', html);
	console.log(kodelister.length);
	//console.log(kodelister);
	for (let i= 1; i<kodelister.length; i++) {
		let kurl= kodelister[i].attribs.value; 
		console.log(kurl);
		let khtml= await rp(kurl);		
		let kodeliste= $('ul.kodeliste-list > li', khtml);
		console.log(kodeliste.length);
		for (let j= 0; j<kodeliste.length; j++) {
			console.log(kodeliste[j].children[0].data);
		}
	}

}

main(url);