export class Product{
    constructor(
        public _id:String,
        public nombre:String,
        public tipo:String,
        public precio:Number,
        public cantidad:Number,
        public caracteristicas:String,
        public imagen:string
    ){}
}