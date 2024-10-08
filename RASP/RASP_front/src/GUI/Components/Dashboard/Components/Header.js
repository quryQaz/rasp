import React from 'react';
import styled from "styled-components";

const HeaderWrapper = styled.div`
    width: 100%;
    height: 50px;
    background-color: #181818;
    font: small-caps bold 30px/1 sans-serif;
    color: white;
`

const HeaderLabel = styled.div`
    padding-top: 10px;
    padding-left: 20px;
`

export class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <HeaderWrapper>
                <HeaderLabel>
                    {this.props.label}
                </HeaderLabel>
            </HeaderWrapper>
        )
    }
}
