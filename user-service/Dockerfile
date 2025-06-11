# -------- STAGE 1: build the application (Java 21 + Maven) --------
FROM eclipse-temurin:21-jdk AS builder

# Install Maven
RUN apt-get update && \
    apt-get install -y --no-install-recommends maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy pom and download dependencies
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy source code and package
COPY src ./src
RUN mvn -B clean package -DskipTests

# -------- STAGE 2: run the Spring Boot fat JAR on a JRE --------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (default 8080, can be overridden by SERVICE_PORT)
EXPOSE ${SERVICE_PORT:-8080}

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]