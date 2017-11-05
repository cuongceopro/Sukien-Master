import React from 'react';
//import { Page, Panel } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { GMap } from 'src/layout/components/gmap';

import { dateData, answerData, response } from '../api/stub';

import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, EditableText, Pagination, Breadcrumbs, Input, Select } from 'react-blur-admin';


export class Welcome extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //     data1 : 'remove',
    //     data2 : 'success',
    //     data3 : 'warning',
    //     data4 : 'remove',
    //     data5 : 'success',
    //     data6 : 'success',
    //     data7 : 'success',
    //     data : null
    // };
    this.state = {
      addData : {
        data1 : '',
        data2 : ''
      },
      // data1 : 'remove',
      // data2 : 'success',
      // data3 : 'warning',
      // data4 : 'remove',
      // data5 : 'success',
      // data6 : 'success',
      // data7 : 'success',
      data : null
  };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    const data = response();
    console.log('AAAAAAAAAAAA : ' + data.answersList);
    this.setState( { data: data} );
    // const listDay = dateData();
    // console.log('AAAAAAA : ' + listDay );
    // this.setState( { listDay : listDay } );
    // console.log('CCCCCCC');
    // const listAnswers = answerData();
    // console.log('BBBBBBBB : ' + listAnswers);
    // this.setState( { listAnswers : listAnswers} );
    //console.log('AAAAAAAA : ' + this.state.listDay);
  }

  handleChange(e){
    console.log('aaaaaaaaaaaa');
    console.log('BBBBBBBefore : ' + this.state.addData['10/01']);
    const { value, name } = e.target;
    const { addData } = this.state;
    addData[name] =  value;
    this.setState({ addData });
    console.log('After : ' + this.state.addData['10/01']);

    //const { firstSet, dt2, dt3, dt4, dt5, dt6, dt7 } = e.target;
    //console.log('AAAAAAAAAA : ' + e.target.firstSet);
    //console.log(e.target.value);
  }

  makeCollum(array){
    const collumData = array.map((element) =>
        <td><Button type={element} title= '' asize='xs' /></td>
      );
    return collumData;
  }

  render() {

    const daysList = this.state.data.daysList.map((day) => 
      <th>{day}</th>
    );

    const locationList = this.state.data.locationList.map((location) =>
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

    // const addList = this.state.data.daysList.map((day) => 
    //   <td><Button type={this.state.data[{day}]} title='' asize='xs' /></td>
    // );
    const addList = this.state.data.daysList.map((day) =>
        <p key='1'>{this.state.data[{day}]}</p>
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
                {locationList}
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
            options={[ 
              { value: 1, label: 'No Select' },
              { value: 2, label: 'Osaka' },
              { value: 3, label: 'Fukuoka' } 
              ]} />
          <Table>
            <TableHead>
              {daysList}
            </TableHead>
            <TableBody>
              <TableRow>
                {selectList}
              </TableRow>
              {/*
              <TableRow>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK' 
                    value='OK'
                    defaultChecked = {this.state.data1 === 'success'}
                    onChange={() => { this.setState({ data1: 'success'})}}/>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    value='50/50'
                    defaultChecked={this.state.data1 === 'warning'}
                    onChange={() => { this.setState({ data1: 'warning'})}}/>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    value='NG'
                    defaultChecked={this.state.data1 === 'remove'} 
                    onChange={() => { this.setState({ data1: 'remove'})}}/>
                    </form>
                </td>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK'
                    defaultChecked = {this.state.data2 === 'success'}
                    onChange={() => { this.setState({ data2: 'success'})}}/>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    defaultChecked = {this.state.data2 === 'warning'}
                    onChange={() => { this.setState({ data2: 'warning'})}}/>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    defaultChecked = {this.state.data2 === 'remove'}
                    onChange={() => { this.setState({ data2: 'remove'})}}/>
                  </form>
                </td>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    onChange={e => {}} />
                  </form>
                </td>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    onChange={e => {}} />
                  </form>
                </td>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    onChange={e => {}} />
                  </form>
                </td>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    onChange={e => {}} />
                  </form>
                </td>
                <td>
                  <form>
                  <Input
                    type='radio'
                    name='firstSet'
                    label='OK'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='50/50'
                    onChange={e => {}} />
                  <Input
                    type='radio'
                    name='firstSet'
                    label='NG'
                    onChange={e => {}} />
                  </form>
                </td>
              </TableRow>
              */}

              <TableRow>
                <td><Button type={this.state.addData['10/01']} title= '' asize='xs' /></td>
                <td><Button type={this.state.data[2]} title= '' asize='xs' /></td>
                <td><Button type={this.state.data[3]} title= '' asize='xs' /></td>
                <td><Button type={this.state.data4} title= '' asize='xs' /></td>
                <td><Button type={this.state.data5} title= '' asize='xs' /></td>
                <td><Button type={this.state.data6} title= '' asize='xs' /></td>
                <td><Button type={this.state.data7} title= '' asize='xs' /></td>
              </TableRow>
              <Table>
                {addList}
              </Table>
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

