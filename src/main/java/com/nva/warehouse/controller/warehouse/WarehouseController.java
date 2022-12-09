package com.nva.warehouse.controller.warehouse;

import com.nva.warehouse.model.User;
import com.nva.warehouse.model.Warehouse;
import com.nva.warehouse.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/warehouse")
public class WarehouseController {
    @Autowired
    public WarehouseService warehouseService;

    @GetMapping("")
    public String warehousePage(@CookieValue(name = "id", defaultValue = "-1") Long id, Model model)
    {
        User user = new User();
        user.setId(id);
        List<Warehouse> warehouses = warehouseService.getAllWarehousesByUserId(user);
        model.addAttribute("warehouses", warehouses);
        return "warehouse/warehouse-page";
    }

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<Warehouse> createWarehouse(@CookieValue(name = "id", defaultValue = "-1") Long id, @RequestBody Warehouse warehouse)
    {
        User user = new User();
        user.setId(id);
        warehouse.setUser(user);
        System.out.println("ADD: " + warehouse);
        Warehouse rs = warehouseService.createWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(rs, HttpStatus.CREATED);
    }

    @GetMapping("/delete/{id}")
    @ResponseBody
    public void deleteWarehouse(@PathVariable("id") Long id)
    {
        warehouseService.deleteWarehouse(id);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable("id") Long id, @RequestBody Warehouse warehouse)
    {
        return new ResponseEntity<Warehouse>(warehouseService.updateWarehouse(warehouse, id), HttpStatus.OK);
    }
}
