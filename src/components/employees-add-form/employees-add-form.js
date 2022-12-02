import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            classNames: 'error'
        };
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCreateItem = (e) => {
        e.preventDefault();
        if (this.state.name !== '' && this.state.salary !== '') {
            const newClassNames = 'error'
            this.props.onCreate(this.state.name, this.state.salary);
            this.setState({
                name: '',
                salary: '',
                classNames: newClassNames
            });
        } else {
            const newClassNames = 'error visible'
            this.setState({
                classNames: newClassNames
            });
        }
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
            <span className={this.state.classNames}>Будь ласка заповніть усі поля</span>
        </div>
        )
    }
    
}

export default EmployeesAddForm;