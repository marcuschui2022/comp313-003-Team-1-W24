# Use the official OpenJDK Java base image
FROM openjdk:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR into the container
COPY target/FoodistaBackend-0.0.1-SNAPSHOT.jar /app/FoodistaBackend.jar

# Expose the application's port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "FoodistaBackend.jar"]