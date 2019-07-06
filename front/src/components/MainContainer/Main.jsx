import React from 'react'
const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userid: 1,
            allowanceId: 3,
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
        formData.append('userid', this.state.userid);
        formData.append('allowanceId', this.state.allowanceId);
        formData.append('employeeAmount', this.state.employeeAmount);
        formData.append('observation', this.state.observation);

        axios({
            method: 'POST',
            data: formData,
            url: "/api/allowance",
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                this.setState({ active: response.data });
                alert("Se cargo piolasaa");
            }).catch((error) => {
            });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload ok</h1>
                <input type="text" name="userid" placeholder="Usuario id.." /><br />
                <input type="text" name="allowanceId" placeholder="Beneficio id.." /><br />
                <input type="text" name="employeeAmount" placeholder="Monto Beneficio.." /><br />
                <input type="text" name="observation" placeholder="Observacion.." /><br />
                <input type="file" name="file" onChange={this.onChange} />
                <button type="submit">Enviar</button>
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

export default ReactUploadImage