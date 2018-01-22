import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect, Button, Table, TableHead, TableBody, TableRow } from 'react-blur-admin';

import { Link } from 'react-router';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';

const daysListData = ['10/01', '10/02', '10/03', '10/04'];
const isMax = {
  '10/01': false,
  '10/02': true,
  '10/03': false,
  '10/04': false
}
const successListData = ['2/3', '3/3', '1/3', '0/3']
const warningListData = ['0/3', '0/3', '1/3', '2/3']
const removeListData = ['1/3', '0/3', '1/3', '1/3']

const answersData = [
  {
    'name': 'Yamada Rina',
    'data': [
      '0',
      '0',
      '0',
      '1',
    ]
  },
  {
    'name': 'Cuong Ceopro',
    'data': [
      '0',
      '0',
      '1',
      '1',
    ]
  },
  {
    'name': 'Le VanThanh',
    'data': [
      '2',
      '0',
      '2',
      '2',
    ]
  }
];

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addData: {
        '10/01': '0',
        '10/02': '1',
        '10/03': '2',
        '10/04': '0'
      }
    };
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

  getAnswersList() {
    var answersList = answersData.map((answer) =>
      <TableRow>
        <td>{answer.name}</td>
        {this.makeCollum(answer.data)}
      </TableRow>
    );
    return answersList;
  }

  handleChange(e) {
    const { value, name } = e.target;
    var addData = this.state.addData;
    console.log(this.state.addData)
    addData[name] = value;
    this.setState({ addData: addData });
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
    var daysList = daysListData.map((day) => {
      if (isMax[day]) {
        return <td><Button type='success' title={day} asize='xs' /></td>
      }
      else {
        return <td><Button type='default' title={day} asize='xs' /></td>;
      }
    }
    );

    return daysList;
  }

  onCreate(e) {
    this.props.history.push('/create')
  }

  render() {
    var daysList = daysListData.map((day) =>
      <th>{day}</th>
    );

    const selectList = daysListData.map((day) =>
      <td>
        <form>
          <div>
            <label className="radio-inline custom-radio nowrap">
              <input
                type='radio'
                name={day}
                label='OK'
                value='0'
                defaultChecked={this.state.addData[day] == '0'}
                onChange={this.handleChange.bind(this)} />
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
                defaultChecked={this.state.addData[day] == '1'}
                onChange={this.handleChange.bind(this)} />
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
                defaultChecked={this.state.addData[day] == '2'}
                onChange={this.handleChange.bind(this)} />
              NG
            </label>
          </div>
        </form>
      </td>
    );

    const successList = successListData.map((element) =>
      <th>{element}</th>
    );
    const warningList = warningListData.map((element) =>
      <th>{element}</th>
    );
    const removeList = removeListData.map((element) =>
      <th>{element}</th>
    );


    return (
      <Page title='SUKIEN-MASTER'>
        <Panel title='[SAMPLE] Event Detail'>
          <Table>
            <TableHead>
              <th></th>
              {this.getDaysList()}
            </TableHead>
            <TableBody>
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
        <Panel title='How to use ?'>
          <p>Vui lòng làm theo các bước sau.</p>
        </Panel>
        {/*}
        <Row>
          <Col>

            <Panel title='How to use ?'>
    */}
        1. Nhập thông tin Event với các lựa chọn về thời gian<br />
        <br />

        <Panel title='[SAMPLE] Create Event'>

          <Input
            label='Event Title'
            value='Họp tất niên'
            disabled
          />
          <p>Memo</p>
          <Textarea
            name='textarea'
            value='Dự định sẽ họp tất niên nên mọi người cho ý kiến nhé !'
            name='time'
            disabled />
          <p>Time</p>
          <Textarea
            name='textarea'
            value='2017-12-13 18:00~21:00&#13;&#10;2017-12-20 13:00~16:00&#13;&#10;2017-12-23 13:00~16:00'
            name='time'
            disabled />
          <Button type="add" title="Create" disabled />
        </Panel>
        2. Share link cho những người sẽ tham gia <br />
        <br />
        <Panel title='[SAMPLE] Event Link'>
          <Input
            label=''
            value='https://sukien-master/eventDetail/1010101010181101010101010811010'
            disabled />
          <br />
        </Panel>

        3. Người tham gia lựa chọn ngày giờ phù hợp với mình  <br />
        <br />
        <Panel title='[SAMPLE] Add'>
          <Input
            label='Name'
            value='Thanh'
            disabled />
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
          <Button type="add" disabled />
        </Panel>

        4. Lựa chọn phương án phù hợp nhất cho tất cả mọi người  <br />
        <br />
        <Panel title='[SAMPLE] Event Detail'>
          <Table>
            <TableHead>
              <th></th>
              {this.getDaysList()}
            </TableHead>
            <TableBody>
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
        <Panel title='CREATE EVENT'>
          <p>Nhấn vào link dưới để tạo Event. </p>
          <Button type='success' title='Create New Event Now !' onClick={this.onCreate.bind(this)} asize='xs' />
        </Panel>
        {/*}
            </Panel>
          </Col>
        </Row>
  */}

      </Page>

    );
  }
}

