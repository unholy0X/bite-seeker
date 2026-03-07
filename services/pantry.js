import { authFetch } from "./api";

export async function fetchPantryItems({ getToken, category, limit = 100, offset = 0 }) {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (category) params.set("category", category);
    return authFetch(`/pantry?${params}`);
}

export async function createPantryItem({ getToken, name, category, quantity, unit }) {
    return authFetch("/pantry", {
        method: "POST",
        body: JSON.stringify({ name, category, quantity, unit }),
    });
}

export async function deletePantryItem({ getToken, itemId }) {
    return authFetch(`/pantry/${itemId}`, { method: "DELETE" });
}

export async function scanPantryImage({ getToken, images, autoAdd = true }) {
    const payload = {
        images: images.map((img) => ({
            base64: img.base64,
            mimeType: img.mimeType || "image/jpeg",
        })),
        imageBase64: images[0]?.base64,
        mimeType: images[0]?.mimeType || "image/jpeg",
        autoAdd,
    };
    return authFetch("/pantry/scan", {
        method: "POST",
        body: JSON.stringify(payload),
        timeout: 120000,
    });
}
