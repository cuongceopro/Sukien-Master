import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
import { Link } from 'react-router';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';

const format = 'YYYY-MM-DD 18:00~';

export class InputDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title : '',
      memo : '',
      location : '',
      time : '' 
    };
  }

  onChangeText(e){
    console.log(this.state.title);
    console.log(e.target);
    const { name, value } = e.target;
    const {state} = this.state;
    state[name] = value;
    this.setState({ state : state }); 
  }

  handleCalendarChange(value){
    console.log(value);
    console.log(value && value.format(format));
    const test = value.format(format);
    var selected = '';
    if(this.state.textarea){
     selected = this.state.textarea + '\n' + test;
    } else {
     selected = test;
    }

    this.setState({ textarea : selected });

  }

  render() {
    return (
      <Page  title='Create Event'>
            <Panel title='Event Detail'>

            <form>
      <div>
      <label className="radio-inline custom-radio nowrap">
      <input
        type='text'
        name='title'
        label='OK' 
        value='success'
        defaultChecked = 'true'
        onChange = {this.handleChange}/>
        OK
        </label>
        </div>
        </form>
              <form>
                <label>Event Title</label>
              <input
                className = 'form-control '
                label='Event Title'
                placeholder='Enter Tittle'
                name='title'
                onChange={e => this.onChangeText(e)}
                value={this.state.title} />
              </form>

              <Input
                label='Memo'
                placeholder='Enter Memo'
                onChange={e => this.onTextChange('address', e)}
                value={this.state.address} />
                
              <Textarea
                name='textarea'
                placeholder='Location 1&#13;&#10;Location 2'
                label='Location'
                onChange={e => this.onTextChange('textarea', e)}
                value={this.state.textarea} />

            </Panel>

            <Row>
              <Col>
              <Panel title='Test'>

            <Textarea
                name='textarea'
                placeholder='Default Input'
                label='Time'
                onChange={e => this.onTextChange('textarea', e)}
                value={this.state.textarea} />
                </Panel>
                </Col>
                <Col>

              <Calendar onChange={this.handleCalendarChange.bind(this)}/>

              </Col>
            </Row>

      </Page>
      
    );
  }
}

