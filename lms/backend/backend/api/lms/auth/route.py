from flask import request

from api.lms.auth.web.login import login
from api.lms.auth.web.register import register

def login_route(app_route):
    @app_route.route('/api/login', methods = ['POST'])
    async def login_def():
        return await login(request)

    @app_route.route('/api/register', methods = ['POST'])
    async def register_def():
        return await register(request)
