import React from "react";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormGroup
} from "reactstrap";
class PasswordInput extends React.Component {
  state = {
    passwordState: "password",
  };

  onChangePasswordState = () => {
    this.setState({
      passwordState: this.state.passwordState == "password" ? "text" : "password",
    });
  };

  render() {
    return (
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-key-25" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            onChange={input => { this.props.passwordValue(input.target.value) }}
            placeholder={!!this.props.text ? this.props.text : "Passwords"}
            type={this.state.passwordState}
            autoComplete="off"
          />
          <InputGroupText onClick={this.onChangePasswordState}>
            <i className="fa fa-eye" />
          </InputGroupText>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default PasswordInput;
