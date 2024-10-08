from __future__ import annotations
from utils.logger import logger
from api.assets.responses import success_response, error_response
from RASP.sqli.main import prevent_sql_injection

from sdk.models.user import Users

"""
    @api {post} /api/register Регистрация пользователя
    @apiName register
    @apiGroup Auth
    @apiParam {String} username Имя пользователя
    @apiParam {String} password Пароль
    @apiParam {String} [email] Почта пользователя

    @apiSuccess (content) {String} message Сообщение об успешной регистрации пользователя
    @apiSuccessExample {String} Success-Response:
      HTTP/1.1 200 OK
      Registered username : password
    @apiError (Error 4xx) BadRequest Не передан какой то из ресурсов
    @apiErrorExample {json} BadRequest:
      HTTP/1.1 400 BadRequest
      {
        "error": true,
        "message": "No username"
      }
    @apiError (Error 5xx) InternalServerError Что то пошло не так.
    @apiErrorExample {json} InternalServerError:
      HTTP/1.1 500 Internal Server Error
      {
        "error": true,
        "message": "Database error"
      }
"""

@prevent_sql_injection()
async def register(request: Request) -> dict[str, str | bool]:

    logger('Register')
    identifier: list[dict[str,str]] = []

    forms: dict = request.json
    username: str = forms.get('username')
    password: str = forms.get('password')
    email: str = forms.get('email')
    if email:
        identifier.append({
            'value': email,
            'type': 'email'
        })

    user: Users = Users()
    user.username = username
    user.password = password
    user.identifier = identifier
    try:
        await user.create()

    except AttributeError as e:
        logger(f'Attribute Error {str(e)}')
        return error_response(message = str(e), status = 400)
    except BaseException as e:
        logger(f'Base Exception {str(e)}')
        return error_response(message = 'Database error', status = 500)

    return success_response(message = f'Registered {username} : {password}')
