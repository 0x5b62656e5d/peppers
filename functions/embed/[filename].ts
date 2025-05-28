/**
 * Fetches a file from R2 storage and redirects to it
 */
export async function onRequest({ params }) {
    const filename = params.filename;

    const r2Response = await fetch(`https://peppers-r2.pepper.fyi/${filename}`, {
        redirect: "follow",
    });

    if (!r2Response.ok) {
        return new Response("File not found", { status: 404 });
    }

    const headers = new Headers(r2Response.headers);
    headers.set("Cache-Control", "public, max-age=3600");

    return new Response(r2Response.body, {
        status: r2Response.status,
        headers,
    });
}
