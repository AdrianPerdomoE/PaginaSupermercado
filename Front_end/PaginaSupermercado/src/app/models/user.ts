import { Product } from "./Product";

export class User {
    constructor(
        public _id: string,
        public nombre: string,
        public UserName: string,
        public Password: string,
        public edad: Number,
        public direccion: string,
        public productos: Array<Product>,
        public dinero: Number,
        public rol?: string,
    ) { }
}