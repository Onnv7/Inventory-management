package com.nva.warehouse.impl;

import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.Warehouse;
import com.nva.warehouse.repository.ProductRepository;
import com.nva.warehouse.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getAllProductsByWarehouse(Warehouse warehouse) {
        List<Product> products = productRepository.findAllByWarehouse(warehouse);
        return products;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }


    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product updateProduct(Product product, Long id) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(""));
        existingProduct.setName(product.getName());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setDescription(product.getDescription());
        productRepository.save(existingProduct);
        return existingProduct;
    }
}
