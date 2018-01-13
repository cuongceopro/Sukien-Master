import React from 'react';
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
      successList: null,
      warningList: null,
      removeList: null,
      isMax: null,
      name: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let _this = this;
    return fetch('https://srb5as1ds6.execute-api.ap-northeast-1.amazonaws.com/sukien_master/addanswer?exec_id=01100001011000100110001118000110010101100110011001110000', {
      method: 'POST',
      body: { "answer": "" },
    }).then((response) => response.json())
      .then((response) => {
        var data = null;
        var addData = {};
        data = JSON.parse(response)
        data.daysList.forEach(function (value) {
          addData[value] = '0';
        });
        _this.setState({ addData : addData });
        _this.test(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  test(data){
    
    var successListData = [];
    var warningListData = [];
    var removeListData = [];

    var count = 0;
    var pointArr = {};
    var maxPoint = 0;
    var point = 0;

    data.daysList.forEach(function (value) {
      successListData[count] = 0;
      warningListData[count] = 0;
      removeListData[count] = 0;

      for (var i = 0; i < data.answersData.length; i++) {
        switch (data.answersData[i].data[count]) {
          case '0':
            successListData[count]++;
            break;
          case '1':
            warningListData[count]++;
            break;
          case '2':
            removeListData[count]++;
            break;
        }
      }
      point = 2 * successListData[count] + warningListData[count];
      if (point > maxPoint) maxPoint = point;
      pointArr[value] = point;
      count++;
    });

    var isMax = {};
    data.daysList.forEach(function (value) {
      if (pointArr[value] == maxPoint) {
        isMax[value] = true;
      }
      else {
        isMax[value] = false;
      }
    });

    const locationData = [];
    locationData.push({ value: 'No Select', label: 'No Select' });
    data.locationList.forEach(function (value) {
      locationData.push({ value: value, label: value });
    }
    );

    this.setState({
      locationData: locationData,
      data: data,
      successList: successListData,
      warningList: warningListData,
      removeList: removeListData,
      isMax: isMax
    });
  }

  handleChange(e) {
    const { value, name } = e.target;
    var addData = this.state.addData;
    console.log(this.state.addData)
    addData[name] = value;
    this.setState({ addData: addData });
  }

  handleChangeName(e) {
    e.preventDefault();
    console.log(this.state.name)
    this.setState({ name: e.target.value })
  }

  makeCollum(array) {
    const collumData = array.map((element) => {
      switch (element) {
        case "0":
          return <td><Button type='success' title='' asize='xs' /></td>;
          break;
        case "1":
          return <td><Button type='warning' title='' asize='xs' /></td>;
          break;
        case "2":
          return <td><Button type='remove' title='' asize='xs' /></td>;
          break;
      }
    }
    );
    return collumData;
  }

  getaddList() {
    var addList = [];
    var addData = this.state.addData;
    if (addData) {
      Object.keys(addData).forEach(function (key) {
        switch (addData[key]) {
          case "0":
            addList.push(<td><Button type="success" title='' asize='xs' /></td>);
            break;
          case "1":
            addList.push(<td><Button type="warning" title='' asize='xs' /></td>);
            break;
          case "2":
            addList.push(<td><Button type="remove" title='' asize='xs' /></td>);
            break;
        }
      });
    }
    return addList;
  }

  getDaysList() {
    var daysList = null;
    if (this.state.data) {
      daysList = !this.state.data ? '' : this.state.data.daysList.map((day) => {
        if (this.state.isMax[day]) {
          return <td><Button type='success' title={day} asize='xs' /></td>
        }
        else {
          return <td><Button type='default' title={day} asize='xs' /></td>;
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

  addAnswer(e) {
    //e.preventDefault();
    let _this = this;

    console.log('Here')

    var addList = [];
    var addData = this.state.addData;
    if (addData) {
      Object.keys(addData).forEach(function (key) {
        addList.push(addData[key]);
      });
    }

    console.log(addList)

    const answer = JSON.stringify({
      name: this.state.name,
      data: addList
    });

    fetch('https://srb5as1ds6.execute-api.ap-northeast-1.amazonaws.com/sukien_master/addanswer?exec_id=abcabcd', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: {
          "name": _this.state.name,
          "data": addList
        }
      })
    }).then((response) => response.json())
      .then((response) => {
        console.log(response)
        var data = JSON.parse(response)
        _this.test(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    // var daysList = null;
    var daysList = !this.state.data ? '' : this.state.data.daysList.map((day) =>
      <th>{day}</th>
    );
    // console.log('Day List:')
    // console.log(daysList)
    // const locationAnswerList = this.state.data.locationAnswerList.map((location) =>
    //   <th>{location}</th>
    // );
    const successList = !this.state.successList ? <th></th> : this.state.successList.map((element) =>
      <th>{element}/{this.state.data.answersData.length}</th>
    );
    const warningList = !this.state.warningList ? <th></th> : this.state.warningList.map((element) =>
      <th>{element}/{this.state.data.answersData.length}</th>
    );
    const removeList = !this.state.removeList ? <th></th> : this.state.removeList.map((element) =>
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
                value='0'
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
                value='1'
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
                value='2'
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
                <td><Button type='success' title='' asize='xs' /></td>
                {successList}
              </TableRow>
              <TableRow>
                <td><Button type='warning' title='' asize='xs' /></td>
                {warningList}
              </TableRow>
              <TableRow>
                <td><Button type='remove' title='' asize='xs' /></td>
                {removeList}
              </TableRow>
              {this.getAnswersList()}
            </TableBody>
          </Table>
        </Panel>

        <Panel title='Add'>
          <form>
            <p>Name</p>
            <input
              className='form-control '
              placeholder='Enter Name'
              name='name'
              onChange={e => this.handleChangeName(e)}
              value={this.state.name} />
          </form>
          {/*
          <Input
            label='Name'
            placeholder='Enter Name' />
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
          <Button type="add" onClick={this.addAnswer.bind(this)} />
        </Panel>

      </Page>
    );
  }
}

