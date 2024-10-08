from flask import request

from api.lms.users.user.get_list import get_list
from api.lms.users.user.user_info import user_info

def users_route(app_route):
    @app_route.route('/api/users')
    async def list_users():
        return await get_list(request)

    @app_route.route('/api/user/info')
    async def get_user_info():
        return await user_info(request)
