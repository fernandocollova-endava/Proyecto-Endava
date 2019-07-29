import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLoggedUser } from '../../redux/actions/user'
import AllowanceContainer from '../AllowanceContainer/index'
import Home from '../HomeContainer/index'
import HealthCareContainer from '../healthCareContainer/index'
import LoginContainer from "../LoginContainer";
import AllowancesListContainer from "../AllowancesListContainer/index";
import NavbarContainer from "../NavBarContainer/"
import FooterContainer from "../FooterContainer"
import UpdatePassContainer from "../UpdatePassContainer"
import DisciplineEvent from "../DisciplineEventContainer"
import ProfileContainer from "../ProfileContainer"
import NoFound from '../NoFound/index'
import HomeOfficeContainer from '../HomeOfficeContainer/index'
import CalendarContainer from "../EventCalendarContainer"
import BookAllowanceContainer from "../BookAllowanceContainer"
import PanelAdminContainer from "../HomeAdminContainer"
import HomeNewAllowance from "../HomeNewAllowance/index"
import AdminBookContainer from "../AdminBookContainer"

class MainContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {

    this.props.fetchLoggedUser()
      .then(() => {

        this.setState({
          loading: false
        })
      })
  }

  render() {
    if (this.state.loading) {
      return <h1>Ups! something went wrong.. Please, reload the web again</h1>
    }
    return (
      <div>
        {
          this.props.user.id ?
            <div>
              <Route component={NavbarContainer} />
              <Switch>
                <Route exact path="/allowance/search" component={AllowancesListContainer} />
                <Route exact path="/allowance/book" component={BookAllowanceContainer} />
                <Route exact path="/home-office" component={HomeOfficeContainer} />
                <Route exact path="/allowance/new-allowance" component={HomeNewAllowance} />
                <Route exact path="/allowance/:name" component={AllowanceContainer} />
                <Route exact path="/login/expired" component={UpdatePassContainer} />
                <Route exact path="/admin/panel" component={PanelAdminContainer} />
                <Route exact path="/admin/book" component={AdminBookContainer} />
                <Route exact path="/admin/allowance" component={AllowancesListContainer} />
                <Route exact path="/health-care" component={HealthCareContainer} />}
                <Route exact path="/discipline-event/new" component={DisciplineEvent} />
                <Route exact path="/calendar" component={CalendarContainer} />
                <Route exact path="/profile" component={ProfileContainer} />

                <Route exact path="/" component={Home} />
                <Redirect from="/login" to="/" />
              </Switch>
              <Route component={FooterContainer} />
            </div> :
            <div>
              <Route path="/login" component={LoginContainer} />
              <Redirect from="/" to="/login" component={LoginContainer} />
            </div>

        }
      </div>
    )
  }
}

const mapStateToProps = (state, own) => {
  return {
    location: own.location.pathname,
    user: state.user.user
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    fetchLoggedUser: () => dispatch(fetchLoggedUser()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
