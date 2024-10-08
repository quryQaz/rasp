import re
import mimetypes
from functools import wraps
from RASP.logger import logger
from api.assets.responses import async_error_response
from .criticality_check import criticality_level_check_path_traversal
import logging

_logger = logging.getLogger('app')

def prevent_path_traversal(allowed_paths=None, allowed_file_types=None):
    """
    Decorator factory to prevent Path Traversal attacks and restrict file types.

    :param allowed_paths: Optional list of allowed paths that can be accessed.
    :param allowed_file_types: Optional list of allowed MIME types for returned files.
    """
    if allowed_paths is None:
        # Default allowed paths
        allowed_paths = ['/var/www/app/', '/home/user/app/']

    if allowed_file_types is None:
        # Default allowed file types (you can adjust these as needed)
        allowed_file_types = [
            'image/jpeg', 'image/png', 'text/plain', 'application/pdf'
        ]

    # Path Traversal pattern
    traversal_pattern = r"(\.\./|\.\.\\)"  # Detects "../" or "..\"

    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            requested_path = request.args.get('filename')  # Get the requested path
            # Path Traversal detection
            if re.search(traversal_pattern, requested_path):
                logger(request.path, 'Path Traversal', requested_path, criticality_level_check_path_traversal(requested_path))
                return async_error_response(message="Potential Path Traversal attack detected!")

            # # Check if the requested path is within allowed paths
            # if not any(requested_path.startswith(path) for path in allowed_paths):
            #     logger(request.path, requested_path, "Unauthorized path access attempt")
            #     return async_error_response(message="Unauthorized path access detected!")

            # Call the original function to get the response (file or data)
            response = func(request, *args, **kwargs)

            # Check the MIME type of the response if it's a file
            mime_type, _ = mimetypes.guess_type(requested_path)
            if mime_type and mime_type not in allowed_file_types:
                logger(request.path, 'Path Traversal', requested_path, f"Disallowed file type: {mime_type}")
                return async_error_response(message=f"Disallowed file type: {mime_type}")

            return response
        return wrapper
    return decorator
