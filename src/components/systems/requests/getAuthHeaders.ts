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

    const directLS = safeGet(typeof localStorage !== "undefined" ? localStorage : undefined, k);

    return {
        [key]: directLS
    };
}

export default function getAuthHeaders(): { [index: string]: string } {
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...getMixedStore("x-auth-email", "configuratorEmail"),
        ...getMixedStore("x-auth-code", "authCode"),
        ...getMixedStore("x-auth-token-id", "tokenId"),
        ...getMixedStore("x-auth-client-id", "clientId"),
        ...getMixedStore("picture"),
        ...getMixedStore("given_name"),
    }
}