import React from "react";
import { connect } from "react-redux";
import {fetchDisciplineEvents} from "../../redux/actions/disciplineEvents";
import EventCalendar from "../EventCalendarContainer/eventCalendar";
import ModalAviso from "../ModalContainer/modalAviso";

class DisciplineEventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      modal: false,
      textMsj: "",
      titleMsj: "",
    };

    this.onClick = this.onClick.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchDisciplineEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eventList.length != this.props.eventList.length) {
      this.props.fetchDisciplineEvents();
    }
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
  // TOGGLE de MODAL
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
        {console.log("soy eventList",this.props.eventList)}
        {/* <h2>holaaaaaaaaaaaa</h2> */}
        <EventCalendar
          eventList={this.props.eventList}
          handleClick={this.onClick}
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
    fetchDisciplineEvents: user => dispatch(fetchDisciplineEvents(user)),
  
  };
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(DisciplineEventContainer);
