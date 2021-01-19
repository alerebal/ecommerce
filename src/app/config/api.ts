import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'https://alerebal-ecommerce-back.herokuapp.com/' : 'http://localhost:3100/';
export const productsUrl = `${baseUrl}products`;
export const cartItemsUrl = `${baseUrl}cartItems`;
export const newUserUrl = `${baseUrl}newUser`;
export const logInUrl = `${baseUrl}logIn`;
export const getUserUrl = `${baseUrl}user`;
export const stripeUrl = `${baseUrl}payment`;
export const noUserUrl = `${baseUrl}noUser`;


