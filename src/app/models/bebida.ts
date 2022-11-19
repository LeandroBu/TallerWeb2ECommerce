export interface Bebida{
    id:number;
    nombre:string;
    img:string;
    precio: string;
    clasificacion: string;
    descripcion:string;
    cantidad:number | 1;
    stock:number | 20;
}