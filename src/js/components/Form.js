import React from 'react';
import TextField from './TextField';
import SelectField from './SelectField';
import Modal from './Modal';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = Store.get().form;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().form);
    }.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();

    if(this.state.mode == 'create'){
      AppActions.addUser();
    }else {
      AppActions.editUser(this.props.id);
    }

  }

  _handleClose(e) {
    e.preventDefault();
    AppActions.closePopup();
  }

  render() {

    let title;

    if (this.state.mode == 'edit'){
      title = "Edit User: " + this.state.data.first_name
    }
    else {
      title = "New User"
    }


    return (
      <Modal>
        <form onSubmit={this._handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={this._handleClose}></button>
          </header>
          <section className="modal-card-body">
            <TextField label="Address" name="first_name" value={this.state.data.first_name} errors={this.state.errors['first_name']} />
            <TextField label="Post Code" name="last_name" value={this.state.data.last_name}  errors={this.state.errors['last_name']} />
            <SelectField label="Nimber of bedrooms" name="sex" value={this.state.data.sex} errors={this.state.errors['sex']}>
              <option value="">- Select -</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </SelectField>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary">Save</button>
            <a className="button" onClick={this._handleClose}>Cancel</a>
          </footer>
        </form>
      </Modal>
    );
  }
}

export default Form;
