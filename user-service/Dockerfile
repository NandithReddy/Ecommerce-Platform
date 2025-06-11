# user-service/Dockerfile
FROM eclipse-temurin:21-jre           

WORKDIR /app

# Copy the fat JAR produced by mvn package
COPY target/*.jar app.jar

# Run the app
ENTRYPOINT ["java","-jar","/app/app.jar"]
