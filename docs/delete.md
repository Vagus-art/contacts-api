# Delete contact by ID

Used to delete a specific contact with the ID provided in URL's params.

**URL** : `/api/contacts/:id`

**URL Parameters** : `id=[integer]` where is the ID of the contact on the
server.

**Method** : `DELETE`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "DELETE Success ID=x",
  "success": true
}
```

## Error Responses

**Condition** : If ID does not exist.

**Code** : `400 BAD REQUEST`

**Content**

```json
{

  "errors": [
    {
      "error": "ID 'x' not found"
    }
  ],
  "success": false
}

}
```

### Or

**Condition** : If ID is not Int.

**Code** : `400 BAD REQUEST`

**Content**

```json
{
  "errors": [
    {
      "id": "ID must be INT"
    }
  ],
  "success": false
}
```

## Notes

* 404 Response is in the Todo list.
