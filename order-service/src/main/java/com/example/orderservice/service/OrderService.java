package com.example.orderservice.service;

import com.example.orderservice.dto.ProductDTO;
import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.repository.OrderItemRepository;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final OrderItemRepository orderItemRepository;

    public ResponseEntity<?> createOrder(UUID userId, List<OrderItem> items) {
        if (!userExists(userId)) {
            throw new RuntimeException("❌ User with ID " + userId + " does not exist.");
        }
        Order order = new Order();  // ✅ Create the order first
        order.setUserId(userId);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalPrice(BigDecimal.valueOf(0));

        try {
            order = orderRepository.save(order);
            updateOrderItemsPrices(items , order);
            updateOrderPrice(items, order);
            order.setItems(items);
        }catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }


        return ResponseEntity.ok(orderRepository.save(order));
    }

    private void updateOrderItemsPrices(List<OrderItem> items , Order order) {
        for (OrderItem item : items) {
            ProductDTO product = restTemplate.getForObject(
                    "http://localhost:8081/api/products/" + item.getProductId(),
                    ProductDTO.class);
            if (product != null && product.getPrice() != null) {
                item.setPrice(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                item.setOrder(order);
                item = orderItemRepository.save(item);

            } else {
                throw new RuntimeException("Unable to fetch product price before saving order item.");
            }
        }
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
    private int getProductStock(UUID productId) {
        String url = "http://localhost:8081/api/products/" + productId;
        try {
            ProductDTO product = restTemplate.getForObject(url, ProductDTO.class);
            return (product != null) ? product.getStock() : 0;
        } catch (Exception e) {
            return 0; // If an error occurs, assume stock is 0
        }
    }

    public void updateOrderPrice(List<OrderItem> items , Order o)
    {
        BigDecimal sum = BigDecimal.valueOf(0);
        for (OrderItem item : items) {
            if (!productExists(item.getProductId())) {
                throw new RuntimeException("❌ Product with ID " + item.getProductId() + " does not exist.");
            }

            int stock = getProductStock(item.getProductId());
            if (stock < item.getQuantity()) {
                throw new RuntimeException("❌ Product with ID " + item.getProductId() + " is out of stock.");
            }
            sum = sum.add(item.getPrice());
        }
        o.setTotalPrice(sum);

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
