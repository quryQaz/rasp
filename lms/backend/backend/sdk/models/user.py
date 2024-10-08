from __future__ import annotations
from copy import deepcopy
from utils.logger import logger
from sdk.models.resource import Resource


class Users(Resource):

    _username: str = ''
    _password: str = ''
    _identifier: list[dict[str,str]] = []

    def __init__(self, resource: Optional[Any] = None, id: Optional[str] = ''):
        super().__init__(self.__class__.__name__, resource, id)

    @property
    async def username(self) -> str:
        if self._username:
            return self._username
        else:
            userlogin: dict[str, Any] = await self.get()
            if 'username' in userlogin:
                return userlogin.get('username')
        return ''

    @username.setter
    def username(self, _username: str) -> None:
        self._username = _username

    @property
    async def password(self) -> str:
        if self._password:
            return self._password
        else:
            userlogin: dict[str, Any] = await self.get()
            if 'password' in userlogin:
                return userlogin.get('password')
        return ''

    @password.setter
    def password(self, _password: str) -> None:
        self._password = _password

    @property
    async def identifier(self) -> list[dict[str,str]]:
        if self._identifier:
            return self._identifier
        else:
            userlogin: dict[str, Any] = await self.get()
            if 'identifier' in userlogin:
                return userlogin.get('identifier')
        return []

    @identifier.setter
    def identifier(self, _identifier: list[dict[str,str]]) -> None:
        self._identifier = _identifier


    async def create(self) -> dict[str, str | bool]:
        if self._resource:
            await self.fill_attributes()

        if not self.__validate():
            return self.__validate()


        logger(f'Created UserLogin {self._username} {self._password}')
        return await super().create(await self.__get_template())

    async def get_raw() -> dict[str, Any]:
        template = await self.__get_template()
        return deepcopy(template)

    async def __get_template(self):
        template = {}
        if self._id:
            template['id'] = self._id
        if self._username:
            template['username'] = self._username
        if self._password:
            template['password'] = self._password
        if self._identifier:
            template['identifier'] = str(self._identifier).replace('\'', '"')
        return template


    def __validate(self) -> dict[str, str | bool]:
        if not self._username:
            raise AttributeError('No username')
        if not self._password:
            raise AttributeError('No password')
        return True
