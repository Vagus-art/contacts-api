# Update contact by ID

Update contact by ID providing name, a phone number and an ID.

**URL** : `/api/contacts/`

**Method** : `PUT`

**Data constraints**

Provide name, phone and ID.

```json
{
    "id": "[integer]",
    "name": "[string min 5]",
    "phone": "[integer min 5]"
}
```

**Data example** All fields must be sent.

```json
{
    "id": "5",
    "name": "agustin",
    "phone": "2262562363"
}
```

## Success Response

**Code** : `200 OK`

**Content**

```json
{
  "message": "UPDATE Success ID=x",
  "success": true
}
```

## Error Responses

**Condition** : If phone already exists. **(To be done)**

**Code** : `400 BAD REQUEST`

**Content** 

```json
{
  "errors": [
    {
      "error": "That phone already exist in our databases..."
    }
  ],
  "success": false
}
```

### Or

**Condition** : If fields are missed or of an invalid type.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "errors": [
    {
      "name": "Name must be at least 5 characters long..."
    },
    {
      "phone": "Phone number must be 5 digits long and only numbers..."
    },
    {
      "id": "ID must be INT"
    }
  ],
  "success": false
}
```

## Notes

* There'll be no 404 for this endpoint.
