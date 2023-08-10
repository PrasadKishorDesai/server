This is server file using NodeJS and express running on port 8000.
# docker dependencies
```
docker-compose -f docker-compose-network.yml -f docker-compose-deps.yml up -d
```

# node-app 
```
docker-compose -f docker-compose-network.yml -f docker-compose-app.yml up -d
```

# run all container
```
make all-up
```

# stop all container
```
make all-down
```

# run mysql container only
```
make 
```
or 
```
make up
```

# stop mysql container only
```
make down
```

# run node container only
```
make app-up
```

# stop node container only
```
make app-down
```

