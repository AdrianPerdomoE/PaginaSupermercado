export class User{
    constructor(
        public _id: string,
        public nombre: String,
        public UserName: string,
        public Password: string,
        public edad: Number,
        public direccion: string,
        public rol?: string,
    ){}
}