from __future__ import annotations
from flask import make_response
from aiohttp import web

def error_response(message: str = '', status: int = 500):
    return ({'error': True, 'message': message}, status)

def success_response(message: str = '', data: dict[Any, Any] = {}, status: int = 200):
    return ({'error': False, 'message': message, 'data': data}, status)
