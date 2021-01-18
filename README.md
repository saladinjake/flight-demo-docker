# Flyingo Travel Agency

## How to run the application

1. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```
2. Access the application:
   - Frontend: [http://localhost:3101](http://localhost:3101)
   - API: [http://localhost:5101](http://localhost:5101)

## How to seed the database

Run the following command to populate the database with sample flights:
```bash
docker exec flyingo_api npm run seed
```

To destroy the sample data:
```bash
docker exec flyingo_api npm run seed:destroy
```
