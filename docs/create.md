# Create a new contact

Create a new contact providing name and phone number.

**URL** : `/api/contacts/`

**Method** : `POST`

**Data constraints**

Provide name and phone.

```json
{
    "name": "[string min 5]",
    "phone": "[integer min 5]"
}
```

**Data example** All fields must be sent.

```json
{
    "name": "agustin",
    "phone": "2262562363"
}
```

## Success Response

**Condition** : If everything is OK and an that phone did not exist.

**Code** : `200 OK`

## Error Responses

**Condition** : If phone already exists.

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
    }
  ],
  "success": false
}
```
