# ───────── STAGE 1: compile your .jar with Java 21 + Maven ─────────
FROM eclipse-temurin:21-jdk-slim AS builder

# install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# grab just the pom, download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# copy sources & build
COPY src ./src
RUN mvn clean package -DskipTests -B

# ───────── STAGE 2: run your Spring Boot app on a slim JRE ─────────
FROM eclipse-temurin:21-jre-slim

WORKDIR /app

# copy the fat-JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# expose the port each service uses
# user-service → 8080, product-service → 8081, order-service → 8082
EXPOSE  ${SERVICE_PORT:-8080}

ENTRYPOINT ["java","-jar","app.jar"]
