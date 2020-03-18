# Get 10 contacts with offset

Show 10 contacts with offset, the number provided in params is multiplied by 10 on the server (each "page" should have 10 rows max).

**URL** : `/api/contacts/offset/:offset/`

**URL Parameters** : `offset=[integer]` where `offset` is the number of the page you want to get.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Condition** : If the offset doesn't exceed the number of rows in the database table.

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "id": 31,
      "name": "santiago",
      "phone": "22621241231"
    }
  ],
  "success": true
}
```

## Notes

* There is no error when your offset is too high, It'll respond with an empty array.