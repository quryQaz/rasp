from flask import Flask, render_template_string, request, jsonify
from uuid import UUID
from api.lms.products.web.search import search
from api.lms.products.web.create import create
from api.lms.products.web.get_image import get_image
from api.lms.products.web.comments import post_comment, get_comments
from api.lms.products.web.get import get_product_by_id

import logging
logger = logging.getLogger('app')

def products_route(app_route):
    @app_route.route('/api/products/$search', methods=['POST'])
    async def products_search():
        return await search(request)

    @app_route.route('/api/products/<uuid:id>', methods=['GET'])
    async def get_product(id):
        try:
            # `id` уже будет UUID объектом
            product = await get_product_by_id(id)
            if product:
                return jsonify(product)
            else:
                return jsonify({'error': 'Product not found'}), 404
        except ValueError:
            return jsonify({'error': 'Invalid UUID format'}), 400

    @app_route.route('/api/products/create', methods=['POST'])
    async def create_product():
        return await create(request)

      # Эндпоинт с уязвимостью path traversal
    @app_route.route('/api/images', methods=['GET'])
    async def get_image_endpoint():
        return await get_image(request)


    @app_route.route('/comments', methods=['POST'])
    async def post_comment_endpoint():
        return await post_comment(request)

    @app_route.route('/comments', methods=['GET'])
    async def get_comments_endpoint():
        return await get_comments()
