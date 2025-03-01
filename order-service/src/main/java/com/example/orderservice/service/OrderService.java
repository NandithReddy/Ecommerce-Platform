package com.example.orderservice.service;

import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Order createOrder(UUID userId, List<OrderItem> items) {
        if (!userExists(userId)) {
            throw new RuntimeException("User with ID " + userId + " does not exist.");
        }

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (OrderItem item : items) {
            if (!productExists(item.getProductId())) {
                throw new RuntimeException("Product with ID " + item.getProductId() + " does not exist.");
            }

            totalPrice = totalPrice.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(items);
        order.setTotalPrice(totalPrice);
        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }



    private final RestTemplate restTemplate = new RestTemplate();

    private boolean userExists(UUID userId) {
        String url = "http://localhost:8080/api/users/" + userId;
        try {
            restTemplate.getForObject(url, String.class);
            return true; // If the request succeeds, the user exists
        } catch (Exception e) {
            return false; // If an error occurs, the user doesn't exist
        }
    }
    private boolean productExists(UUID productId) {
        String url = "http://localhost:8081/api/products/" + productId;
        try {
            restTemplate.getForObject(url, String.class);
            return true; // Product exists
        } catch (Exception e) {
            return false; // Product does not exist
        }
    }



    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(UUID id) {
        return orderRepository.findById(id);
    }

    public void deleteOrder(UUID id) {
        orderRepository.deleteById(id);
    }
}
