import React from "react";
import { connect } from "react-redux";
import {
  createDisciplineEvents,
  fetchDisciplineEvents
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
      time:"",
      eventList: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    console.log("entreeeeee")
    window.scrollTo(0, 0);
    this.props.fetchDisciplineEvents(this.props.user.id)

  }

  componentDidUpdate(prevProps) {

    if (prevProps.eventList.length != this.props.eventList.length) {

      this.props.fetchDisciplineEvents(this.props.user.id)
    }
  }
  onFormSubmit(e) {
    e.preventDefault();

    this.props.createDisciplineEvents(this.state, this.props.user)
    .then(()=> this.props.fetchDisciplineEvents((this.props.user.id)))
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    console.log("soy event del render", this.props.eventList)
    return (
      <div>
        {/* {console.log(this.state.eventList, "soy los eventos del loco")} */}
        <DisciplineEvent
          onChange={this.onChange}
          onFormSubmit={this.onFormSubmit}
          eventList={this.props.eventList}
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
    eventList: state.event.eventList
  };
};

const MapDispatchToProps = dispatch => {
  return {
    createDisciplineEvents: (data, user) =>
      dispatch(createDisciplineEvents(data, user)),
    fetchDisciplineEvents: user => dispatch(fetchDisciplineEvents(user))
  };
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(DisciplineEventContainer);
