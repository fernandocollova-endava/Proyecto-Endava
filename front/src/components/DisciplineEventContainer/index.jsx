import React from "react";
import { connect } from "react-redux";
import {
  createDisciplineEvents,
  fetchTechonogies,
  fetchEmployeeEvents
} from "../../redux/actions/disciplineEvents";
import DisciplineEvent from "../DisciplineEventContainer/disciplineEvents";
import ModalAviso from "../ModalContainer/modalAviso";

class DisciplineEventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      observation: "",
      date: "",
      time: "",
      techName: "",
      eventList: [],
      modal: false,
      textMsj: "",
      titleMsj: "",

    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEmployeeEvents(this.props.user.id);
    this.props.fetchTechonogies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eventList.length != this.props.eventList.length) {
      this.props.fetchEmployeeEvents(this.props.user.id);
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props
      .createDisciplineEvents(this.state, this.props.user)
      .then(() => 
        {
          this.setState({
            modal: true,
            textMsj: "The event has been successfully sent",
            titleMsj: "Success"
          })
          this.props.fetchEmployeeEvents(this.props.user.id)
        }
      );
  }
  onClick(e) {
    this.setState({
      techName: e.target.value
    })
  }
  onKeyDown(e) {
    let text = this.state.time;

    if (e.keyCode === 8 && text[text.length-1]==':') {
      this.setState({
        time: text.slice(0,-1)
      });
    }
  }
  onChange(e) {
    let data =
      (e.target.name === 'time' && (e.target.value).length == 2) ?
        e.target.value + ':'
        : e.target.value
    
    this.setState({
      [e.target.name]: data
    });
  }
  // TOGGLE de MODAL
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
       
        <DisciplineEvent
          onChange={this.onChange}
          onFormSubmit={this.onFormSubmit}
          eventList={this.props.eventList}
          techList={this.props.techList}
          handleClick={this.onClick}
          clockValue={this.state.time}
          onKeyDown={this.onKeyDown}
        />
        <ModalAviso
          modal={this.state.modal}
          toggle={this.toggle}
          textMsj={this.state.textMsj}
          titleMsj={this.state.titleMsj}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, owner) => {

  return {
    user: state.user.user,
    nameUrl: owner.match.params.name, // Extrae la url dinamica
    listAllowance: state.allowance.adminAllowances,
    eventList: state.event.eventList,
    techList: state.event.techList
  };
};

const MapDispatchToProps = dispatch => {
  return {
    createDisciplineEvents: (data, user) =>
      dispatch(createDisciplineEvents(data, user)),
    fetchEmployeeEvents: user => dispatch(fetchEmployeeEvents(user)),
    fetchTechonogies: () => dispatch(fetchTechonogies())
  };
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(DisciplineEventContainer);
