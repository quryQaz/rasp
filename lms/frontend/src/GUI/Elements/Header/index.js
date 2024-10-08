import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from "styled-components";
import Box from "GUI/Elements/Box"
import ButtonWithIcon from "GUI/Elements/Buttons/ButtonWithIcon"

const HeaderWrapper = styled.div`
    position: fixed;
    width: 100%
`

export class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HeaderWrapper>
                <Box
                    width={'100%'}
                    height={'50px'}
                    borderRadius={'0px'}
                    borderThickness={'0px'}
                    minWidth={'340px'}
                    innerPadding={'0 20px'}
                >
                    <ButtonWithIcon
                        label={"Student"}
                        icon={"Icon"}
                        width={'10%'}
                        height={'100%'}
                        textColor={'black'}
                        borderThickness={'0px'}
                        fontSize={'15px'}
                        innerPadding={'0 10px'}
                        fontWeight={'bold'}
                    />
                    <ButtonWithIcon
                        label={"Дэшборд"}
                        icon={"Icon"}
                        width={'10%'}
                        height={'100%'}
                        textColor={'black'}
                        borderThickness={'0px'}
                        fontSize={'15px'}
                        innerPadding={'0 10px'}
                        fontWeight={'bold'}
                    />
                    <ButtonWithIcon
                        label={"Курсы"}
                        icon={"Icon"}
                        width={'10%'}
                        height={'100%'}
                        textColor={'black'}
                        borderThickness={'0px'}
                        fontSize={'15px'}
                        innerPadding={'0 10px'}
                        fontWeight={'bold'}
                    />
                    <ButtonWithIcon
                        label={"Расписание"}
                        icon={"Icon"}
                        width={'10%'}
                        height={'100%'}
                        textColor={'black'}
                        borderThickness={'0px'}
                        fontSize={'15px'}
                        innerPadding={'0 10px'}
                        fontWeight={'bold'}
                    />
                    <ButtonWithIcon
                        label={"Форум"}
                        icon={"Icon"}
                        width={'10%'}
                        height={'100%'}
                        textColor={'black'}
                        borderThickness={'0px'}
                        fontSize={'15px'}
                        innerPadding={'0 10px'}
                        fontWeight={'bold'}
                    />
                </Box>
            </HeaderWrapper>
        )
    }

}

export default Header;
