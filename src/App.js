import './App.css';
import { Component } from 'react';
import { Avatar } from 'antd';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import AgoraDatatable from './components/agora-datatable/agora-datatable.component';

const ColumnFilter = ({ setSelectedKeys, selectedKeys, confirm }) => (
  <Input
    autoFocus
    placeholder="Type text here"
    value={selectedKeys?.[0]}
    onChange={(e) => {
      setSelectedKeys(e.target.value ? [e.target.value] : []);
    }}
    onPressEnter={confirm}
    onBlur={confirm}
  />
)

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      columns: [
        {
          title: 'User',
          dataIndex: 'fullName',
          key: 'fullName',
          filterDropdown: ColumnFilter,
          filterIcon: () => <SearchOutlined />,
          onFilter: (value, record) => {
            return record.fullName.toLowerCase().includes(value.toLowerCase());
          },
          render: (text, record) => (
            <div>
              <Avatar src={record.picture.large} />
              <span style={{ marginLeft: 8 }}>{text}</span>
            </div>
          ),
          width: 200
        },
        {
          title: 'Username',
          dataIndex: ['login', 'username'],
          key: 'username',
          filterDropdown: ColumnFilter,
          filterIcon: () => <SearchOutlined />,
          onFilter: (value, record) => {
            return record.login.username.toLowerCase().includes(value.toLowerCase());
          },
          width: 200
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          filterDropdown: ColumnFilter,
          filterIcon: () => <SearchOutlined />,
          onFilter: (value, record) => {
            return record.email.toLowerCase().includes(value.toLowerCase());
          },
          width: 300
        },
        {
          title: 'Birthday',
          dataIndex: ['dob', 'date'],
          key: 'birthday',
          render: (birthday) => {
            const formattedBirthdate = new Date(birthday).toLocaleDateString();
            return formattedBirthdate;
          },
          width: 200
        }
      ]
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=40')
    .then(res => res.json())
    .then((data) => {
      const users = data.results;
      this.setState(
        () => {
          return {users: users.map((user, index) => {
            const fullName = `${user.name.first} ${user.name.last}`; 
            return {...user, key: index, fullName}
          })}
        }
      )
    })
  }

  render() {
    const { users, columns } = this.state;

    return (
      <div className="App">
         <h1 className='agora-title'>Agora DataTable UI Page</h1>
        <AgoraDatatable users={users} columns={columns} />
      </div>
    );
  }

}

export default App;
