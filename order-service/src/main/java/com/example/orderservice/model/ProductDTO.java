package com.example.orderservice.model;

import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;
@Getter
public class ProductDTO {
    private UUID id;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
}
