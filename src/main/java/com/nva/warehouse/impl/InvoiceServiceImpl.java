package com.nva.warehouse.impl;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.Product;
import com.nva.warehouse.model.Warehouse;
import com.nva.warehouse.repository.InvoiceRepository;
import com.nva.warehouse.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;

    @Override
    public List<Invoice> getAllInvoiceByTypeAndWarehouse(String type, Warehouse warehouse)
    {
        return invoiceRepository.findAllByTypeAndWarehouse(type, warehouse);
    }

    @Override
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @Override
    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    public Invoice updateInvoice(Invoice invoice, Long id) {
        Invoice existingInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(""));
        existingInvoice.setTitle(invoice.getTitle());
        existingInvoice.setDate(invoice.getDate());
        existingInvoice.setNote(invoice.getNote());
        existingInvoice.setType(invoice.getType());
        invoiceRepository.save(existingInvoice);
        return existingInvoice;
    }


}
