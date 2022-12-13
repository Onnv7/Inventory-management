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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<Product> createProduct(@PathVariable("id") Long id, @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("quantity") int quantity,
                                                 @RequestParam("image") MultipartFile image) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setQuantity(quantity);
        product.setImage(image.getBytes());
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        product.setWarehouse(warehouse);
        Product newProduct = productService.createProduct(product);
        return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping("warehouse/{id}")
    @ResponseBody
    public List<Product> getAllProductsByWarehouseId(@PathVariable("id") Long id)
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
    @ResponseBody
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("quantity") int quantity,
                                                 @RequestParam("image") MultipartFile image) throws IOException {
        System.out.println(quantity);
        Product product = new Product();

        product.setName(name);
        product.setDescription(description);
        product.setQuantity(quantity);
        product.setImage(image.getBytes());
        System.out.println("CHIEU DAI"+product.getImage().length);
        Product updateProduct = productService.updateProduct(product, id);
        return new ResponseEntity<Product>(updateProduct, HttpStatus.OK);
    }
}
