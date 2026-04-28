import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private _productos = signal<Producto[]>([]);

  productos = this._productos.asReadonly();
  carrito = this.productos; // Alias para compatibilidad con CheckoutComponent
  

  total = computed(() => 
    this._productos().reduce((acc, p) => acc + (parseFloat(p.precio || '0') * (p.cantidad || 1)), 0)
  );

  agregar(producto: Producto) {
    this._productos.update(lista => {
      const existente = lista.find(p => p.id === producto.id);
      if (existente) {
        return lista.map(p => 
          p.id === producto.id 
            ? { ...p, cantidad: (p.cantidad || 1) + 1 } 
            : p
        );
      }
      return [...lista, { ...producto, cantidad: 1 }];
    });
  }

  quitar(id: string | null) {
    this._productos.update(lista => lista.filter(p => p.id !== id));
  }

  vaciar() {
    this._productos.set([]);
  }

  vaciarCarrito() {
    this.vaciar(); // Alias para compatibilidad con CheckoutComponent
  }

  exportarReciboXML() {
    const lista = this._productos();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;
    
    lista.forEach(p => {
      xml += `  <item>\n    <nombre>${p.nombre}</nombre>\n    <precio>${p.precio}</precio>\n  </item>\n`;
    });

    xml += `  <total_pagado>${this.total()}</total_pagado>\n</recibo>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mi_recibo.xml';
    link.click();
    URL.revokeObjectURL(url);
  }
}