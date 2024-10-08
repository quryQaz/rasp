from flask import request

from api.lms.support.web.send import send

def support_route(app_route):
    @app_route.route('/api/support/send', methods = ['POST'])
    async def support_send():
        return await send(request)
