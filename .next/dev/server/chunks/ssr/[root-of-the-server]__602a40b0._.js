module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSession",
    ()=>clearSession,
    "createSession",
    ()=>createSession,
    "getSession",
    ()=>getSession,
    "isAuthenticated",
    ()=>isAuthenticated,
    "requireAuth",
    ()=>requireAuth
]);
/**
 * Session Management Utility
 * Handles customer session using encrypted cookies
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
const SESSION_COOKIE_NAME = 'customer_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
/**
 * Encrypt session data
 */ function encrypt(data) {
    const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret-change-this';
    const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(16);
    const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv('aes-256-cbc', Buffer.from(secret, 'base64'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
/**
 * Decrypt session data
 */ function decrypt(encryptedData) {
    try {
        const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret-change-this';
        const parts = encryptedData.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const encrypted = parts[1];
        const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv('aes-256-cbc', Buffer.from(secret, 'base64'), iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch  {
        return null;
    }
}
async function createSession(data) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionData = {
        ...data,
        expiresAt: Date.now() + SESSION_DURATION
    };
    const encrypted = encrypt(JSON.stringify(sessionData));
    cookieStore.set(SESSION_COOKIE_NAME, encrypted, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION / 1000,
        path: '/'
    });
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
        return null;
    }
    const decrypted = decrypt(sessionCookie.value);
    if (!decrypted) {
        return null;
    }
    const session = JSON.parse(decrypted);
    // Check if session has expired
    if (session.expiresAt < Date.now()) {
        await clearSession();
        return null;
    }
    return session;
}
async function clearSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
async function isAuthenticated() {
    const session = await getSession();
    return session !== null;
}
async function requireAuth() {
    const session = await getSession();
    if (!session) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/login');
    }
    return session;
}
}),
"[project]/src/lib/billing-api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAdminToken",
    ()=>getAdminToken,
    "getCustomerByEmail",
    ()=>getCustomerByEmail,
    "getCustomerByPhone",
    ()=>getCustomerByPhone,
    "getInvoicesByPelangganId",
    ()=>getInvoicesByPelangganId,
    "getLanggananByPelangganId",
    ()=>getLanggananByPelangganId,
    "verifyCustomer",
    ()=>verifyCustomer
]);
/**
 * Billing API Utility
 * Handles communication with the billing system API
 */ const API_URL = process.env.BILLING_API_URL || 'https://billingftth.my.id/api';
const API_USERNAME = process.env.BILLING_API_USERNAME || 'ahmad@ajnusa.com';
const API_PASSWORD = process.env.BILLING_API_PASSWORD;
// Token cache for admin authentication
let adminToken = null;
let tokenExpiry = 0;
async function getAdminToken() {
    const now = Date.now();
    // Return cached token if still valid (with 5min buffer)
    if (adminToken && tokenExpiry > now + 300000) {
        return adminToken;
    }
    try {
        const formData = new URLSearchParams();
        formData.append('username', API_USERNAME);
        formData.append('password', API_PASSWORD);
        const response = await fetch(`${API_URL}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString(),
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Authentication failed: ${response.status}`);
        }
        const data = await response.json();
        // Cache the token
        adminToken = data.access_token;
        tokenExpiry = now + data.expires_in * 1000;
        return data.access_token;
    } catch (error) {
        console.error('Error getting admin token:', error);
        throw error;
    }
}
/**
 * Search pelanggan by query using API search endpoint
 */ async function searchPelanggan(query) {
    const token = await getAdminToken();
    const response = await fetch(`${API_URL}/pelanggan/?search=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    if (!response.ok) {
        return [];
    }
    const result = await response.json();
    return result.data || [];
}
async function getCustomerByEmail(email) {
    try {
        const results = await searchPelanggan(email);
        const pelanggan = results.find((p)=>p.email.toLowerCase() === email.toLowerCase());
        if (!pelanggan) {
            return null;
        }
        // Fetch related data
        const [langganan, invoices] = await Promise.all([
            getLanggananByPelangganId(pelanggan.id),
            getInvoicesByPelangganId(pelanggan.id)
        ]);
        return {
            pelanggan,
            langganan,
            invoices
        };
    } catch (error) {
        console.error('Error fetching customer by email:', error);
        throw error;
    }
}
async function getCustomerByPhone(phone) {
    try {
        const results = await searchPelanggan(phone);
        const pelanggan = results.find((p)=>p.no_telp === phone);
        if (!pelanggan) {
            return null;
        }
        const [langganan, invoices] = await Promise.all([
            getLanggananByPelangganId(pelanggan.id),
            getInvoicesByPelangganId(pelanggan.id)
        ]);
        return {
            pelanggan,
            langganan,
            invoices
        };
    } catch (error) {
        console.error('Error fetching customer by phone:', error);
        throw error;
    }
}
async function getLanggananByPelangganId(pelangganId) {
    try {
        const token = await getAdminToken();
        // Add timestamp to bypass cache and get fresh data
        // Use trailing slash as required by the API endpoint
        const timestamp = Date.now();
        const response = await fetch(`${API_URL}/langganan/?pelanggan_id=${pelangganId}&_t=${timestamp}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            console.error('API Response not OK:', response.status, response.statusText);
            return null;
        }
        const data = await response.json();
        const langgananData = data.data || data;
        if (Array.isArray(langgananData)) {
            // Filter to find the langganan with matching pelanggan_id
            const matchedLangganan = langgananData.find((l)=>l.pelanggan_id === pelangganId);
            return matchedLangganan || null;
        }
        return langgananData;
    } catch (error) {
        console.error('Error fetching langganan:', error);
        return null;
    }
}
async function getInvoicesByPelangganId(pelangganId) {
    try {
        const token = await getAdminToken();
        const response = await fetch(`${API_URL}/invoices?pelanggan_id=${pelangganId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            return [];
        }
        const data = await response.json();
        const invoicesData = data.data || data;
        const allInvoices = Array.isArray(invoicesData) ? invoicesData : [];
        // Filter invoices for this specific customer (API returns all invoices)
        return allInvoices.filter((inv)=>inv.pelanggan_id === pelangganId);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return [];
    }
}
async function verifyCustomer(identifier) {
    // Check if identifier is an email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    if (isEmail) {
        return getCustomerByEmail(identifier);
    } else {
        return getCustomerByPhone(identifier);
    }
}
}),
"[project]/src/app/portal-client.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/portal-client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/portal-client.tsx <module evaluation>", "default");
}),
"[project]/src/app/portal-client.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/portal-client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/portal-client.tsx", "default");
}),
"[project]/src/app/portal-client.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$portal$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/portal-client.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$portal$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/portal-client.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$portal$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/**
 * Customer Portal Dashboard
 * Displays customer profile and invoices
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$billing$2d$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/billing-api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$portal$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/portal-client.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function PortalPage() {
    // Verify authentication
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAuth"])();
    // Fetch customer data
    let customerData = null;
    // Try to fetch by email first, then phone
    customerData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$billing$2d$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomerByEmail"])(session.customerEmail);
    if (!customerData) {
        customerData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$billing$2d$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomerByPhone"])(session.customerPhone);
    }
    if (!customerData) {
        // Session exists but customer not found - clear session and redirect
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/login');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$portal$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        customerData: customerData
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__602a40b0._.js.map