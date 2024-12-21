
/*
Este archivo contiene las interfaces que se utilizan en el servicio de autenticación.
*/
export interface User {
  uid?:string,
  name?: string,
  surname?:string,
  image?:string,
  adress?:string,
  phoneNumber?:number,
  rol?: string,
  email?:string
}

/*
La interfaz AuthResponse es la que se utiliza para recibir la respuesta del backend al realizar una petición de autenticación.
*/
export interface AuthResponse{
  ok: boolean,
  uid?: string,
  name?: string,
  surname?:string,
  image?:string,
  adress?:string,
  phoneNumber?:number,
  rol?: string,
  email?:string
  token?:string
}

/*
Otra posible solución al problema de la interfaz AuthResponse es la siguiente:
*/
/*
export interface AuthResponse2 {
  ok: boolean,
  uid?: string,
  name?: string,
  surname?:string,
  image?:string,
  adress?:string,
  phoneNumber?:number,
  rol?: string,
  email?:string
  token?:string
}
*/
