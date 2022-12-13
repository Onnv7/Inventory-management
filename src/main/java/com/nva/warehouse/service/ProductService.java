package com.nva.warehouse.service;

import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.Warehouse;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProductsByWarehouse(Warehouse warehouse);
    Product createProduct(Product product);
    void deleteProduct(Long id);
    Product updateProduct(Product product,Long id);

    Optional<Product> findProductById(Long id);
}
