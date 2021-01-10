import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'algo que pondré' : 'http://localhost:3300';
export const productsUrl = `${baseUrl}/products`;
export const cartItemsUrl = `${baseUrl}/cartItems`;
export const newUserUrl = `${baseUrl}/newUser`;
export const logInUrl = `${baseUrl}/logIn`;
export const getUserUrl = `${baseUrl}/user`;
export const stripeUrl = `${baseUrl}/payment`;


