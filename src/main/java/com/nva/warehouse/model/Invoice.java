package com.nva.warehouse.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String title;
    private String type;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date date;
    private String note;

    @JsonIgnore
    @OneToMany(mappedBy ="invoice", cascade = CascadeType.ALL)
    private Set<InvoiceDetails> invoiceDetails;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

}