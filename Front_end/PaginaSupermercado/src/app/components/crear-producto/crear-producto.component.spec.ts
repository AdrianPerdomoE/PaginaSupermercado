import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';



import { CrearProductoComponent } from './crear-producto.component';

describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CrearProductoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('Debe crear componente', () => {
    expect(component).toBeTruthy();
  });

  /* it('Debe estar deshabilitado el boton de submit', () => {

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="submit"]')?.attributes[3]);
  });
  it('Debe estar deshabilitado el boton de submit si un campo no esta lleno', () => {

    component.product.cantidad = 3;
    component.product.caracteristicas = "sfs";
    component.product.codigo = 2323133;
    component.product.imagen = "ruta";
    component.product.nombre = "nombre";
    component.product.tipo = "w";
    component.product.precio = 42;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="submit"]')?.attributes[3]).toBeTruthy();
  }); */
}); 
