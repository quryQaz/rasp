import React, { PureComponent } from 'react';
import styled from 'styled-components';
import GetColorCode from 'Utils/GetColorCode'

const ButtonWrapper = styled.div`
    display: flex;
    padding: ${props => props.padding ? props.padding : '5px 10px'};
    margin: ${props => props.margin || '0'};
    justify-content: center;
    align-items: center;
    width: ${props => props.width || ''};
    height: ${props => props.height || ''};
    min-width: auto;
    font-size: ${props => props.fontSize || '12px'};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    background: ${props => props.disabled ? GetColorCode('white') : GetColorCode(props.backgroundColor)};
    color: ${props => props.textColor ? GetColorCode(props.textColor) : GetColorCode('white')};
    border-radius: ${props => props.borderRadius || '13px'};
    border: ${props => props.borderThickness ? props.borderThickness : '2px'} solid ${props => props.borderColor ? GetColorCode(props.borderColor) : GetColorCode('orange')};
    padding: ${props => props.innerPadding || '0'};
`;

const IconWrapper = styled.div`
    margin-right: 5px;
`;
const LabelWrapper = styled.div`
    font-weight: ${props => props.fontWeight ? props.fontWeight : ''};
`;

class ButtonWithIcon extends PureComponent {

  onClick = (e, event) => {
      if (!this.props.disabled) {
          if (this.props.onClick)
              this.props.onClick(e, event);
      }
  };

  render() {

    const {
        label,
        icon
    } = this.props;

    return (
      <ButtonWrapper
        {...this.props}
      >
        <>
          <IconWrapper>
              {icon}
          </IconWrapper>
          <LabelWrapper {...this.props}>
              {label}
          </LabelWrapper>
        </>
      </ButtonWrapper>
    )
  }
}

export default ButtonWithIcon;
