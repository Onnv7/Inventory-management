package com.nva.warehouse.controller.invoice;

import com.nva.warehouse.model.*;
import com.nva.warehouse.repository.InvoiceDetailsRepository;
import com.nva.warehouse.service.InvoiceDetailsService;
import com.nva.warehouse.service.InvoiceService;
import com.nva.warehouse.service.ProductService;
import com.nva.warehouse.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/invoice/import")
public class ImportInvoiceController {
    @Autowired
    InvoiceService invoiceService;

    @Autowired
    InvoiceDetailsService invoiceDetailsService;

    @Autowired
    ProductService productService;

    @Autowired
    WarehouseService warehouseService;
    @Autowired
    private InvoiceDetailsRepository invoiceDetailsRepository;

    @GetMapping("")
    public String invoiceImportPage(@CookieValue(name = "id", defaultValue = "-1") Long id, Model model)
    {
//        List<Invoice> invoices = invoiceService.getAllInvoiceByTypeAndWarehouse("import", warehouse);
//        model.addAttribute("imports", invoices);
        User user = new User();
        user.setId(id);
        List<Warehouse> warehouses = warehouseService.getAllWarehousesByUserId(user);
        model.addAttribute("warehouses", warehouses);
        return "invoice/invoice-import-page";
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
        return invoiceService.getAllInvoiceByTypeAndWarehouse("import",warehouse);
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

    @GetMapping("/details/{id}")
    @ResponseBody
    public List<?> getAllDetailsInvoice(@PathVariable("id") Long id)
    {
        Invoice invoice = new Invoice();
        invoice.setId(id);
        List<InvoiceDetails> invoiceDetails = invoiceDetailsService.getAllByInvoice(invoice);
        return invoiceDetails;
    }

    @PostMapping("/details/create/{idIv}/{idPd}")
    @ResponseBody
    @Transactional
    public ResponseEntity<InvoiceDetails> createInvoiceDetails(@PathVariable("idIv") Long idIv, @PathVariable("idPd") Long idPd,
                                               @RequestBody InvoiceDetails invoiceDetails)
    {
        Invoice invoice = new Invoice();
        invoice.setId(idIv);

        Optional<Product> product = productService.findProductById(idPd);

        invoiceDetails.setInvoice(invoice);
        invoiceDetails.setProduct(product.get());
        InvoiceDetails rs = invoiceDetailsService.createInvoiceDetails(invoiceDetails);
//        System.out.println(res.getProduct().getName());
        return new ResponseEntity<InvoiceDetails>(rs, HttpStatus.CREATED);
    }
    @GetMapping("/details/delete/{id}")
    @ResponseBody
    public void deleteInvoiceDetails(@PathVariable("id") Long id)
    {
        invoiceDetailsService.deleteInvoiceDetails(id);
    }

    @PostMapping("/details/update/{id}")
    public ResponseEntity<InvoiceDetails> updateInvoiceDetails(@PathVariable("id") Long id,
                                                        @RequestBody InvoiceDetails invoiceDetails)
    {
        return new ResponseEntity<InvoiceDetails>(invoiceDetailsService.updateInvoiceDetail(invoiceDetails, id), HttpStatus.OK);
    }
}
