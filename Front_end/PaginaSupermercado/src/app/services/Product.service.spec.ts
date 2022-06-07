import { HttpErrorResponse } from "@angular/common/http";
import { throwError, of } from "rxjs";
import { Product } from "../models/Product";
import { ProductService } from "./Product.service";

describe("pruebas a servicios de producto", () => {
    let service: ProductService;
    let httpClientSpy: {
        post: jasmine.Spy,
        get: jasmine.Spy
    };
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ['post', 'get']);
        service = new ProductService(httpClientSpy as any);
    })

    it("Debe crearse el servicio correctamente", () => {
        expect(service).toBeTruthy()
    })
    it("Debe retornar objeto Producto", (done: DoneFn) => {
        const mockProductoValores: Product = new Product("ID", "NOMBRE", "TIPO", 0, 0, "CARACTERISTICAS", "IMAGEN.RUTA", 0);
        httpClientSpy.get.and.returnValue(of(mockProductoValores))
        service.getProduct("ID").subscribe(resultado => {
            expect(resultado).toEqual(mockProductoValores)
            done()
        })
    })
})
