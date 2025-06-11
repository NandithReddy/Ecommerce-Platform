package com.example.orderservice.service;

import com.example.orderservice.dto.ProductDTO;
import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.repository.OrderItemRepository;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final OrderItemRepository orderItemRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${product.service.url}")
    private String productServiceUrl;

    @Transactional
    public ResponseEntity<?> createOrder(UUID userId, List<OrderItem> items) {
        if (!userExists(userId)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("❌ User with ID " + userId + " does not exist.");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalPrice(BigDecimal.ZERO);

        try {
            order = orderRepository.save(order);
            updateOrderItemsPrices(items, order);
            updateOrderPrice(items, order);
            order.setItems(items);
            order = orderRepository.save(order);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    private void updateOrderItemsPrices(List<OrderItem> items, Order order) {
        for (OrderItem item : items) {
            ProductDTO product = restTemplate.getForObject(
                    productServiceUrl + "/api/products/" + item.getProductId(),
                    ProductDTO.class);
            if (product == null || product.getPrice() == null) {
                throw new RuntimeException(
                        "Unable to fetch price for product " + item.getProductId());
            }
            BigDecimal lineTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity()));
            item.setPrice(lineTotal);
            item.setOrder(order);
            orderItemRepository.save(item);
        }
    }

    private boolean userExists(UUID userId) {
        try {
            restTemplate.getForObject(
                    userServiceUrl + "/api/users/exists/" + userId,
                    String.class);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    private boolean productExists(UUID productId) {
        try {
            restTemplate.getForObject(
                    productServiceUrl + "/api/products/" + productId,
                    ProductDTO.class);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    private int getProductStock(UUID productId) {
        try {
            ProductDTO p = restTemplate.getForObject(
                    productServiceUrl + "/api/products/" + productId,
                    ProductDTO.class);
            return (p != null) ? p.getStock() : 0;
        } catch (Exception ex) {
            return 0;
        }
    }

    private void updateOrderPrice(List<OrderItem> items, Order order) {
        BigDecimal sum = BigDecimal.ZERO;
        for (OrderItem item : items) {
            if (!productExists(item.getProductId())) {
                throw new RuntimeException(
                        "❌ Product with ID " + item.getProductId() + " does not exist.");
            }
            int stock = getProductStock(item.getProductId());
            if (stock < item.getQuantity()) {
                throw new RuntimeException(
                        "❌ Product with ID " + item.getProductId() + " is out of stock.");
            }
            sum = sum.add(item.getPrice());
        }
        order.setTotalPrice(sum);
    }

    public List<Order> getOrdersByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
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
