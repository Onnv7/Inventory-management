package com.nva.warehouse.controller.product;

import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.User;
import com.nva.warehouse.model.Warehouse;
import com.nva.warehouse.repository.ProductRepository;
import com.nva.warehouse.service.ProductService;
import com.nva.warehouse.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    public ProductService productService;

    @Autowired
    public WarehouseService warehouseService;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    public String productPage(@CookieValue(name = "id", defaultValue = "-1") Long id, Model model) {
        User user = new User();
        user.setId(id);
        List<Warehouse> warehouses = warehouseService.getAllWarehousesByUserId(user);
        model.addAttribute("warehouses", warehouses);
        return "product/product-page";
    }

    @PostMapping("/create/{id}")
    @ResponseBody
    public ResponseEntity<Product> createProduct(@PathVariable("id") Long id, @RequestBody Product product)
    {
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        product.setWarehouse(warehouse);
        Product newProduct = productService.createProduct(product);
        return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping("warehouse/{id}")
    @ResponseBody
    public List<Product> getAllWarehousesByWarehouseId(@PathVariable("id") Long id)
    {
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        return productService.getAllProductsByWarehouse(warehouse);
    }

    @GetMapping("/delete/{id}")
    @ResponseBody
    public void deleteProduct(@PathVariable("id") Long id)
    {
        productService.deleteProduct(id);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product)
    {
        return new ResponseEntity<Product>(productService.updateProduct(product, id), HttpStatus.OK);
    }
}
