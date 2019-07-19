import React from "react";
import { connect } from "react-redux";
import {
  createDisciplineEvents,
  fetchDisciplineEvents,
  fetchTechonogies
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
      eventList: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    console.log("entreeeeee");
    window.scrollTo(0, 0);
    this.props.fetchDisciplineEvents(this.props.user.id);
    this.props.fetchTechonogies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eventList.length != this.props.eventList.length) {
      this.props.fetchDisciplineEvents(this.props.user.id);
    }
  }
  onFormSubmit(e) {
    e.preventDefault();

    this.props
      .createDisciplineEvents(this.state, this.props.user)
      .then(() => this.props.fetchDisciplineEvents(this.props.user.id));
  }
  onClick(e){
    this.setState({
      techName:e.target.value
    })
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        {/* {console.log(this.state.eventList, "soy los eventos del loco")} */}
        <DisciplineEvent
          onChange={this.onChange}
          onFormSubmit={this.onFormSubmit}
          eventList={this.props.eventList}
          techList= {this.props.techList}
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
    fetchDisciplineEvents: user => dispatch(fetchDisciplineEvents(user)),
    fetchTechonogies: () => dispatch(fetchTechonogies())
  };
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(DisciplineEventContainer);
