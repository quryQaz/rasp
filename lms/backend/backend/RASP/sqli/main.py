import re
from functools import wraps
from RASP.logger import logger
from api.assets.responses import async_error_response
from .criticality_check import criticality_level_check
import logging

_logger = logging.getLogger('app')

def prevent_sql_injection(blacklist=None, exclude_quotes=False):
    """
    Decorator factory to prevent SQL injection with customizable settings.

    :param blacklist: Optional list of keywords to check against.
    :param exclude_quotes: If True, single and double quotes are not checked.
    """
    if blacklist is None:
        # Default blacklist
        blacklist = [
            '--', ';', '\\\\', '/*', '*/', '@@',
            'char', 'nchar', 'varchar', 'nvarchar',
            'alter', 'begin', 'create', 'cursor',
            'declare', 'delete', 'drop', 'exec',
            'execute', 'fetch', 'insert', 'kill',
            'select', 'sys', 'sysobjects', 'syscolumns',
            'table', 'update', "'", '"'
        ]
    if exclude_quotes:
        # Remove single and double quotes if they are not needed
        blacklist = [item for item in blacklist if item not in ["'", '"']]

    # Create a regex pattern from the blacklist
    pattern = '|'.join(re.escape(word) for word in blacklist)

    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            for param in request.json.values():
                if re.search(pattern, param, re.IGNORECASE):
                    logger(request.path, 'SQLI', param, criticality_level_check(param, blacklist))
                    return async_error_response(message="Potentially dangerous query detected!")
            return func(request, *args, **kwargs)
        return wrapper
    return decorator
