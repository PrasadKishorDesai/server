This is server file using NodeJS and express running on port 8000.
# docker dependencies
```
docker-compose -f docker-compose-network.yml -f docker-compose-deps.yml up -d
```

# node-app 
```
docker-compose -f docker-compose-network.yml -f docker-compose-app.yml up -d
```
