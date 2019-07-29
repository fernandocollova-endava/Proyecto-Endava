import React, { createRef } from "react";
import { connect } from "react-redux";
import { openCloseNavBar } from "../../redux/actions/navbar"
import ObraSocial from "./obraSocial"

class ObraSocialContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            collapseID: ""
        };
        this.formId = createRef();
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.handleScrollToForm = this.handleScrollToForm.bind(this)
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
    // Scroll hacia el formulario
    handleScrollToForm(event) {
        // efecto scroll
        window.scrollTo(0, 1350);
        
    }
    render() {
        return (
            <ObraSocial
                toggleCollapse={this.toggleCollapse}
                collapseID={this.state.collapseID}
                user={this.props.user}
                email={this.props.email}
                formId={this.formId}
                handleScrollToForm={this.handleScrollToForm}
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