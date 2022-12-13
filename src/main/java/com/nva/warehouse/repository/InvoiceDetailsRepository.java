package com.nva.warehouse.repository;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.InvoiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@ResponseBody
public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Long> {
    List<InvoiceDetails> findAllByInvoice(Invoice invoice);

}
