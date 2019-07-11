import React from 'react'
import { connect } from 'react-redux'
import { createAllowance } from '../../redux/actions/allowanceActions'
import { MDBCard, MDBInput, MDBCardBody, MDBRow, MDBCol, MDBAnimation, MDBIcon, MDBBtn } from "mdbreact";

import ModalAviso from "../ModalContainer/modalAviso"

class AllowanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            employeeAmount: 0,
            observation: '',
            active: '',
            modal: false,
            textMsj: '', titleMsj: ''

        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onObservationChange = this.onObservationChange.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault();
        const { file, ...rest } = this.state
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userid', this.props.user.id);
        formData.append('allowanceName', this.props.nameUrl);
        formData.append('employeeAmount', this.state.employeeAmount);
        formData.append('observation', this.state.observation);

        this.props.createAllowance(formData)
            .then((response) => {
                this.setState({ active: response.data, modal: true, textMsj: 'The file has been successfully sent', titleMsj: 'Success' });
            }).catch((error) => {
                this.setState({ modal: true, textMsj: 'An error occurred while sending the file..', titleMsj: 'Error' });
            });
    }
    onChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    onObservationChange(e) {
        this.setState({
            observation: e.target.value,
        })
    }
    onAmountChange(e) {
        this.setState({
            employeeAmount: e.target.value,
        })
    }
    // TOGGLE de MODAL
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
                <MDBAnimation type="fadeInUp">
                    <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Careers/Images/MeetEndava/MeetEndava_1920x650_resized.ashx"
                        className="img-fluid bannerAllowance"
                        alt="Imagen endava" />
                </MDBAnimation>

                <MDBRow className="container-banner">
                    <MDBCol md="1">

                    </MDBCol>
                    <MDBCol md="10"> 
                        <h1 className="upperCaseFonts">{`Manage your ${this.props.nameUrl} allowance refunds`}</h1>
                        <MDBAnimation type="fadeInUp">
                            <p className="TextParrafo">
                                We began our journey as a consulting firm delivering real transformation through IT strategy and architecture services for some of the world’s largest banks and payments companies.
                                Over the past 18 years, we marked important milestones towards becoming global through opening delivery centres and offices in North and Latin America, as well as Western and Central Europe.
                                Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us, and the people who use the systems and applications we design, build, and operate.
                    </p>
                        </MDBAnimation>
                    </MDBCol>
                    <MDBCol md="1">

                    </MDBCol>
                </MDBRow>
                <hr />
                {/* FORMULARIO  */}
                <MDBRow className="container-banner">
                    <MDBCol md="1">
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBAnimation type="fadeInUp">
                            <MDBCard>
                                <MDBCardBody>
                                    <form onSubmit={this.onFormSubmit}>
                                        <p className="h4 text-center py-4">Submit your receipt</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="Amount allowance..." icon="hand-holding-usd"
                                                group
                                                required
                                                autoComplete="off"
                                                type="number"
                                                validate
                                                name="employeeAmount"
                                                onChange={this.onAmountChange}
                                                error="wrong"
                                                success="right"
                                            />
                                            <MDBInput
                                                label="Observation..."
                                                icon="comment-alt"
                                                required
                                                group
                                                autoComplete="off"
                                                type="text"
                                                name="observation"
                                                onChange={this.onObservationChange}
                                                validate
                                                error="wrong"
                                                success="right"
                                            />
                                            <MDBInput
                                                icon="file-signature"
                                                group
                                                type="file"
                                                name="file"
                                                onChange={this.onChange}
                                                required
                                                validate
                                                error="wrong"
                                                success="right"
                                            />
                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn
                                                color="light-blue"
                                                className="mb-3 btnEv-red rounded mb-0 border-0 btnAllowance"
                                                type="submit"
                                            >
                                                Send form <MDBIcon icon="angle-right" />
                                            </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBAnimation>
                    </MDBCol>
                    <MDBCol md="6">
                        <label>preview:</label>
                        {/* Visualización de archivo cargado */}
                        <p>
                            {((this.state.active).split('.')[1] !== 'pdf' &&
                                (this.state.active).split('.')[1] !== undefined) &&
                                <img src={`/assets/receipt/${this.state.active}`} width="100%" />}
                        </p>
                        {
                            ((this.state.active).split('.')[1] === 'pdf') &&
                            <embed src={`/assets/receipt/${this.state.active}`} width="100%" height="400px"
                                type="application/pdf"></embed>
                        }
                    </MDBCol>
                </MDBRow>
            </>
        )
    }
}
const mapStateToProps = (state, owner) => {
    return {
         user: state.user.user,
         nameUrl: owner.match.params.name // Extrae la url dinamica
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        createAllowance: (data) => dispatch(createAllowance(data))
    }
}

export default connect(
    mapStateToProps,
    MapDispatchToProps
)(AllowanceContainer)


