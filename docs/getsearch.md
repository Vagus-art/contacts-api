# Search

Show 5 contacts (max) that match with the :search param.

**URL** : `/api/contacts/search/:search/`

**URL Parameters** : `search=[string]` The variable is trimmed on both sides and Html special chars are escaped.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Condition** : If any row matches with :search.

**Code** : `200 OK`

**Content example (searched "agus")**

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

## Notes

* There is no 404, response will have an empty array in case the parameter doesn't match any table row.