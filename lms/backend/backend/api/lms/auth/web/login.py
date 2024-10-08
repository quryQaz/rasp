from __future__ import annotations
from datetime import datetime, timedelta
import jwt

from utils.logger import logger
from api.assets.responses import success_response, error_response
from RASP.sqli.main import prevent_sql_injection

from sdk.models.user import Users
from sdk.models.session import Session

@prevent_sql_injection()
async def login(request: Request):
    logger('Login')
    logger(request.json)
    if 'refresh_token' in request.json:
        return await session_refresh(request)
    else:
        return await session_start(request)


async def session_start(request):
    request_data = request.json

    user_login_store: Users = Users()
    data: dict[str, str | bool] = await user_login_store.search({'username': request_data.get('username'), 'password': request_data.get('password')})
    if not len(data) > 0:
        return error_response(message='Not authorized', status = 400)
    user_login = data[0]

    tokens = await create_tokens(await user_login.id)

    session: Session = Session()
    session.user_id = await user_login.id
    session.type = 'password'
    session.start_time = datetime.now()
    session.access_token = tokens.get('access_token')
    session.refresh_token = tokens.get('refresh_token')
    await session.create()

    return success_response(message='Authorized', data = tokens)

# async def session_refresh(request):

async def create_tokens(user_id):
    expiration_time = datetime.now() + timedelta(seconds=1000)

    access_token = jwt.encode({'sub': user_id, 'exp': expiration_time,
        'iat': datetime.now()}, 'secret_g2kFje1', algorithm='HS256')

    refresh_token = jwt.encode({'sub': user_id, 'iat': datetime.now()},
        'secret_g2kFje1', algorithm='HS256')

    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
    }
