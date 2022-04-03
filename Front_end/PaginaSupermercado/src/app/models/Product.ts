export class Product{
    constructor(
        public _id:string,
        public nombre:string,
        public tipo:string,
        public precio:Number,
        public cantidad:Number,
        public caracteristicas:string,
        public imagen:string
    ){}
}