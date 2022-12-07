import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Василь', salary: 1000, increase: false, rise: false, id: 3},
                {name: 'Микола', salary: 400, increase: true, rise: false, id: 2},
                {name: 'Галина', salary: 677, increase: false, rise: false, id: 1}
            ],
            term: '',
            filter: 'all' 
        };

        this.indexForDataItem = 0;
        this.deletedIndexes = [];
    }

    newIndex = () => {
        if (this.deletedIndexes.length === 0) {
            this.indexForDataItem = this.state.data.length + 1;
        } else {
            this.indexForDataItem = Math.min(...this.deletedIndexes);
        }
    }

    createItem = (name, salary) => {
        this.newIndex();
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.indexForDataItem
        }
        const newData = [...this.state.data, newItem];
        this.setState({
            data: newData,
        });
        this.deletedIndexes.shift();
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
        this.deletedIndexes.push(id);
        this.deletedIndexes.sort((a, b) => {
            return a - b;
        });
        this.indexForDataItem = this.deletedIndexes[0];
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.lengh === 0) {
            return items;
        } 

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })

    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.increase);
            case ('highPayEmployees'):
                return items.filter(item => item.salary >= 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render () {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const employeesOnIncrease = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                employees={employees}
                employeesOnIncrease={employeesOnIncrease}/>
    
                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    filter={this.state.filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm 
                    onCreate={this.createItem}/>
            </div>
        )
    }
}

export default App;