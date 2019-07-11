import React from "react";
import { connect } from "react-redux";
import { logginUser, updatePass } from "../../redux/actions/user";
import UpdatePass from "../UpdatePassContainer/updatePass";

class UpdatePassContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      oldPassword: "",
      password: "",
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
  console.log("me momeneeee")
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.oldPassword == this.state.password)
      this.setState({ error: true });
    this.props
      .updatePass(this.state.password, this.props.user.id)
      .then(user => {
        console.log(user, "password cambiado correcamene");
        this.props.history.push("/");
      })
      .catch(() => this.setState({ error: true }));

    // }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="imageLogin">
        <UpdatePass
          modal={this.state.modal}
          toggle={this.toggle}
          handleSubmit = {this.handleSubmit}
          handleChange = {this.handleChange}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => ({
  logginUser: data => dispatch(logginUser(data)),
  updatePass: (password, user) => dispatch(updatePass(password, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassContainer);
