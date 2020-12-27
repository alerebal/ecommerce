import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'algo que pondré' : 'http://localhost:3300';
export const productsUrl = `${baseUrl}/products`;
export const cartUrl = `${baseUrl}/cart`;
export const wishlistUrl = `${baseUrl}/wishlist`;
