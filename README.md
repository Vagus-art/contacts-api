# pg-rest-api

### Simple api for saving phone numbers.

### This api is hosted on:

[**Heroku**](https://pg-raw-api.herokuapp.com/api/contacts/) Check it out!

### If you want to host it yourself:

- Install PostgreSQL and create your database
- Run the query stored in `sql/init` to create the **contacts** table
- Install NodeJS
- Run `npm install` on this project's root folder (where **package.json** is stored) and wait for dependency downloads
- Make a .env file in the project's root folder with these variables from your postgres instance:

```dosini
   DB_USER=""
   DB_HOST=""
   DB_DATABASE=""
   DB_PASSWORD=""
   DB_PORT=
```

- Run `npm start` for normal functionality
- Run `npm run dev` for refreshes when your code changes (uses nodemon to scan the source code files)

## All Endpoints are open:

### GET

- [Get 10 contacts](docs/get.md) : `GET /api/contacts/`
- [Get 10 contacts with offset (for infinite scroll or dividing list by pages)](docs/getoffset.md) : `GET /api/contacts/offset/:offset/`
- [Get 1 contact by ID](docs/getid.md) : `GET /api/contacts/:id`
- [Search a contact](docs/getsearch.md) : `GET /api/contacts/search/:search`
- [Get table info (ammount of registered contacts)](docs/gettableinfo.md) : `GET /api/contacts/info/rowcount`

### POST

- [Create a new contact](docs/create.md) : `POST /api/contacts/`

### PUT

- [Update contact by ID](docs/update.md) : `PUT /api/contacts/`

### DELETE

- [Delete contact by ID](docs/delete.md) : `DELETE /api/contacts/:id`
- [Delete contacts by an array of IDs](docs/deletearray.md) : `DELETE /api/contacts/`

## Todo

- better postgres error handling (more edge cases)
- pass status code to response handlers, to make a more specific use of them
- reform try/catch blocks for better readability
- validation error documentation for GET requests (params)
- separating logic in routes, making controller functions (maybe)
- 404 status code in `not found` responses
- traffic limit
- input length maximum
- requests log table
- ask for .env stored admin password in PUT, POST and DELETE requests
