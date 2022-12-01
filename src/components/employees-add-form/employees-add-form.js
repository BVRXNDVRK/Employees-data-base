import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCreateItem = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {

        return (
            <div className="app-add-form">
            <h3>Додайте нового співробітника</h3>
            <form className="add-form d-flex">
                <input type="text" 
                       className="form-control new-postlabel"
                       placeholder="Його ім'я"
                       name="name"
                       value={this.state.name}
                       onChange={this.onValueChange}/>
                <input type="number" 
                       className="form-control new-postlabel"
                       placeholder="З/П у $?"
                       name="salary"
                       value={this.state.salary}
                       onChange={this.onValueChange}/>
                <button type="submit"
                        className="btn btn-outline-light"
                        onClick={this.onCreateItem}>Додати</button>       
            </form>
        </div>
        )
    }
    
}

export default EmployeesAddForm;