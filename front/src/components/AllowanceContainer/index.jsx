import React from 'react'
import { connect } from 'react-redux'
import { createAllowance } from '../../redux/actions/allowanceActions'


class AllowanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            employeeAmount: 0,
            observation: '',
            active: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onObservationChange =  this.onObservationChange.bind(this)
        this.onAmountChange =  this.onAmountChange.bind(this)
    }
  componentDidMount(){
      console.log("me moneeeeeeeeeee")
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
                this.setState({ active: response.data });
                alert("Se cargo piolasaa");
            }).catch((error) => {
                //mensaje de error
            });
    }
    onChange(e) {
        console.log("so eeeeeee", e.target)
        this.setState({ 
            file: e.target.files[0]
        });
    }
    onObservationChange(e){
 
        this.setState({ 
            observation: e.target.value,
        })
    }
    onAmountChange(e){
      
        this.setState({ 
            employeeAmount: e.target.value,
            })
    }

    render() {
        return (
            <div>

            <form onSubmit={this.onFormSubmit}>
            <h1>Formulario Reload</h1>
            <input type="text" name="employeeAmount" placeholder="Monto Beneficio.." onChange={this.onAmountChange} /><br />
            <input type="text" name="observation" placeholder="Observacion.."onChange={this.onObservationChange}/><br />
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
</div>
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


