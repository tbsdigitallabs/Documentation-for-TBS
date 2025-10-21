// TEMPORARILY DISABLED FOR DEMO - Authentication middleware disabled
export default function middleware() {
    // Skip authentication for demo purposes
    return
}

export const config = {
    matcher: [
        // No routes protected during demo
    ]
}
