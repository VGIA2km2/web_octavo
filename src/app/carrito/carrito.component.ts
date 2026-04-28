  import { Component, inject } from '@angular/core';
  import { CurrencyPipe } from '@angular/common';
  import { CarritoService } from '../services/carrito.service';
  import { RouterLink } from '@angular/router';

  @Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CurrencyPipe, RouterLink],
    template: `
      <div class="carrito-contenedor">
        <h3>🛒 Tu Carrito</h3>
        @if (servicio.productos().length === 0) {
          <p>Está vacío. ¡Agrega algo!</p>
        } @else {
          <ul>
            @for (p of servicio.productos(); track p.id) {
              <li>
                {{ p.nombre }} - {{ p.precio | currency:'MXN' }}
                <button (click)="servicio.quitar(p.id)">❌</button>
              </li>
            }
          </ul>
          <hr>
          <p><strong>Total: {{ servicio.total() | currency:'MXN' }}</strong></p>
          <div class="acciones">
            <button (click)="servicio.exportarReciboXML()">Descargar XML</button>
            <button (click)="servicio.vaciar()" style="background: #ff4444; color: white;">Vaciar</button>
            <button routerLink="/checkout" style="background: #28a745; color: white;">Pagar con PayPal</button>
          </div>
        }
      </div>
    `,
    styles: [`
      .carrito-contenedor { border: 2px solid #7c3aed; padding: 20px; border-radius: 15px; margin-top: 20px; background: #f9f7ff; }
      ul { list-style: none; padding: 0; }
      li { display: flex; justify-content: space-between; margin-bottom: 8px; background: white; padding: 8px; border-radius: 8px; }
      .acciones { display: flex; gap: 10px; margin-top: 10px; }
      button { cursor: pointer; border-radius: 5px; border: none; padding: 10px 15px; }
    `]
  })
  export class CarritoComponent {
    public servicio = inject(CarritoService);
  }