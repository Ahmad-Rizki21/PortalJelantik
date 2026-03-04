module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/portal-standalone/src/lib/billing-api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/portal-standalone/src/lib/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portal-standalone/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/portal-standalone/node_modules/next/dist/api/navigation.react-server.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portal-standalone/node_modules/next/dist/client/components/navigation.react-server.js [app-route] (ecmascript)");
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
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
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
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
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
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
async function isAuthenticated() {
    const session = await getSession();
    return session !== null;
}
async function requireAuth() {
    const session = await getSession();
    if (!session) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redirect"])('/login');
    }
    return session;
}
}),
"[project]/portal-standalone/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
/**
 * Login API Route
 * Handles customer authentication via email or phone
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portal-standalone/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$src$2f$lib$2f$billing$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portal-standalone/src/lib/billing-api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portal-standalone/src/lib/session.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { identifier } = body;
        if (!identifier || typeof identifier !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email atau nomor telepon harus diisi'
            }, {
                status: 400
            });
        }
        // Validate identifier format
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const isPhone = /^(\+62|62|0)[0-9]{9,12}$/.test(identifier.replace(/[-\s]/g, ''));
        if (!isEmail && !isPhone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Format email atau nomor telepon tidak valid'
            }, {
                status: 400
            });
        }
        // Verify customer with billing API
        const customerData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$src$2f$lib$2f$billing$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyCustomer"])(identifier);
        if (!customerData) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Data tidak ditemukan. Pastikan email atau nomor telepon terdaftar.'
            }, {
                status: 404
            });
        }
        // Create session
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSession"])({
            customerId: customerData.pelanggan.id,
            customerEmail: customerData.pelanggan.email,
            customerPhone: customerData.pelanggan.no_telp,
            customerName: customerData.pelanggan.nama
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Login berhasil',
            redirect: '/portal'
        });
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$portal$2d$standalone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan saat login. Silakan coba lagi.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__af71bbd1._.js.map