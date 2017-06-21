To run local mongo:

In a console run: 
> mongod
This will start the deamon and start listening for connections on port 27017

In another console create the messages database for testing: 
> mongo
> use messages

To start the server:
> npm start
This will use nodemon to start the server, watch for changes in the code and restart the server.
