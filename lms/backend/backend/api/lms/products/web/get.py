from __future__ import annotations
from uuid import UUID
from api.assets.responses import success_response, error_response
from sdk.models.products import Products

import logging
logger = logging.getLogger('app')

async def get_product_by_id(product_id: UUID):
    # Проверьте, является ли product_id действительно UUID
    if not isinstance(product_id, UUID):
        raise ValueError("Invalid UUID format")

    products_store: Products = Products()

    try:
        data: dict[str, str | bool] = await products_store.search({'id': product_id})
        return_data = []
        for product in data:
            return_data.append(await product.get_raw())
        logger.debug(return_data)
    except AttributeError as e:
        logger.debug(f'Attribute Error {str(e)}')
        return error_response(message = str(e), status = 400)
    except BaseException as e:
        logger.debug(f'Base Exception {str(e)}')
        return error_response(message = 'Database error', status = 500)

    return success_response(data = return_data)
