import { TestBed } from "@angular/core/testing";
import { User } from "../models/user";
import { AutenticationService } from "./autentication.service";

describe("Pruebas a  servicio de autenticación", () => {
    let service: AutenticationService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AutenticationService);
    });

    it("Debe crearse correctamente", () => {
        expect(service).toBeTruthy();
    })

    it("Debe establecer el usuario correctamente", () => {
        let user: User = new User("", "", "", "", 0, "", "");
        service.user = user;
        expect(user).toEqual(service.user);
    })
    it("Debe reconocer al administrador", () => {
        let user: User = new User("", "", "", "", 0, "", "ADMIN");
        service.user = user;
        expect(service.isAdmin.value).toBeTrue()
    })
    it("Debe ser Administrador y no cliente", () => {
        let user: User = new User("", "", "", "", 0, "", "ADMIN");
        service.user = user;
        expect(service.isClient.value).toBeFalse()
    })
    it("Debe reconocer a un cliente", () => {
        let user: User = new User("", "", "", "", 0, "", "CLIENTE");
        service.user = user;
        expect(service.isClient.value).toBeTrue()
    })

    it("Debe ser cliente y no administrador", () => {
        let user: User = new User("", "", "", "", 0, "", "CLIENTE");
        service.user = user;
        expect(service.isAdmin.value).toBeFalse()
    })
})