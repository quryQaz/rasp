import re
from functools import wraps
from RASP.logger import logger
from api.assets.responses import async_error_response
from .criticality_check import criticality_level_check_ssti
import logging

_logger = logging.getLogger('app')

def prevent_ssti(blacklist=None):
    """
    Decorator factory to prevent Server-Side Template Injection (SSTI).

    :param blacklist: Optional list of template expressions to check against.
    """
    if blacklist is None:
        # Default blacklist of template expressions used in SSTI attacks
        blacklist = [
            '{{', '}}', '{%', '%}', '#{', '}}', '{{=', '${', '}}',  # Common SSTI markers in various templating engines
            '.class', '.constructor', 'self', '__globals__', '__class__', '__init__',
            '__import__', 'os', 'sys', 'subprocess', 'eval', 'exec', 'import',
            'config', 'request', 'url_for', 'session', 'join', 'mro'
        ]

    # Create a regex pattern from the blacklist
    pattern = '|'.join(re.escape(word) for word in blacklist)

    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            _logger.debug("here we are")
            for param in request.json.values():
                _logger.debug(param)
                if re.search(pattern, param, re.IGNORECASE):
                    logger(request.path, 'SSTI', param, criticality_level_check_ssti(param, blacklist))
                    return async_error_response(message="Potential SSTI attack detected!")
            return func(request, *args, **kwargs)
        return wrapper
    return decorator
