from flask import request

from api.rasp.logs.web.logs_api import get_logs

def logs_route(app_route):
    @app_route.route('/api/logs', methods = ['POST'])
    async def logs_def():
        return await get_logs(request)
