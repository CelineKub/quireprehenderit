import {
	arrayify
} from "../bytes";
import { toUtf8Bytes} from "../strings";


export async function getUrl(href, options) {
	if (options == null) {
		options = {};
	}
	if(typeof fetch === 'function' && typeof plus == 'undefined'){
		return await getFetch(href, options)
	}else{
		return await getUni(href, options)
	}
}

async function getUni(href, options) {
	
	if (options.body) {
		let str = String.fromCharCode.apply(null, options.body);
		//let str = ab2str(options.body)
		options.body = JSON.parse(str);
	} else {
		options.body = {};
	}
	let request = {
		url: href,
		method: (options.method || "GET"),
		//header: (options.headers || {}),
		header: {
			'content-type' : 'application/json; charset=utf-8'
		},
		data: options.body,
		mode: "cors"
	};
	//console.log(request);
	let [err, rt] = await uni.request(request);
	//console.log(rt)
	//let body = rt.data
	let str = JSON.stringify(rt.data)
	let body = toUtf8Bytes(str)
	let status = rt.statusCode;
	let statusText = "Ok"
	let headers = {};
	let rtheader = rt.header;
	//console.log(rtheader);
	for (let p in rtheader) {
		headers[p.toLowerCase()] = rtheader[p];
	}
	return {
		headers: headers,
		statusCode: status,
		statusMessage: statusText,
		body: body
	};
}
async function getFetch(href, options) {
	let request = {
		method: (options.method || "GET"),
		headers: (options.headers || {}),
		body: (options.body || undefined),
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		redirect: "follow",
		referrer: "client", // no-referrer, *client
	};
	let response = await fetch(href, request);
	let body = await response.arrayBuffer();
	let headers = {};
	if (response.headers.forEach) {
		response.headers.forEach((value, key) => {
			headers[key.toLowerCase()] = value;
		});
	} else {
		((response.headers).keys)().forEach((key) => {
			headers[key.toLowerCase()] = response.headers.get(key);
		});
	}
	return {
		headers: headers,
		statusCode: response.status,
		statusMessage: response.statusText,
		body: arrayify(new Uint8Array(body)),
	};
}
