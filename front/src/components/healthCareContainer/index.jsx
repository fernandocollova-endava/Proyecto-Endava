import React, { createRef } from "react";
import { connect } from "react-redux";
import {sendEmailConfirm} from "../../redux/actions/allowanceActions"
import { openCloseNavBar } from "../../redux/actions/navbar";
import ObraSocial from "./obraSocial";
import ModalAviso from "../ModalContainer/modalAviso"

class ObraSocialContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      collapseID: "",
      email: "",
      observation: "",
      healthOption: "",
      active: "",
      modal: false,
      textMsj: "",
      titleMsj: ""
    };
    this.formId = createRef();
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleScrollToForm = this.handleScrollToForm.bind(this);
    this.onObservationChange = this.onObservationChange.bind(this);
    this.onhealthOptionChange = this.onhealthOptionChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.openCloseNavBar(false);
  }

  toggleCollapse(collapseID) {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  }
  // Scroll hacia el formulario
  handleScrollToForm(event) {
    // efecto scroll
    window.scrollTo(0, 1350);
  }
  onObservationChange(e) {
    console.log("observ", e.target.value)
    this.setState({
      observation: e.target.value
    });
  }
  onhealthOptionChange(e) {
      console.log("healt", e.target.value)
    this.setState({
      healthOption: e.target.value
    });
  }
  onEmailChange(e) {
    console.log("email", e.target.value)
    this.setState({
      email: e.target.value
    });
  }
  onFormSubmit(e) {
      e.preventDefault(e)

    this.props.sendEmailConfirm(this.props.user, this.state.healthOption, this.state.email, this.state.observation);
    this.setState({
      active: "",
      modal: true,
      textMsj: "Your message has been successfully sent",
      titleMsj: "Success"
    });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
        <>
        <ModalAviso
        modal={this.state.modal}
        toggle={this.toggle}
        textMsj={this.state.textMsj}
        titleMsj={this.state.titleMsj}
      />
      <ObraSocial
        onObservationChange={this.onObservationChange}
        onhealthOptionChange={this.onhealthOptionChange}
        onEmailChange={this.onEmailChange}
        onFormSubmit={this.onFormSubmit}
        toggleCollapse={this.toggleCollapse}
        collapseID={this.state.collapseID}
        // user={this.props.user}
        // email={this.props.email}
        formId={this.formId}
        handleScrollToForm={this.handleScrollToForm}
      />
        </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openCloseNavBar: val => dispatch(openCloseNavBar(val)),
  sendEmailConfirm: (user, allowance, email, observation ) => dispatch(sendEmailConfirm(user, allowance, email, observation))
});
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObraSocialContainer);
