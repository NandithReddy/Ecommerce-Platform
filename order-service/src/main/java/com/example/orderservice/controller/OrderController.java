package com.example.orderservice.controller;

import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(
        origins = {
                "https://*.vercel.app",
                "http://localhost:3000"
        },
        allowedHeaders = "*",
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestParam UUID userId,
            @RequestBody List<OrderItem> items)
    {
        return orderService.createOrder(userId, items);
    }
    @GetMapping("/test")
    public String testEndpoint() {
        return "Order Service is working!";
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam(value = "userId" , required = false) UUID userId) {
        if(userId != null) {
            return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
        }else return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable UUID id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable UUID id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}