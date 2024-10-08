from __future__ import annotations
import psycopg2
import psycopg2.extras
from sdk.constants import *
from utils.logger import logger
from RASP.sqli.main import prevent_sql_injection

def insert_query(query: str) -> dict[str, str | bool] | None:
    __execute(query)

def select_query(query: str) -> dict[str, str | bool]:
    return __execute(query, return_result = True)

# TODO переписать как нибудь нормально. Пока так, ибо делаю это в 3 ночи и не придумал как лучше :)
def prepare_query(query, resource_name, params = []):
    if query == INSERT:
        new_query = query % (resource_name, prepare_fields(params))
        new_query += ' ('
        for i in range(len(params) - 1):
            new_query += f"'%s',"
        new_query += "'%s')"
        return new_query
    elif query == SELECT:
        logger(params)
        new_query = query % (resource_name,)
        new_query += ' where '
        for param in params[0:-1]:
            new_query += f"{param} = '%s' and "
        new_query += f"{params[-1]} = '%s'"
    return new_query

def prepare_fields(params):
    fields = ''
    for param in params[0:-1]:
        fields += f'{param}, '
    fields += f'{params[-1]}'
    return f' ({fields})'

def __execute(query: str, return_result: bool = False) -> dict[str, str | bool]:

    result = []
    try:
        connection = psycopg2.connect(dbname='lms', user='admin',
                            password='postgres', host='postgres-db')
        cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(query)
        if return_result:
            result = cursor.fetchall()
        connection.commit()
    except ValueError as e:
        logger(f'Potential sqli detected {str(e)}')
        raise 'Potential sqli detected!'
    except Exception as error:
        raise error
    finally:
        if connection:
            cursor.close()
            connection.close()

    return result
