import React from 'react'
const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            userid:1,
            allowanceId:1,
            employeeAmount:400,
            observation:'lucas'
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const { file, ...rest } = this.state 
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', rest);
        // formData.append('allowanceId',this.state.allowanceId);
        // formData.append('employeeAmount',this.state.employeeAmount);
        // formData.append('observation',this.state.observation);        
        //const formData = this.state;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios({
            method: 'POST',
            data:formData,
            headers:{
                'content-type': 'multipart/form-data'
            }
        })

        axios.post("/api/allowance", formData, config)
            .then((response) => {
                alert("Se cargo piolasaa");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload ok</h1>
                <input type="text" name="userid" placeholder="Usuario id.."/><br/>
                <input type="text" name="allowanceId" placeholder="Beneficio id.."/><br/>
                <input type="text" name="employeeAmount" placeholder="Monto Beneficio.."/><br/>
                <input type="text" name="observation" placeholder="Observacion.."/><br/>
                <input type="file" name="file" onChange= {this.onChange} />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default ReactUploadImage