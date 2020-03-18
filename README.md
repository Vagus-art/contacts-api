# pg-rest-api

### Simple api for saving phone numbers.

## All Endpoints are open:

### GET

 * [Get 10 contacts](docs/get.md) : `GET /api/contacts/`
 * [Get 10 contacts with offset (for infinite scroll or dividing list by pages)](docs/getoffset.md) : `GET /api/contacts/offset/:offset/`
 * [Get 1 contact by ID](docs/getid.md) : `GET /api/contacts/:id`
 * [Search a contact](docs/getsearch.md) : `GET /api/contacts/search/:search`
 * [Get table info (ammount of registered contacts)](docs/gettableinfo.md) : `GET /api/contacts/info/rowcount`

### POST

 * [Create a new contact](docs/create.md) : `POST /api/contacts/`

### PUT

 * [Update contact by ID](docs/update.md) : `PUT /api/contacts/`

### DELETE

 * [Delete contact by ID](docs/delete.md) : `DELETE /api/contacts/:id`
 * [Delete contacts by an array of IDs](docs/deletearray.md) : `DELETE /api/contacts/`

## Todo

- better postgres error handling (more edge cases)
- reform try/catch blocks for better readability
- api documentation (markdown language learning opportunity)
- validation error documentation
- separating logic in routes, making controller functions (maybe)
- 404 responses