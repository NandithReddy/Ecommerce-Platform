package com.example.orderservice.service;

import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.model.ProductDTO;
import com.example.orderservice.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderItemService {
    private final RestTemplate restTemplate;
    private final OrderItemRepository orderItemRepository;


   /* public void updatePrice(UUID productId, UUID orderItemId, int quantity) {
        ProductDTO product = restTemplate.getForObject("http://localhost:8081/api/products/" + productId, ProductDTO.class);
        if (product != null) {
            Optional<OrderItem> optionalOrderItem = orderItemRepository.findById(orderItemId);
            if (optionalOrderItem.isPresent()) {
                OrderItem orderItem = optionalOrderItem.get();
                orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
                orderItemRepository.save(orderItem);
            } else {
                throw new RuntimeException("OrderItem with ID " + orderItemId + " not found.");
            }
        } else {
            throw new RuntimeException("Product with ID " + productId + " not found.");
        }
    }*/
   public OrderItem createOrderItem(UUID productId, int quantity, Order order) {
       ProductDTO product = restTemplate.getForObject("http://localhost:8081/api/products/" + productId, ProductDTO.class);

       if (product == null || product.getPrice() == null) {
           throw new RuntimeException("Invalid product data for ID: " + productId);
       }

       OrderItem item = new OrderItem();
       item.setProductId(productId);
       item.setQuantity(quantity);
       item.setOrder(order);
       item.setPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)));

       return orderItemRepository.save(item);
   }

}
