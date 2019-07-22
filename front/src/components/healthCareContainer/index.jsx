import React from "react";
import { connect } from "react-redux";
import { openCloseNavBar } from "../../redux/actions/navbar"
import ObraSocial from "./obraSocial"

class ObraSocialContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            collapseID: ""
        };
        this.toggleCollapse = this.toggleCollapse.bind(this)
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.openCloseNavBar(false)
    }

    toggleCollapse(collapseID) {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    render() {
        return (
            <ObraSocial
                toggleCollapse={this.toggleCollapse}
                collapseID={this.state.collapseID}
                user={this.props.user}
                email={this.props.email}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    openCloseNavBar: (val) => dispatch(openCloseNavBar(val))
});
const mapStateToProps = (state) => {
    return {
        user: `${state.user.user.name} ${state.user.user.surname}`,
        email: state.user.user.email
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ObraSocialContainer);