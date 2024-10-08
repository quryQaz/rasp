from tarantool import Connection
import datetime
import logging

_logger = logging.getLogger('app')

def logger(endpoint, type: str, data: str, criticality: str): # Запись новых элементов
    try:
        connection = Connection("host.docker.internal", 3301)
        space = connection.space('logs')
        response = space.call(f"box.space.logs:auto_increment", [[endpoint, \
            type, \
            data.replace("'", '&quot'), \
            datetime.datetime.now().strftime("%d.%m.%Y %H:%M"), \
            criticality]])

        connection.close()
        _logger.debug(response)
        return response
    except BaseException as e:
        _logger.error(f'ERROR {e}')
