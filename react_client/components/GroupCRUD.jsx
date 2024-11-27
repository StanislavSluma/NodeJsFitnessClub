import {Component} from "react";

class GroupCRUD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.group.name,
            max_workouts: props.group.max_workouts,
            max_clients: props.group.max_clients,
            price: props.group.price,

            nameValid: true,
            max_workoutsValid: true,
            max_clientsValid: true,
            priceValid: true,
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onMaxClientsChange = this.onMaxClientsChange.bind(this);
        this.onMaxWorkoutsChange = this.onMaxWorkoutsChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
    }
    validateName(name){
        return name.length > 2;
    }
    validateMaxClients(num_clients){
        return num_clients > 2;
    }
    validateMaxWorkouts(num_workouts){
        return num_workouts > 2;
    }
    validatePrice(price){
        return price > 0;
    }

    onNameChange(e) {
        var val = e.target.value;
        var valid = this.validateName(val);
        this.setState({name: val, nameValid: valid});
    }
    onMaxClientsChange(e) {
        var val = e.target.value;
        var valid = this.validateMaxClients(val);
        this.setState({max_clients: val, max_clientsValid: valid});
    }
    onMaxWorkoutsChange(e) {
        var val = e.target.value;
        var valid = this.validateMaxWorkouts(val);
        this.setState({max_workouts: val, max_workoutsValid: valid});
    }
    onPriceChange(e) {
        var val = e.target.value;
        var valid = this.validatePrice(val);
        this.setState({price: val, priceValid: valid});
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.nameValid &&
            this.state.max_clientsValid &&
            this.state.max_workoutsValid &&
            this.state.priceValid){

            const response = await fetch(`http://localhost:5000/group/${this.props.group._id}/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: this.state.name,
                    max_clients: this.state.max_clients,
                    max_workouts: this.state.max_workouts,
                    price: this.state.price,
                })
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Успешно`);
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } else {
            alert(`Ошибка: некоторые поля заполнены неверно!`);
        }
    }

    async handleOnDelete() {
        const response = await fetch(`http://localhost:5000/group/${this.props.group._id}/delete`, {
            method: "DELETE",
            credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
            const {refetch} = this.props;
            alert(`Успешно`);
            await refetch();
        } else {
            alert(`Ошибка: ${data.message}`);
        }
    }

    render() {
        var nameColor = this.state.nameValid===true?"green":"red";
        var max_clientsColor = this.state.max_clientsValid===true?"green":"red";
        var max_workoutsColor = this.state.max_workoutsValid===true?"green":"red";
        var priceColor = this.state.priceValid===true?"green":"red";

        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Name:</label><br/>
                    <input type="text" value={this.state.name}
                           onChange={this.onNameChange} style={{borderColor: nameColor}}/>
                </p>
                <p>
                    <label>MaxClients:</label><br/>
                    <input type="number" value={this.state.max_clients}
                           onChange={this.onMaxClientsChange} style={{borderColor: max_clientsColor}}/>
                </p>
                <p>
                    <label>MaxWorkouts:</label><br/>
                    <input type="number" value={this.state.max_workouts}
                           onChange={this.onMaxWorkoutsChange} style={{borderColor: max_workoutsColor}}/>
                </p>
                <p>
                    <label>Price:</label><br/>
                    <input type="number" value={this.state.price}
                           onChange={this.onPriceChange} style={{borderColor: priceColor}}/>
                </p>

                <input type="submit" value="Изменить"/>
                <button onClick={async () => await this.handleOnDelete()}>Удалить</button>
            </form>
        );
    }
}

export default GroupCRUD;