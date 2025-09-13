import { getCookie } from "../../store"

function safeParse(json: string | null, fallback: any = null) {
    try {
        return json ? JSON.parse(json) : fallback;
    } catch {
        return fallback;
    }
}

function safeGet(storage: Storage | undefined, key: string): any {
    if (!storage) return null;
    return safeParse(storage.getItem(key), null);
}

function getMixedStore(key: string, keyedValue?: string) {
    const k = keyedValue || key;

    const userLS = safeGet(typeof localStorage !== "undefined" ? localStorage : undefined, "user");
    const userSS = safeGet(typeof sessionStorage !== "undefined" ? sessionStorage : undefined, "user");
    const directLS = safeGet(typeof localStorage !== "undefined" ? localStorage : undefined, k);
    const directSS = safeGet(typeof sessionStorage !== "undefined" ? sessionStorage : undefined, k);

    return {
        [key]:
            (userLS?.[k]) ??
            (userSS?.[k]) ??
            directLS ??
            directSS ??
            safeParse(getCookie("user") ?? decodeURIComponent(getCookie("user") || "{}"), {})?.[k]
    };
}

export default function getAuthHeaders(): { [index: string]: string } {
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...getMixedStore("x-auth-email", "configuratorEmail"),
        ...getMixedStore("x-auth-code", "authCode"),
        ...getMixedStore("picture"),
        ...getMixedStore("given_name"),
    }
}