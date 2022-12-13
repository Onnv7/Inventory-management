package com.nva.warehouse.service;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.InvoiceDetails;

import java.util.List;
import java.util.Optional;


public interface InvoiceDetailsService {
    List<InvoiceDetails> getAllByInvoice(Invoice invoice);
    InvoiceDetails createInvoiceDetails(InvoiceDetails invoiceDetails);
    InvoiceDetails findInvoiceDetailById(Long id);

    void deleteInvoiceDetails(Long id);
    InvoiceDetails  updateInvoiceDetail(InvoiceDetails invoiceDetails, Long id);
}
