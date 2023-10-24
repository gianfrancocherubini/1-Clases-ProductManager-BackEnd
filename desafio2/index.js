const fs = require('fs');

class ProductManager {

    constructor(archivo) {
      this.path = archivo;
      this.products = this.getProducts(); 
    }

    getProducts() {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
      } else {
          return [];
      }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
      let productos = this.getProducts();

      let productWithSameCode = productos.find(product => product.code === code);

      if (productWithSameCode) {
        console.log("El producto ya está ingresado.");
        return;
      }

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }

      let id = 1;
      if (productos.length > 0) {
        id = productos[productos.length - 1].id + 1;
      }

      let newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      productos.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));
    }

    getProductById(id) {
      const productos = this.getProducts();
      const product = productos.find(product => product.id === id);

      if (product) {
        console.log("El producto encontrado es:", product);
      } else {
          console.log("Producto no encontrado");
      }
    }

    updateProduct(id, fieldToUpdate, newValue) {
      const productos = this.getProducts();
      const productIndex = productos.findIndex(product => product.id === id);

      if (productIndex === -1) {
        console.log("Producto no encontrado.");
        return;
      }

      const updatedProduct = { ...productos[productIndex] };

      updatedProduct[fieldToUpdate] = newValue;

      productos[productIndex] = updatedProduct;

      fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));

      console.log("Producto actualizado con éxito:", updatedProduct);
  }

    deleteProduct(id) {
      const productos = this.getProducts();
      const productIndex = productos.findIndex(product => product.id === id);

      if (productIndex === -1) {
        console.log("Producto no encontrado. No se puede eliminar.");
        return;
      }

      productos.splice(productIndex, 1);

      fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));

      console.log("Producto eliminado con éxito.");
    }

}

let product = new ProductManager('./desafio2/products.json');

// PRODUCTO CON PROPIEDAD VVACIA
// product.addProduct('Zapatilla deportiva',3000,'https://www.nike.com.ar/zapatillas-nike-air-max-dawn-dr2395-100/p', 'AA123', 50)

// PRODUCTO COMPLETO
// product.addProduct('Zapatilla','Zapatilla deportiva',2000,'https://www.nike.com.ar/zapatillas-nike-air-max-dawn-dr2395-100/p', 'AA1234', 50)

// PRODUCTO CON MISMO CODIGO
// product.addProduct('Zapatilla','Zapatilla deportiva',2000,'https://www.nike.com.ar/zapatillas-nike-air-max-dawn-dr2395-100/p', 'AA1234', 50)

// PRODUCTO COMPLETO NUEVO
// product.addProduct('Remera Nike','Remera deportiva',1500,'https://www.nike.com.ar/nike-drifit-strike-dv9225-043/p', 'AA1235', 15)

// BUSCAR TODOS LOS PRODUCTOS
// console.log(product.getProducts())

// BUSCAR PRODUCTO SEGUN ID
// product.getProductById(1)
 
// ACTUALIZACION DE PRODUCTO
// product.updateProduct(1, "price", 99.99);

// BORRAR PRODUCTO
// product.deleteProduct(1);
// console.log(product.getProducts())
