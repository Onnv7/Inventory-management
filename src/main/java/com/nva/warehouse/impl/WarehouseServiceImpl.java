package com.nva.warehouse.impl;

import com.nva.warehouse.model.User;
import com.nva.warehouse.model.Warehouse;
import com.nva.warehouse.repository.WarehouseRepository;
import com.nva.warehouse.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    @Autowired
    public WarehouseRepository warehouseRepository;

    @Override
    public List<Warehouse> getAllWarehousesByUserId(User user) {
        return warehouseRepository.findAllByUser(user);
    }

    @Override
    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    @Override
    public void deleteWarehouse(Long id) {
        warehouseRepository.deleteById(id);
    }

    @Override
    public Warehouse updateWarehouse(Warehouse warehouse, Long id) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException(""));
        existingWarehouse.setCode(warehouse.getCode());
        existingWarehouse.setName(warehouse.getName());
        existingWarehouse.setAddress(warehouse.getAddress());
        warehouseRepository.save(existingWarehouse);
        return existingWarehouse;
    }
}
