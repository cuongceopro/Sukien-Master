import React from 'react';
//import { Page, Panel } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { response } from '../api/stub';
import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, EditableText, Pagination, Breadcrumbs, Input, Select } from 'react-blur-admin';

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addData: null,
      locationData: null,
      data: null,
      successList : null,
      warningList : null,
      removeList : null,
      isMax : null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let _this = this;
    return fetch('https://srb5as1ds6.execute-api.ap-northeast-1.amazonaws.com/sukien_master?exec_id=abcabcd')
      .then((response) => response.json())
      .then((response) => {
        //var data = JSON.parse(response)
        var data = null;
        data = JSON.parse(response)
        console.log(data);
        //console.log(data.daysList)
        var addData = {};
        data.daysList.forEach(function (value) {
          addData[value] = 'success';
        });

        var successListData = [];
        var warningListData = [];
        var removeListData = [];

        var count = 0;
        var pointArr = {};
        var maxPoint = 0;
        var point = 0;
        // var successCount = 0;
        // var warningCount = 0;
        // var removeCount = 0;
        data.daysList.forEach(function (value) {
          successListData[count] = 0;
          warningListData[count] = 0;
          removeListData[count] = 0;

          for(var i = 0; i < data.answersData.length; i++){
            switch(data.answersData[i].data[count]){
              case '0' :
                successListData[count]++;
                break;
              case '1' :
                warningListData[count]++;
                break;
              case '2' :
                removeListData[count]++;
                break;
            }
          }
          // successListData[count] = successCount + '/' + data.answersData.length;
          // warningListData[count] = warningCount + '/' + data.answersData.length;
          // removeListData[count] = removeCount + '/' + data.answersData.length;
          point = 2 * successListData[count] + warningListData[count];
          if ( point > maxPoint ) maxPoint = point;
          pointArr[value] = point;
          count++;
        });

        // console.log('SuccessListData: ')
        // console.log(successListData);
        // console.log('WarningListData: ')
        // console.log(warningListData);
        // console.log('RemoveListData: ')
        // console.log(removeListData);
        console.log(pointArr);
        console.log('MaxPoint : ' + maxPoint);

        var isMax = {};
        data.daysList.forEach(function (value) {
          if(pointArr[value] == maxPoint){
            isMax[value] = true;
          }
          else {
            isMax[value] = false;
          } 
        });

        console.log(isMax)

        const locationData = [];
        locationData.push({ value: 'No Select', label: 'No Select' });
        data.locationList.forEach(function (value) {
          locationData.push({ value: value, label: value });
        }
        );

        _this.setState({ 
          addData: addData,
          locationData: locationData, 
          data: data, 
          successList : successListData,
          warningList : warningListData,
          removeList : removeListData,
          isMax : isMax
          });
      })
      .catch((error) => {
        console.error(error);
      });
    // this.getData();
    // const data = response();
    // const addData = {};
    // data.daysList.forEach(function (value) {
    //   addData[value] = 'success';
    // });
    // const locationData = [];
    // locationData.push({ value: 'No Select', label: 'No Select' });
    // data.locationList.forEach(function (value) {
    //   locationData.push({ value: value, label: value });
    // }
    // );

    // this.setState({ data: data, addData: addData, locationData: locationData });
  }

  getData() {
    return fetch('https://srb5as1ds6.execute-api.ap-northeast-1.amazonaws.com/sukien_master?exec_id=abcabcd')
      .then((response) => response.json())
      .then((response) => {
        // const data = JSON.parse(response)
        // console.log(data);
        // console.log(data.daysList)
        // var addData = {};
        // data.daysList.forEach(function (value) {
        //   addData[value] = 'success';
        // });
        // const locationData = [];
        // locationData.push({ value: 'No Select', label: 'No Select' });
        // data.locationList.forEach(function (value) {
        //   locationData.push({ value: value, label: value });
        // }
        // );

        // this.setState({ data: data, addData: addData, locationData: locationData });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange(e) {
    const { value, name } = e.target;
    var addData = this.state.addData;
    addData[name] = value;
    this.setState({ addData: addData });
  }

  makeCollum(array) {
    const collumData = array.map((element) => {
      switch(element){
        case "0" : 
          return <td><Button type='success' title='' asize='xs' /></td>;
          break;
        case "1" :
          return <td><Button type='warning' title='' asize='xs' /></td>;
          break;
        case "2" :
          return <td><Button type='remove' title='' asize='xs' /></td>;
          break;
      }
      // <td><Button type={element} title='' asize='xs' /></td>
    }
    );
    return collumData;
  }

  getaddList() {
    var addList = [];
    var addData = this.state.addData;
    if (addData) {
      Object.keys(addData).forEach(function (key) {
        addList.push(<td><Button type={addData[key]} title='' asize='xs' /></td>);
      });
    }
    return addList;
  }

  getDaysList() {
    var daysList = null;
    if (this.state.data) {
      daysList = !this.state.data ? '' : this.state.data.daysList.map((day) => {
        if(this.state.isMax[day]){
          return <td><Button type='success' title= {day} asize='xs' /></td>
        }
        else {
          return <td><Button type='default' title= {day} asize='xs' /></td>;
        }
      }
      );
    }
    return daysList;
  }

  getLocsList() {
    var locsList = null;
    if (this.state.data) {
      locationAnswerList = this.state.data.locationAnswerList.map((location) =>
        <th>{location}</th>
      );
    }
    return locsList;
  }

  getAnswersList() {
    var answersList = null;
    if (this.state.data) {
      answersList = !this.state.data ? '' : this.state.data.answersData.map((answer) =>
        <TableRow>
          <td>{answer.name}</td>
          {this.makeCollum(answer.data)}
        </TableRow>
      );
    }
    return answersList;
  }

  render() {
    // var daysList = null;
    var daysList = !this.state.data ? '' : this.state.data.daysList.map((day) =>
      <th>{day}</th>
    );
    console.log('Day List:')
    console.log(daysList)
    // const locationAnswerList = this.state.data.locationAnswerList.map((location) =>
    //   <th>{location}</th>
    // );
    const successList = !this.state.successList? <th></th> :   this.state.successList.map((element) =>
      <th>{element}/{this.state.data.answersData.length}</th>
    );
    const warningList = !this.state.warningList? <th></th> :  this.state.warningList.map((element) =>
      <th>{element}/{this.state.data.answersData.length}</th>
    );
    const removeList = !this.state.removeList? <th></th> :  this.state.removeList.map((element) =>
      <th>{element}/{this.state.data.answersData.length}</th>
    );

    var answersList = null;
    // const answersList = !this.state.data ? '' : this.state.data.answersData.map((answer) =>
    //   <TableRow>
    //     <td>{answer.name}</td>
    //     {this.makeCollum(answer.data)}
    //   </TableRow>
    // );

    // var selectList = null;
    const selectList = !this.state.data ? '' : this.state.data.daysList.map((day) =>
      <td>
        <form>
          <div>
            <label className="radio-inline custom-radio nowrap">
              <input
                type='radio'
                name={day}
                label='OK'
                value='success'
                defaultChecked='true'
                onChange={this.handleChange} />
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
                onChange={this.handleChange} />
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
                onChange={this.handleChange} />
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
              <th></th>
              {this.getDaysList()}
            </TableHead>
            <TableBody>
              {/*}
              <TableRow>
                <td>Location</td>
                {locationAnswerList}
              </TableRow>
    */}
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
              {this.getAnswersList()}
            </TableBody>
          </Table>
        </Panel>

        <Panel title='Add'>
          <Input
            label='Name'
            placeholder='Enter Name' />
            {/*
          <Select
            label='aaaaa'
            placeholder='Location'
            options={this.state.locationData} /> */}
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

