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

  render() {
    return (
      <Page title='Create Event'>

        <Row>
          <Col>

            <Panel title='How to use ?'>
              1. Nhập thông tin Event  <br  />
              2. Nhấn tạo Event <br />
              3. Share link cho những người sẽ tham gia
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col>

            <Panel title='Event Detail'>

              <form>
                <p>Event Title</p>
                <input
                  className='form-control '
                  placeholder='Enter Tittle'
                  name='title'
                  onChange={e => this.onChangeText(e)}
                  value={this.state.title} />
                <br />
                <p>Memo</p>
                <input
                  className='form-control '
                  placeholder='Enter Memo'
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
            <Panel title='Time'>

              <Textarea
                name='textarea'
                placeholder='2017-11-13 18:00~&#13;&#10;2017-11-20 18:00~'
                name='time'
                onChange={e => this.onChangeText(e)}
                value={this.state.time} />
              <Button type="add" title="Create" />
            </Panel>

          </Col>
          <Col>
            <Panel title='Calendar'>
              <Calendar onChange={this.handleCalendarChange.bind(this)} />
            </Panel>
          </Col>

        </Row>

      </Page>

    );
  }
}

