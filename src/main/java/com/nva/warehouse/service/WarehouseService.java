package com.nva.warehouse.service;

import com.nva.warehouse.model.User;
import com.nva.warehouse.model.Warehouse;

import java.util.List;

public interface WarehouseService {
    List<Warehouse> getAllWarehousesByUserId(User user);
    Warehouse createWarehouse(Warehouse warehouse);
    void deleteWarehouse(Long id);
    Warehouse updateWarehouse(Warehouse warehouse,Long id);
}
