# Migrating

## Migrating from V1 to V2

The field type no longer returns a string through the API; now it will return a
JSON object ready for immediate use.

N.B.: the change of structure to a JSON field means that your existing data may not be saved.
