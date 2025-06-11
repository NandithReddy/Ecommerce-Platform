# ───── STAGE 1 ─────
FROM eclipse-temurin:21-jdk AS builder           # or 21-jdk-jammy / 21-jdk-alpine

RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY pom.xml .
RUN mvn -B dependency:go-offline      # cache deps
COPY src ./src
RUN mvn -B clean package -DskipTests

# ───── STAGE 2 ─────
FROM eclipse-temurin:21-jre            # or 21-jre-jammy / 21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE ${SERVICE_PORT:-8080}
ENTRYPOINT ["java","-jar","app.jar"]
