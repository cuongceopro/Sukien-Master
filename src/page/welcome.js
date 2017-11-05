import React from 'react';
//import { Page, Panel } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { response } from '../api/stub';
import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, EditableText, Pagination, Breadcrumbs, Input, Select } from 'react-blur-admin';

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addData : null,
      locationData : null,
      data : null
  };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    const data = response();
    const addData = {};
    data.daysList.forEach(function(value){
      addData[value] = 'success';
    });
    const locationData = [];
    locationData.push( { value: 'No Select', label: 'No Select' } );
    data.locationList.forEach(function(value)  {
        locationData.push( { value: value, label: value } );
      }
    );

    this.setState( { data: data, addData : addData, locationData : locationData } );
  }

  handleChange(e){
    const { value, name } = e.target;
    const  addData  = this.state.addData;
    addData[name] =  value;
    this.setState({ addData : addData });
  }

  makeCollum(array){
    const collumData = array.map((element) =>
        <td><Button type={element} title= '' asize='xs' /></td>
      );
    return collumData;
  }

  getaddList(){
    var addList = [];
    const addData = this.state.addData;
    Object.keys(addData).forEach(function (key) {
      addList.push(<td><Button type={addData[key]} title='' asize='xs' /></td>);
    });
    return addList;
  }

  render() {
    const daysList = this.state.data.daysList.map((day) => 
      <th>{day}</th>
    );
    const locationAnswerList = this.state.data.locationAnswerList.map((location) =>
      <th>{location}</th>
    );
    const successList = this.state.data.successList.map((element) =>
      <th>{element}</th>
    );
    const warningList = this.state.data.warningList.map((element) =>
      <th>{element}</th>
    );
    const removeList = this.state.data.removeList.map((element) => 
      <th>{element}</th>
    );
    const answersList = this.state.data.answersData.map((answer) => 
    <TableRow>
      <td>{answer.name}</td>
      {this.makeCollum(answer.data)}
    </TableRow>
    );
    const selectList = this.state.data.daysList.map((day) => 
    <td>
      <form>
      <div>
      <label className="radio-inline custom-radio nowrap">
      <input
        type='radio'
        name={day}
        label='OK' 
        value='success'
        defaultChecked = 'true'
        onChange = {this.handleChange}/>
        OK
        </label>
        </div>
        <div>
      <label className="radio-inline custom-radio nowrap">
      <input
        type='radio'
        name={day}
        label='50/50'
        value='warning'
        onChange = {this.handleChange}/>
        50/50
      </label>
      </div>
      <div>
      <label className="radio-inline custom-radio nowrap">
      <input
        type='radio'
        name={day}
        label='NG'
        value='remove'
        onChange = {this.handleChange}/>
        NG
      </label>
      </div>
      </form>
    </td>
    );

    return (
      <Page title='SU KIEN MASTER'>
        <Panel title='Event Detail'>
          <Table>
            <TableHead>
              <th>Name</th>
              {daysList}
            </TableHead>
            <TableBody>
              <TableRow>
                <td>Location</td>
                {locationAnswerList}
              </TableRow>
              <TableRow>
                <td><Button type='success' title= '' asize='xs' /></td>
                {successList}
              </TableRow>
              <TableRow>
                <td><Button type='warning' title= '' asize='xs' /></td>
                {warningList}
              </TableRow>
              <TableRow>
                <td><Button type='remove' title= '' asize='xs' /></td>
                {removeList}
              </TableRow>
              {answersList}
            </TableBody>
          </Table>
        </Panel>

        <Panel title='Add'>
        <Input
            label='Name'
            placeholder='Enter Name' />
        <Select
            label='aaaaa'
            placeholder='Location'
            options={this.state.locationData} />
          <Table>
            <TableHead>
              {daysList}
            </TableHead>
            <TableBody>
              <TableRow>
                {selectList}
              </TableRow>
              <TableRow>
                {this.getaddList()}
              </TableRow>
            </TableBody>
          </Table>
          <br />
          <br />
          <Button type="add" />
        </Panel>

      </Page>
    );
  }
}

