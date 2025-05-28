/**
 * Streams the file to the client with CORS headers
 */
export async function onRequest({ request, params }) {
    const origin = request.headers.get("Origin") || "*";
    const filename = params.filename;

    const corsHeaders = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
        "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

    const r2Res = await fetch(`https://peppers-r2.pepper.fyi/${filename}`);
    console.log(`Serving: ${filename}`);
    console.log(`Content-Type: ${r2Res.headers.get("Content-Type")}`);

    if (!r2Res.ok) {
        return new Response("File not found in R2", {
            status: 404,
            headers: corsHeaders,
        });
    }

    const headers = new Headers(r2Res.headers);
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "*");

    return new Response(r2Res.body, {
        status: r2Res.status,
        headers,
    });
}
