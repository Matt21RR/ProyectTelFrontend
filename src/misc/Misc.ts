import $ from "jquery";
const BACKEND_URL = "http://localhost:8080";

export enum REQUEST_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}


/**
 * @param {string} method - 'GET', 'POST', 'PUT', o 'DELETE'
 * @param {string} url - El endpoint de la API
 * @param {object} [data] - Datos opcionales a enviar (JSON)
 */
export function apiRequest(method: REQUEST_METHODS, endpoint: string, data: {} | null = null) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: `${BACKEND_URL}/${endpoint}`,
        type: method as string, // O 'method' en versiones modernas
        contentType: 'application/json', // Requerido comúnmente para PUT/POST
        data: data ? JSON.stringify(data) : undefined,
        dataType: 'json'
    })
    .done((res) => {
      resolve(res);
    })
    .fail((err) => {
      console.error("API Request Error:", err);
      reject(err);
    });
  });
}
