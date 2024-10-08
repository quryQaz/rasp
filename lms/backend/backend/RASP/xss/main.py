import re
from functools import wraps
from RASP.logger import logger
from api.assets.responses import async_error_response
from .criticality_check import criticality_level_check_xss
import logging

_logger = logging.getLogger('app')

def prevent_xss(blacklist=None):
    """
    Decorator factory to prevent XSS attacks by filtering potentially harmful input.

    :param blacklist: Optional list of HTML tags or dangerous attributes to check against.
    """
    if blacklist is None:
        # Default blacklist of HTML tags and attributes that are often used in XSS attacks
        blacklist = [
            '<script>', '</script>', '<img', '<iframe>', '<link>', '<object>', '<embed>',
            'javascript:', 'onerror=', 'onload=', '<svg', '<style', 'expression(', '<input>',
            'document.cookie', 'document.location', 'eval(', '<a', 'href='
        ]

    # Create a regex pattern from the blacklist
    pattern = '|'.join(re.escape(word) for word in blacklist)

    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            for param in request.json.values():
                if re.search(pattern, param, re.IGNORECASE):
                    logger(request.path, 'XSS', param, criticality_level_check_xss(param, blacklist))
                    return async_error_response(message="Potential XSS attack detected!")
            return func(request, *args, **kwargs)
        return wrapper
    return decorator
