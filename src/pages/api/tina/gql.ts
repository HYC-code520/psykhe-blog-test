// TinaCMS API endpoint - temporarily disabled for TypeScript compatibility
// TODO: Re-enable after TinaCMS build is properly configured

export const GET = async () => {
    return new Response(JSON.stringify({ error: "TinaCMS API temporarily disabled" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
    });
};

export const POST = async () => {
    return new Response(JSON.stringify({ error: "TinaCMS API temporarily disabled" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
    });
};
