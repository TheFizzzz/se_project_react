export const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) return res.json();
  return res
    .json()
    .catch(() => ({}))
    .then((data) =>
      Promise.reject(
        new Error(data.message || `Request failed: ${res.status}`),
      ),
    );
}

function normalizeItem(item) {
  return {
    ...item,
    link: item.imageUrl || item.link,
  };
}

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((items) => items.map(normalizeItem));
}

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
}

export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then(normalizeItem);
}

export function deleteItem(_id, token) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  }).then(checkResponse);
}

export function updateProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: authHeaders(token),
  })
    .then(checkResponse)
    .then(normalizeItem);
}

export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: authHeaders(token),
  })
    .then(checkResponse)
    .then(normalizeItem);
}
