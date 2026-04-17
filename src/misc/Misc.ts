import $ from "jquery";

export enum BACKEND_URLS {
  AUTH = "http://localhost:5132/api",
  LIBRARY = "http://localhost:5281/api"
}


export enum REQUEST_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}


/**
 * @param {string} method - 'GET', 'POST', 'PUT', o 'DELETE'
 * @param {string} url - El endpoint de la API
 * @param {object} [data] - Datos opcionales a enviar (JSON)
 */
export function apiRequest(method: REQUEST_METHODS, baseUrl: BACKEND_URLS, endpoint: string, data: {} | null = null) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: `${baseUrl}/${endpoint}`, 
        type: method as string, // O 'method' en versiones modernas
        contentType: 'application/json', // Requerido comúnmente para PUT/POST
        data: data ? JSON.stringify(data) : undefined,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + readSession('token') // Si tienes autenticación
        },
    })
    .done((res) => {
      console.log("API Request Success:", res);
      resolve(res);
    })
    .fail((err) => {
      console.error("API Request Error:", err);
      reject(err);
    });
  });
}

export function apiRequestWithFormData(method: REQUEST_METHODS, baseUrl: BACKEND_URLS, endpoint: string, formData: FormData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseUrl}/${endpoint}`,
      type: method as string, // O 'method' en versiones modernas
      data: formData,
      contentType: false, // NO enviar como JSON
      processData: false, // NO procesar los datos
      headers: {
          'Authorization': 'Bearer ' + readSession('token') // Si tienes autenticación
      }
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

export function writeSession(key:string, value:string){
  console.log(`Session write: ${key} = ${value}`);
  sessionStorage.setItem(key,value);
}

export function readSession(key:string):string | null{
  return sessionStorage.getItem(key);
}

export function removeSession(key:string){
  sessionStorage.removeItem(key);
}


export function isAdmin():boolean{
  return readSession("isAdmin") === "true";
}