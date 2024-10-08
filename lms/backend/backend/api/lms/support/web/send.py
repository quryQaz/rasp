from __future__ import annotations

import psycopg2
import psycopg2.extras
from utils.logger import logger
from api.assets.responses import success_response, error_response
from RASP.sqli.main import prevent_sql_injection
from sdk.models.products import Products

@prevent_sql_injection(exclude_quotes=True)
async def send(request: Request):
    logger('send')
    forms: dict = request.json
    message: str = forms.get('message').replace("'", '"')

    try:
        connection = psycopg2.connect(dbname='lms', user='admin',
                            password='postgres', host='postgres-db')
        cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(f'''INSERT INTO user_messages (user_id, message) VALUES ('123e4567-e89b-12d3-a456-426614174000', '{message}');''')
        connection.commit()
    except Exception as error:
        raise error
    finally:
        if connection:
            cursor.close()
            connection.close()

    return success_response(message = 'OK')
