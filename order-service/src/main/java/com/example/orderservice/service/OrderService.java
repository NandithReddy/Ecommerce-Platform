package com.example.orderservice.service;

import com.example.orderservice.dto.ProductDTO;
import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Central business logic for creating and querying orders.
 * <p>
 * Key changes from the previous version:
 * <ul>
 *   <li>Runs inside a single transaction so the parent Order row and all OrderItem rows commit (or rollback) together.</li>
 *   <li>Relies on JPA cascade ( {@code Order.items} is {@code CascadeType.ALL} ) so we only call {@code orderRepository.save(order)} once.</li>
 *   <li>No orphan delete, so rows remain after commit.</li>
 *   <li>More explicit error logging: if any step fails, the whole transaction rolls back and caller gets HTTP 500.</li>
 * </ul>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate   restTemplate = new RestTemplate();

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${product.service.url}")
    private String productServiceUrl;

    // ────────────────────────────────────────────────────────────
    // PUBLIC API
    // ────────────────────────────────────────────────────────────

    /**
     * Create a new order for {@code userId} containing {@code items}.
     * Runs in a single DB transaction and returns the persisted Order entity.
     */
    @Transactional
    public ResponseEntity<?> createOrder(UUID userId, List<OrderItem> items) {
        // 1) validate user exists
        if (!userExists(userId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ User with ID " + userId + " does not exist.");
        }

        try {
            // 2) build Order skeleton
            Order order = new Order();
            order.setUserId(userId);
            order.setOrderDate(LocalDateTime.now());

            // 3) enrich items (prices, line totals)
            enrichItemsWithPrice(items, order);

            // 4) compute total price
            BigDecimal total = items.stream()
                    .map(OrderItem::getPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            order.setTotalPrice(total);
            order.setItems(items); // attach children (cascade saves them)

            // 5) persist once – cascade saves OrderItems too
            Order saved = orderRepository.save(order);
            log.info("✅ Order {} created for user {} ({} items)", saved.getId(), userId, items.size());
            return ResponseEntity.ok(saved);
        } catch (RuntimeException ex) {
            log.error("Failed to create order for user {}", userId, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + ex.getMessage());
        }
    }

    // ────────────────────────────────────────────────────────────
    // SUPPORTING METHODS
    // ────────────────────────────────────────────────────────────

    private void enrichItemsWithPrice(List<OrderItem> items, Order order) {
        for (OrderItem item : items) {
            ProductDTO product = restTemplate.getForObject(productServiceUrl + "/api/products/" + item.getProductId(),
                    ProductDTO.class);
            if (product == null || product.getPrice() == null) {
                throw new RuntimeException("Unable to fetch price for product " + item.getProductId());
            }

            int stock = product.getStock();
            if (stock < item.getQuantity()) {
                throw new RuntimeException("❌ Product " + item.getProductId() + " is out of stock.");
            }

            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            item.setPrice(lineTotal);
            item.setOrder(order);        // set back‑ref for cascade
        }
    }

    private boolean userExists(UUID userId) {
        try {
            restTemplate.getForObject(userServiceUrl + "/api/users/exists/" + userId, String.class);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    // ────────────────────────────────────────────────────────────
    // READ‑ONLY HELPERS
    // (kept unchanged from original service)
    // ────────────────────────────────────────────────────────────

    public List<Order> getOrdersByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public java.util.Optional<Order> getOrderById(UUID id) {
        return orderRepository.findById(id);
    }

    public void deleteOrder(UUID id) {
        orderRepository.deleteById(id);
    }
}
