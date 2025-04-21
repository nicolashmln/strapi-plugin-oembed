# Migrating to v2

## Back-end and schema changes

The API now returns data in a different format.

| Old name  | New name  | Notes                                      |
| --------- | --------- | ------------------------------------------ |
| url       | url       | Unchanged                                  |
| rawData   | oembed    | Returns the same raw data                  |
| thumbnail | thumbnail | Returns the base64 encoded thumbnail image |
| title     | _Removed_ | Use `oembed.title` instead                 |
| mime      | _Removed_ | Use `oembed.provider` instead              |

In order to migrate your existing data, you must:

1.  Make a back-up of your database.
2.  Create a new [database migration](https://docs.strapi.io/cms/database-migrations)
    in the folder `database/migrations/`.
3.  Copy the contents of `database/migrations/example.js` in this repo to your
    new file.
4.  Update the `MIGRATION_MAP` variable. It should contain an array of any
    referenced instances of `plugin::oembed.oembed`. For example:

```javascript
const MIGRATION_MAP = [
  ['components_collection_name', 'field_name'],
  ['components_articles', 'video'],
  ['components_articles', 'tweet'],
  ['components_articles', 'picture'],
];
```

You can then restart your Strapi instance with `npm run dev` or `yarn dev` and
the migration will be applied.

## Front-end changes

The API no longer returns a string that you need to parse. Instead it now
returns the JSON object. The field names have also changed as described above.
