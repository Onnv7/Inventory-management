package com.nva.warehouse.repository;

import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByWarehouse(Warehouse warehouse);

}
