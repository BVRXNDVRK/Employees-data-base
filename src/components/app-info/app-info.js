import './app-info.css';

const AppInfo = ({employees, employeesOnIncrease}) => {
    return (
        <div className="app-info">
            <h1>Облік співробітників у компанії</h1>
            <h2>Загальна кількість співробітників: {employees}</h2>
            <h2>Премію оримають: {employeesOnIncrease}</h2>
        </div>
    )
}

export default AppInfo;