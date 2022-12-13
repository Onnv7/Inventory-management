package com.nva.warehouse.repository;

import com.nva.warehouse.model.Invoice;
import com.nva.warehouse.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findAllByTypeAndWarehouse(String type, Warehouse warehouse);

}
