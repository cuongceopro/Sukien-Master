import React from 'react';

import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, EditableText, Pagination, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';

import {Row, Col} from 'react-flex-proto';

export class TableDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chromeVisits: 1000,
      currentPage: 1,
    };
  }

  onEditableChange(key, value) {
    this.setState({[key]: value});
  }

  onSetCurrentPage(value) {
    this.setState({currentPage: value});
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Table Types
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='SỰ KIỆN MASTER'>
        <Panel title='Event Detail'>
          <Table>
            <TableHead>
              <th>Browser</th>
              <th>Visits</th>
              <th>Purchases</th>
              <th>%</th>
              <th>Browser</th>
              <th>Visits</th>
              <th>Purchases</th>
              <th>%</th>
            </TableHead>
            <TableBody>
              <TableRow>
                <td><img src='http://akveo.com/blur-admin/assets/img/app/browsers/chrome.svg' /></td>
                <td>2,014 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>543 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>11.9% <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td><img src='http://akveo.com/blur-admin/assets/img/app/browsers/chrome.svg' /></td>
                <td>2,014 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>543 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>11.9% <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
              </TableRow>
              <TableRow>
                <td><img src='http://akveo.com/blur-admin/assets/img/app/browsers/safari.svg' /></td>
                <td>1,008 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/> </td>
                <td>102 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_down_small.png' /></td>
                <td>4.22% <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_down_small.png' /></td>
                <td><img src='http://akveo.com/blur-admin/assets/img/app/browsers/chrome.svg' /></td>
                <td>2,014 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>543 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>11.9% <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
              </TableRow>
              <TableRow>
                <td><img src='http://akveo.com/blur-admin/assets/img/app/browsers/firefox.svg' /></td>
                <td>1,322 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/> </td>
                <td>379 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_down_small.png' /></td>
                <td>13.5% <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_down_small.png' /></td>
                <td><img src='http://akveo.com/blur-admin/assets/img/app/browsers/chrome.svg' /></td>
                <td>2,014 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>543 <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
                <td>11.9% <img src='http://g.foolcdn.com/common/img/ico/arrows/arrow_up_small.png'/></td>
              </TableRow>
            </TableBody>
          </Table>
        </Panel>
      </Page>
    );
  }
}

