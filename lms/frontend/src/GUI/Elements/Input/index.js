import React, { PureComponent } from 'react';
import styled from 'styled-components';
import GetColorCode from 'Utils/GetColorCode'

const InputWrapper = styled.div`
    width: ${(props) => props.mainWidth || '100%'};
    margin: ${(props) => props.margin || '0'};
    box-sizing:border-box;
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%' };
  height: 30px;
  border-radius: ${props => props.borderRadius || '0'};
  border: 1px solid ${props => props.borderColor ? GetColorCode(props.borderColor) : GetColorCode('orange')};
  padding: ${props => props.innerPadding || '0'};
  box-sizing:border-box;
`

const InputLabel = styled.div`
    display: block;
    margin-bottom: 5px;
`;

class Input extends PureComponent {

  onChange = (e) => {
    const {onChange} = this.props;
    let value = e.target.value;

    onChange(value);
  };

  render() {

    const {
        label,
        mainWidth,
        placeholder,
        id,
        width,
        margin
    } = this.props;

    return (
      <InputWrapper
      mainWidth={mainWidth}
      margin={margin}
      id={id || ""}>
      {label ?
        <InputLabel label={label}>
          {label}
        </InputLabel> : null
      }

      <StyledInput
      {...this.props}
      onChange={this.onChange}
      />
      </InputWrapper>
    )
  }
}

export default Input;
