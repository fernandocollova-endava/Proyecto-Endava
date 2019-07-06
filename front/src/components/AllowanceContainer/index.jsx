import React from 'react'
import { connect } from 'react-redux'
import { createAllowance } from '../../redux/actions/allowanceActions'

class AllowanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            employeeAmount: 400,
            observation: 'lucas',
            active: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const { file, ...rest } = this.state
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userid', 3);
        formData.append('allowanceName', this.props.nameUrl);
        formData.append('employeeAmount', this.state.employeeAmount);
        formData.append('observation', this.state.observation);

        this.props.createAllowance(formData)
            .then((response) => {
                this.setState({ active: response.data });
                alert("Se cargo piolasaa");
            }).catch((error) => {
                //mensaje de error
            });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>Formulario Reload</h1>
                <input type="text" name="employeeAmount" placeholder="Monto Beneficio.." /><br />
                <input type="text" name="observation" placeholder="Observacion.." /><br />
                <input type="file" name="file" onChange={this.onChange} />
                <button type="submit">Enviar</button>

                {/* Visualización de archivo cargado */}
                <p>
                    {((this.state.active).split('.')[1] !== 'pdf' &&
                        (this.state.active).split('.')[1] !== undefined) &&
                        <img src={`/assets/receipt/${this.state.active}`} width="500px" />}
                </p>
                {
                    ((this.state.active).split('.')[1] === 'pdf') &&
                    <embed src={`/assets/receipt/${this.state.active}`} width="500" height="375"
                        type="application/pdf"></embed>
                }
            </form>
        )
    }
}
const mapStateToProps = (state, owner) => {
    return {
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