export class Factura {
    constructor(
        public _id: string,
        public comprador: string,
        public medioPago: string,
        public direccion: string,
        public correo: string,
        public detalles: Array<string>,
        public subTotal: number,
        public total: number,
    ) { }
}//Modelo de las propiedades que contiene la factura