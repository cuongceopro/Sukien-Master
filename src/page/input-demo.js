import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect, Button } from 'react-blur-admin';
import { Link } from 'react-router';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';

const format = 'YYYY-MM-DD 18:00~';

export class InputDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      memo: '',
      location: '',
      time: ''
    };
  }

  onChangeText(e) {
    console.log(this.state);
    console.log(e.target);
    const { name, value } = e.target;
    const state = this.state;
    state[name] = value;
    this.setState({ state: state });
  }

  handleCalendarChange(value) {
    console.log(value);
    console.log(value && value.format(format));
    const test = value.format(format);
    var selected = '';
    if (this.state.time) {
      selected = this.state.time + '\n' + value.format(format);
    } else {
      selected = value.format(format);
    }

    this.setState({ time: selected });

  }

  create(e){
    let _this = this;
    console.log(this.state);
    var time = this.state.time.split('\n');
    console.log(time)

    if(this.state.title === ''){
      alert('Xin vui lòng nhập tên Event.')
    } else if (this.state.time === ''){
      alert('Xin vui lòng nhập Thời gian.')
    }
    else {

    fetch('https://srb5as1ds6.execute-api.ap-northeast-1.amazonaws.com/sukien_master/addevent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title : _this.state.title,
        memo : _this.state.memo,
        time : time
      }),
    }).then((response) => response.json())
      .then((response) => {
        console.log(response)
        _this.props.history.push('/eventDetail/' + response);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    return (
      <Page title='Create Event'>
        <Row>
          <Col>

            <Panel title='Event Info'>

              <form>
                <p>Tên Event</p>
                <input
                  className='form-control '
                  placeholder='Nhập tên event'
                  name='title'
                  onChange={e => this.onChangeText(e)}
                  value={this.state.title} />
                <br />
                <p>Memo</p>
                <input
                  className='form-control '
                  placeholder='Memo'
                  name='memo'
                  onChange={e => this.onChangeText(e)}
                  value={this.state.memo} />
                <br />
                {/*
                <p>Location</p>
                <Textarea
                  name='textarea'
                  placeholder='Location 1&#13;&#10;Location 2'
                  name='location'
                  onChange={e => this.onChangeText(e)}
                  value={this.state.location} />
                */}
              </form>

            </Panel>
          </Col>
        </Row>

        <Row>
        <Col>
            <Panel title='Calendar'>
              <Calendar onChange={this.handleCalendarChange.bind(this)} />
            </Panel>
          </Col>

          <Col>
            <Panel title='Time'>

              <Textarea
                name='textarea'
                placeholder='2017-11-13 18:00~&#13;&#10;2017-11-20 18:00~'
                name='time'
                onChange={e => this.onChangeText(e)}
                value={this.state.time} />
              <Button type="add" title="Create" onClick={this.create.bind(this)} />
            </Panel>

          </Col>


        </Row>

      </Page>

    );
  }
}

