# Migrating

## Migrating from V1 to V2

The field type no longer returns a string through the API; now it will return a
JSON object ready for immediate use.

Make sure that you change your component definition.

```
     "oembed": {
-      "type": "customField",
+      "type": "json",
       "customField": "plugin::oembed.oembed"
     }
```
