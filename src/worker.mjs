const BASE_URL = "https://generativelanguage.googleapis.com";

export default {
    async fetch (request) {
        let json;
        if (request.method == 'POST') {
            try {
                json = await request.json();
            } catch (err) {
                return new Response("Error while parsing json", {status: 400});
            }
        }
        json = JSON.stringify(json);

        const url = new URL(request.url);
        let data;
        
        if (request.method == 'POST') {
    		data = await fetch(
    			`${BASE_URL}` + url.pathname + url.search,
    			{
    				method: 'POST',
    				headers: {
    					'Content-Type': 'application/json',
    				},
    				body: json
    			});
        } else {
            data = await fetch(
    			`${BASE_URL}` + url.pathname + url.search,
    			{
    				method: request.method,
    				headers: {
    					'Content-Type': 'application/json',
    				},
    			});
        }
        return new Response(data.body, { status: data.status, statusText: data.statusText });
    }
};
