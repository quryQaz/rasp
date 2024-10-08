#!/bin/bash
set -e
set -x

echo "******PostgreSQL initialisation******"
gosu docker psql -h localhost -p 5432 -U admin -d lms -a -f create_tables.sql
