package com.nva.warehouse.repository;

import com.nva.warehouse.model.User;
import com.nva.warehouse.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Warehouse> findAllByUser(User user);
}
