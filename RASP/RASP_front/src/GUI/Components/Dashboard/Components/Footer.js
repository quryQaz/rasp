import React from 'react';
import styled from "styled-components";
import Reload from "styles/icons/Reload"
import ButtonWithIcon from "GUI/Elements/Buttons/ButtonWithIcon"

const FooterWrapper = styled.div`
    width: calc(100% - 340px);
    height: 41px;
    background-color: #181818;
    color: white;
    bottom: 0px;
    position: absolute;
`

const ButtonWrapper = styled.div`
    position: absolute;
    top: 25px;
    right: 10px;
    font: small-caps bold 12px/1 sans-serif;
`

const IconWrapper = styled.div`
    margin-right: 5px;

`

export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    makeIcon = (icon) => {
        return (
            <IconWrapper>
                {icon}
            </IconWrapper>
        )
    }

    render() {
        return(
            <FooterWrapper>
                <ButtonWrapper>
                      Made by Vlad
                </ButtonWrapper>
            </FooterWrapper>
        )
    }
}

// May be used ?
// <ButtonWithIcon
//     label={'Update'}
//     backgroundColor={'black'}
//     borderColor={'white'}
//     width={'150px'}
//     height={'60%'}
//     fontSize={'20px'}
//     borderRadius={'10px'}
//     margin={'5px 0px 0px 0px'}
//     icon={this.makeIcon(<Reload/>)}
// />
