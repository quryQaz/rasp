from __future__ import annotations
from utils.logger import logger
from tarantool import Connection
from datetime import datetime, timezone, timedelta
from api.assets.responses import success_response, error_response

async def get_logs(request):
    data = request.json
    filters = data.get('filters')
    try:
        connection = Connection("host.docker.internal", 3301)
        processes = connection.space("logs")
        result = processes.select()
        data = apply_filters(build_response(result), filters)
        connection.close()
    except BaseException as e:
        logger(e)
        return error_response(message = str(e))

    logger(data)
    return success_response(data = data)


def build_response(response):
    data = []
    response = sorted(response, key=lambda x: x[0])
    for _data in response:
        data.append({
            'endpoint': _data[1],
            'type': _data[2],
            'data': _data[3],
            'date': _data[4],
            'criticality': _data[5]
        })
    return data

def apply_filters(data, filters):
    if filters.get('query'):
        data = [_data for _data in data if filters.get('query') in _data.get('data')]
    if filters.get('endpoint'):
        data = [_data for _data in data if filters.get('endpoint') in _data.get('endpoint')]
    if filters.get('type'):
        data = [_data for _data in data if filters.get('type').get('value') == _data.get('type')]
    if filters.get('level'):
        data = [_data for _data in data if filters.get('level').get('value') == _data.get('criticality')]
    if filters.get('startDate'):
        data = [_data for _data in data if datetime.strptime(_data.get('date'), '%d.%m.%Y %H:%M') >= datetime.strptime(filters.get('startDate'), '%d.%m.%Y %H:%M')]
    if filters.get('endDate'):
        data = [_data for _data in data if datetime.strptime(_data.get('date'), '%d.%m.%Y %H:%M') <= datetime.strptime(filters.get('endDate'), '%d.%m.%Y %H:%M')]
    return data
