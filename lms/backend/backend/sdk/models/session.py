from __future__ import annotations
from copy import deepcopy
from utils.logger import logger
from datetime import datetime

from sdk.models.resource import Resource

class Session(Resource):

    _access_token: str = ''
    _refresh_token: str = ''
    _type: str = ''
    _start_time: datetime = ''
    _user_id: str = ''

    user_has_role: UserHasRole = None

    def __init__(self, resource: Optional[Any] = None, id: Optional[str] = ''):
        super().__init__(self.__class__.__name__, resource, id)

    @property
    async def id(self) -> str:
        if self._id:
            return self._id
        else:
            session: dict[str, Any] = await self.get()
            return session.get('id')

    @id.setter
    def id(self, _id: str) -> None:
        self._id = _id

    @property
    async def type(self) -> str:
        if self._type:
            return self._type
        else:
            session: dict[str, Any] = await self.get()
            if 'type' in session:
                return session.get('type')
        return ''

    @type.setter
    def type(self, _type: str) -> None:
        self._type = _type

    @property
    async def start_time(self) -> str:
        if self._start_time:
            return self._start_time
        else:
            session: dict[str, Any] = await self.get()
            if 'start_time' in session:
                return session.get('start_time')
        return ''

    @start_time.setter
    def start_time(self, _start_time: datetime) -> None:
        self._start_time = _start_time

    @property
    async def user_id(self) -> str:
        if self._user_id:
            return self._user_id
        else:
            session: dict[str, Any] = await self.get()
            if 'user_id' in session:
                return session.get('user_id')

        return ''

    @user_id.setter
    def user_id(self, _user_id: str) -> None:
        self._user_id = _user_id

    @property
    async def access_token(self) -> str:
        if self._access_token:
            return self._access_token
        else:
            session: dict[str, Any] = await self.get()
            if 'access_token' in session:
                return session.get('access_token')
        return ''

    @access_token.setter
    def access_token(self, token: str):
        self._access_token = token

    @property
    async def refresh_token(self) -> str:
        if self._refresh_token:
            return self._refresh_token
        else:
            session: dict[str, Any] = await self.get()
            if 'refresh_token' in session:
                return session.get('refresh_token')
        return ''

    @refresh_token.setter
    def refresh_token(self, token: str):
        self._refresh_token = token

    async def create(self) -> dict[str, str | bool]:
        logger('Start create')
        if self._resource:
            await self.fill_attributes()

        logger(f'Created Session {self._user_id} {self._type}')

        return await super().create(await self.__get_template())

    async def __get_template(self):
        template = {}
        if self._id:
            template['id'] = self._id
        if self._type:
            template['type'] = self._type
        if self._user_id:
            template['user_id'] = self._user_id
        if self._start_time:
            template['start_time'] = self._start_time
        if self._access_token:
            template['access_token'] = self._access_token
        if self._refresh_token:
            template['refresh_token'] = self._refresh_token
        return template
