package com.nva.warehouse.controller.invoice;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.User;
import com.nva.warehouse.model.Warehouse;
import com.nva.warehouse.service.InvoiceService;
import com.nva.warehouse.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/invoice/export")
public class ExportInvoiceController {
    @Autowired
    InvoiceService invoiceService;

    @Autowired
    WarehouseService warehouseService;

    @GetMapping("")
    public String invoiceExportPage(@CookieValue(name = "id", defaultValue = "-1") Long id, Model model)
    {
//        List<Invoice> invoices = invoiceService.getAllInvoiceByTypeAndWarehouse("export", warehouse);
//        model.addAttribute("exports", invoices);
        System.out.println("PAGE EXPORT");
        User user = new User();
        user.setId(id);
        List<Warehouse> warehouses = warehouseService.getAllWarehousesByUserId(user);
        model.addAttribute("warehouses", warehouses);
        return "invoice/invoice-export-page";
    }

    @PostMapping("/create/{id}")
    @ResponseBody
    public ResponseEntity<Invoice> createInvoice(@PathVariable("id") Long id, @RequestBody Invoice invoice)
    {
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        invoice.setWarehouse(warehouse);
        Invoice newInvoice = invoiceService.createInvoice(invoice);
        return new ResponseEntity<Invoice>(newInvoice, HttpStatus.CREATED);
    }

    @GetMapping("warehouse/{id}")
    @ResponseBody
    public List<Invoice> getAllWarehousesByWarehouseId(@PathVariable("id") Long id)
    {
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        return invoiceService.getAllInvoiceByTypeAndWarehouse("export",warehouse);
    }

    @GetMapping("/delete/{id}")
    @ResponseBody
    public void deleteInvoice(@PathVariable("id") Long id)
    {
        invoiceService.deleteInvoice(id);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable("id") Long id, @RequestBody Invoice invoice)
    {
        return new ResponseEntity<Invoice>(invoiceService.updateInvoice(invoice, id), HttpStatus.OK);
    }
}
