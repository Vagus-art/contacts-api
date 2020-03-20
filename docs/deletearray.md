# Delete contacts by an array of IDs

Delete one or more contacts with the IDs provided in the request body.

**URL** : `/api/contacts/`

**Method** : `DELETE`

**Data constraints**

Provide IDs in an array.

```json
{
    "id": "[array of integer]"
}
```

**Data example** All fields must be sent.

```json
{
    "id":[44,125,42]
}
```

## Success Response

**Code** : `200 OK`

**Content**

```json
{
  "message": "DELETE Success ID=[a,b,c]",
  "success": true
}
```

## Error Responses

**Condition** : If none of the IDs provided exist

**Code** : `400 BAD REQUEST`

**Content** 

```json
{
  "errors": [
    {
      "error": "None of these IDS 'a,b,c' were found"
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
      "id": "ID must be an array of INT"
    }
  ],
  "success": false
}
```

## Notes

* 400 status must be 404 on the "not found" response **This is in my Todo List**.
