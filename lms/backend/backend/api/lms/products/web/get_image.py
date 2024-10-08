from __future__ import annotations
import os
from flask import request, jsonify, send_file
from RASP.path_traversal.main import prevent_path_traversal

import logging
logger = logging.getLogger('app')

@prevent_path_traversal()
async def get_image(request):
    try:
        filename = request.args.get('filename')
        logger.debug(filename)
        # Собираем полный путь без нормализации
        file_path = os.path.join(f'{os.getcwd()}/storage', filename)  # Заменяем 'storage' на os.getcwd() чтобы разрешить переход вверх
        # Проверяем, существует ли файл
        if os.path.exists(file_path):
            # Отправляем файл напрямую
            return send_file(file_path)
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
