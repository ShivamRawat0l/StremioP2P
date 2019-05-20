const {
	addonBuilder
} = require("stremio-addon-sdk")
const dotenv= require("dotenv")
dotenv.config();
var axios = require("axios")
// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
var movies, series, other
const manifest = {
	"id": "community.P2PStream",
	"version": "0.0.1",
	"catalogs": [{
		"type": "movie",
		"id": "top",
		"name": "P2P",
	}, ],
	"resources": [
		"catalog",
		"stream"
	],
	"types": [
		"movie",
	],

	"name": "P2PStream",
	"description": "This is use to share videos with your friends directly",
	"idPrefixes": ['p2p']
}

axios.get('https://www.jsonstore.io/'+process.env.JSONSTORE)
	.then(b => {
		movies = b.data.result.result[0].movies;
		console.log(movies)
	})
	.catch(e => console.log(e))
/*axios.get('https://www.jsonstore.io/'+process.env.JSONSTORE)
	.then(b => {
		series = b.data.result.result[1].series;
		console.log(series)
	})
	.catch(e => console.log(e))
axios.get('https://www.jsonstore.io/'+process.env.JSONSTORE)
	.then(b => {
		other = b.data.result.result[2].other;
		console.log(other)
	})
	.catch(e => console.log(e))
axios.get('https://www.jsonstore.io/'+process.env.JSONSTORE)
.then(b=>{streams=b.data.result.result;
console.log(streams)})
.catch(e=>console.log(e))
axios.get('https://www.jsonstore.io/'+process.env.JSONSTORE)
.then(b=>{streams=b.data.result.result;
console.log(streams)})
.catch(e=>console.log(e))*/
const builder = new addonBuilder(manifest)


builder.defineCatalogHandler(async function (args) {
	console.log("request for catalog: " + args.type + " " + args.id)
	await axios.get('https://www.jsonstore.io/'+process.env.JSONSTORE)
		.then(b => {
			movies = b.data.result.result[0].movies;
			console.log(movies)
		})
		.catch(e => console.log(e))
	switch (args.type) {
		case "movie":
			var movieid = 100000;

			var meta = []
			var counter = 0;
			 for (counter = 1; counter < movies.length; counter++) {
				var nameofvideo, description, typeofdata
				await axios.get(movies[counter] + "/data")
					.then(b => {
						nameofvideo = b.data.name
						description = b.data.description
						typeofdata = b.data.type

					})
				await meta.push({
					id: "p2p:p2p" + movieid,
					type: "movie",
					name: nameofvideo,
					posterShape: 'regular',
					poster: movies[counter]+"/image",
					description: description
				})
				counter++;
				movieid += 1;
				await console.log(meta)
			}
			await console.log(meta)

			return await Promise.resolve({
				metas: meta
			})

			break;
	}
	return Promise.resolve({
		metas: []
	})

})

/*
builder.defineMetaHandler(async function (args) {
	await console.log("request for meta: " + args.type + " " + args.id)

	switch (args.type) {
		case "movie":
			var movieid = 100000;
			var a ;
			for (counter = 1; counter < movies.length; counter++) {
				if (args.id === 'p2p:p2p' + movieid) {
					a = await movies[counter];
			   }
			   movieid += 1;
			}
			var nameofvideo, description, typeofdata
			await axios.get(a + "/data")
				.then(b => {
					nameofvideo = b.data.name
					description = b.data.description
					typeofdata = b.data.type
				})
			
				  const  metaObj = await {
				id: 'p2p:p2p' + movieid,
				name: nameofvideo,
				posterShape: 'regular',
				type: typeofdata,
				description: description
			}
			await console.log(metaObj)
			return await  Promise.resolve({
				meta: metaObj
			})
			break;
	}
	console.log("AFTER SWIOTCh")
	return await  Promise.resolve({
		meta: {}})
	// serve metadata for Big Buck Bunny


})
*/


builder.defineStreamHandler((args) => {

	/*if (type === 'movie' && id === 'p2p:p2p100000') {
        // serve one stream to big buck bunny
        // return addonSDK.Stream({ url: '...' })
        const stream = { url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4' }
        return Promise.resolve({ streams: [stream] })
	} 
	else {
        // otherwise return no streams
	return Promise.resolve({ streams: [] })
    }*/
	console.log("request for streams: " + args.type + " " + args.id)


	switch (args.type) {
		case "movie":
			var movieid = 100000;
			var streamvalue = ""
			movies.filter(a => {

				if (a === "MovieTab")
					return false
				else {
					return true;
				}

			}).forEach(a => {
				if (args.id === 'p2p:p2p' + movieid) {
					streamvalue = a;
				}
				movieid += 1;
			})
			const stream = {
				url: streamvalue
			}
			return Promise.resolve({
				streams: [stream]
			})

			break;
	}
	return Promise.resolve({
		streams: []
	})

	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md
	// serve one stream to big buck bunny



	// otherwise return no streams
})

module.exports = builder.getInterface()