from __future__ import annotations
from copy import deepcopy
from utils.logger import logger
from sdk.models.resource import Resource


class Products(Resource):

    _name: str = ''
    _description: str = ''
    _price: int = 0
    _in_stock: bool = False

    def __init__(self, resource: Optional[Any] = None, id: Optional[str] = ''):
        logger(resource)
        logger('test123123123123123')
        super().__init__(self.__class__.__name__, resource, id)

    @property
    def name(self) -> str:
        if self._name:
            return self._name
        else:
            if 'name' in self._resource:
                return self._resource.get('name')
        return ''

    @name.setter
    def name(self, _name: str) -> None:
        self._name = _name

    @property
    def description(self) -> str:
        if self._description:
            return self._description
        else:
            if 'description' in self._resource:
                return self._resource.get('description')
        return ''

    @description.setter
    def description(self, _description: str) -> None:
        self._description = _description

    @property
    def price(self) -> int:
        if self._price:
            return self._price
        else:
            if 'price' in self._resource:
                return self._resource.get('price')
        return ''

    @price.setter
    def price(self, _price: int) -> None:
        self._price = _price

    @property
    def in_stock(self) -> bool:
        if self._in_stock:
            return self._in_stock
        else:
            if 'in_stock' in self._resource:
                return self._resource.get('in_stock')
        return ''

    @in_stock.setter
    def in_stock(self, _in_stock: bool) -> None:
        self._in_stock = _in_stock


    async def create(self) -> dict[str, str | bool]:
        if self._resource:
            await self.fill_attributes()
        logger(f'Created Products {self._name}')
        return await super().create(await self.__get_template())


    async def get_raw(self) -> dict[str, Any]:
        logger('self._resource get_raw ')
        logger(self._resource)
        template = await self.__get_template()
        return deepcopy(template)

    async def __get_template(self):
        template = {}
        if self.id:
            template['id'] = self.id
        if self.name:
            template['name'] = self.name
        if self.description:
            template['description'] = self.description
        if self.price:
            template['price'] = self.price
        if self.in_stock:
            template['in_stock'] = self.in_stock
        return template
