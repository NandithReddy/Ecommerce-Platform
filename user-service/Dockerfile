# -------- STAGE 1: build the Spring Boot jar --------
FROM maven:3.9.3-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy only what’s needed to resolve deps, to leverage cache
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Now copy your sources and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# -------- STAGE 2: package the jar into a minimal runtime --------
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run it
ENTRYPOINT ["java","-jar","app.jar"]