# Task CRUD.

## Initialize the project.

Run `npm install` to install all the dependencies.

## Local Database.

Remove the ___.example___ in the ___docker-compose.override.yml___ (you can change the ports that are exposed, where you want to save the database volume and run the sql scripts located in the docker/mysql folder), then run `docker-compose up -d`.

If you want to open the SQL terminal run `docker exec -it react-native-db mysql -p` where ___react-native-db___ is the name of the container declared in ___docker-compose.yml___
