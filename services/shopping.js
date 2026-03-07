import { authFetch } from "./api";

export async function fetchShoppingLists({ getToken }) {
    return authFetch("/shopping-lists");
}

export async function createShoppingList({ getToken, name, icon, description }) {
    return authFetch("/shopping-lists", {
        method: "POST",
        body: JSON.stringify({ name, icon, description }),
    });
}

export async function fetchShoppingList({ getToken, listId }) {
    return authFetch(`/shopping-lists/${listId}?includeItems=true`);
}

export async function deleteShoppingList({ getToken, listId }) {
    return authFetch(`/shopping-lists/${listId}`, {
        method: "DELETE",
    });
}

export async function archiveShoppingList({ getToken, listId }) {
    return authFetch(`/shopping-lists/${listId}/archive`, {
        method: "POST",
    });
}

export async function addShoppingItem({ getToken, listId, name, quantity, unit, category }) {
    return authFetch(`/shopping-lists/${listId}/items`, {
        method: "POST",
        body: JSON.stringify({ name, quantity, unit, category }),
    });
}

export async function deleteShoppingItem({ getToken, listId, itemId }) {
    return authFetch(`/shopping-lists/${listId}/items/${itemId}`, {
        method: "DELETE",
    });
}

export async function toggleItemChecked({ getToken, listId, itemId }) {
    return authFetch(`/shopping-lists/${listId}/items/${itemId}/check`, {
        method: "POST",
    });
}

export async function addFromRecipe({ getToken, listId, recipeId }) {
    return authFetch(`/shopping-lists/${listId}/add-from-recipe`, {
        method: "POST",
        body: JSON.stringify({ recipeId }),
    });
}

export async function completeList({ getToken, listId }) {
    return authFetch(`/shopping-lists/${listId}/complete`, {
        method: "POST",
    });
}

export async function smartMergeLists({ getToken, sourceListIds, name }) {
    return authFetch("/shopping-lists/smart-merge", {
        method: "POST",
        body: JSON.stringify({ sourceListIds, ...(name ? { name } : {}) }),
    });
}
