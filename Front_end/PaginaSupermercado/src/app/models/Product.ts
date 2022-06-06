export class Product {
    constructor(
        public _id: string,
        public nombre: string,
        public tipo: string,
        public precio: number,
        public cantidad: number,
        public caracteristicas: string,
        public imagen: string,
        public codigo: number
    ) { }
}//Modelo de las propiedades que contiene un producto