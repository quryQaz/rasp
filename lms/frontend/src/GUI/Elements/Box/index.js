import React, { PureComponent } from 'react';
import styled from 'styled-components';
import GetColorCode from 'Utils/GetColorCode'

const MainFormWrapper = styled.div`
    background-color: ${props => props.backgroundColor ? GetColorCode(props.backgroundColor) : GetColorCode('white')};
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '70%'};
    margin: ${props => props.margin || '0'};
    border-radius: ${props => props.borderRadius || '13px'};
    border: ${props => props.borderThickness || '2px' } solid ${props => props.borderColor ? GetColorCode(props.borderColor) : GetColorCode('white')};
    ${props => props.relative ? 'position: relative;' : ''};
    min-width:  ${props => props.minWidth || '0'};
    padding: ${props => props.innerPadding || '0'};
`
class Box extends PureComponent {

  render() {

    return (
      <MainFormWrapper {...this.props} />
    )
  }
}

export default Box;
