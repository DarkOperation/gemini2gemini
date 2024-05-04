const BASE_URL = "https://generativelanguage.googleapis.com";

export default {
    async fetch (request) {
        let json;
        if (request.method == 'POST') {
            try {
                json = await request.json();
                if (!Array.isArray(json.messages)) {
                    throw SyntaxError(".messages array required");
                }
            } catch (err) {
                console.error(err.toString());
                return new Response(err, {status: 400});
            }
        }

        const url = new URL(request.url).pathname;
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');

        let data;

        if (request.method == 'POST') {
            data = await fetch(
                `${BASE_URL}` + url + `?key=${key}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json
                });
        } else {
            data = await fetch(
                `${BASE_URL}` + url + `?key=${key}`,
                {
                    method: request.method,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        }
        return new Response(data.body, { status: data.status, statusText: data.statusText });
    }
};
