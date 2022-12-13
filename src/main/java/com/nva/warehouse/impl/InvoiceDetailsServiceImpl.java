package com.nva.warehouse.impl;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.InvoiceDetails;
import com.nva.warehouse.model.Product;
import com.nva.warehouse.repository.InvoiceDetailsRepository;
import com.nva.warehouse.repository.ProductRepository;
import com.nva.warehouse.service.InvoiceDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceDetailsServiceImpl implements InvoiceDetailsService {
    @Autowired
    InvoiceDetailsRepository invoiceDetailsRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<InvoiceDetails> getAllByInvoice(Invoice invoice)
    {
        List<InvoiceDetails> invoiceDetails= invoiceDetailsRepository.findAllByInvoice(invoice);
        return invoiceDetails;
    }



    @Override
    public InvoiceDetails createInvoiceDetails(InvoiceDetails invoiceDetails) {
        InvoiceDetails save = invoiceDetailsRepository.saveAndFlush(invoiceDetails);
//        Optional<InvoiceDetails> result = invoiceDetailsRepository.findById(save.getId());
//        System.out.println("NAME:" + result.get().getProduct().getName() + save.getProduct().getName());
        return save;
    }

    @Override
    public InvoiceDetails findInvoiceDetailById(Long id) {
        InvoiceDetails rs =invoiceDetailsRepository.findById(id).get();
        return rs;
    }

    @Override
    public void deleteInvoiceDetails(Long id) {
        invoiceDetailsRepository.deleteById(id);
    }

    @Override
    public InvoiceDetails updateInvoiceDetail(InvoiceDetails invoiceDetails, Long id) {
        InvoiceDetails updateInvoiceDetail = invoiceDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(""));
        Product product = productRepository.findById(invoiceDetails.getProduct().getId())
                        .orElseThrow(() -> new RuntimeException(""));
        updateInvoiceDetail.setProduct(product);
        updateInvoiceDetail.setNote(invoiceDetails.getNote());
        updateInvoiceDetail.setQuantity(invoiceDetails.getQuantity());

        invoiceDetailsRepository.saveAndFlush(updateInvoiceDetail);
        return updateInvoiceDetail;
    }
}
