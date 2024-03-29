package com.pharmazeal.PharmaZeal.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="sales")

public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    private int quantity;

    private double total_price;

    @ManyToOne
    @JoinColumn(name = "store", nullable = false)
    private Store store;

    @ManyToOne
    @JoinColumn(name = "drug", nullable = false)
    private Drug drug;

    private LocalDate date_of_sale;

}
