package com.nva.warehouse.service;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.Warehouse;

import java.util.List;

public interface InvoiceService {
    List<Invoice> getAllInvoiceByTypeAndWarehouse(String type, Warehouse warehouse);
    Invoice createInvoice(Invoice invoice);
    void deleteInvoice(Long id);
    Invoice updateInvoice(Invoice invoice, Long id);
}
