# ---------- STAGE 1: build the JAR ----------
FROM eclipse-temurin:21-jdk AS builder

# Install Maven
RUN apt-get update && \
    apt-get install -y --no-install-recommends maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Maven descriptor first – enables dependency caching
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy sources and build
COPY src ./src
RUN mvn -B clean package -DskipTests

# ---------- STAGE 2: run ----------
FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Inside Railway the container always listens on $PORT (usually 8080)
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
