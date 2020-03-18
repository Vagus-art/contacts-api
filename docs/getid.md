# Get contact by ID

Show a single contact.

**URL** : `/api/contacts/:id`

**URL Parameters** : `id=[integer]` where is the ID of the contact on the
server.

**Method** : `GET`

## Success Response

**Condition** : If contact exists.

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "id": 30,
      "name": "agustin",
      "phone": "22626791231"
    }
  ],
  "success": true
}
```

## Error Responses

**Condition** : If contact does not exist with `id` provided.

**Code** : `404 NOT FOUND`

**Content** : `{}`

## Notes

* 404 Response is in the Todo list.
