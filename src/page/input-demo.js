import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
import { Link } from 'react-router';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';

export class InputDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
      editableSelect3: 1,
    };
  }

  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  onTextChange(key, event) {
    this.setState({ [key]: event.currentTarget.value });
  }

  onSelectChange(key, value) {
    this.setState({ [key]: value});
  }

  onSwitchChange(index) {
    let switches = this.state.switches;
    switches[index] = !switches[index];
    this.setState({ switches });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Inputs
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page  title='Create Event'>
            <Panel title='Event Detail'>

              <Input
                label='Event Title'
                placeholder='Enter Tittle'
                onChange={e => this.onTextChange('address', e)}
                value={this.state.address} />

              <Input
                label='Memo'
                placeholder='Enter Memo'
                onChange={e => this.onTextChange('address', e)}
                value={this.state.address} />
                
              <Textarea
                name='textarea'
                placeholder='Location 1 /n Location 2'
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

              <Calendar />

              </Col>
            </Row>

      </Page>
      
    );
  }
}

