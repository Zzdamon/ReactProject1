import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import './App.css';
import PostList from './components/PostList';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      textColor:'black',
      users: [],
      showList: "users"
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 4);
        data.forEach(user => {
          user.isGoldClient = false;
          user.image="https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Avatar_icon_green.svg/1024px-Avatar_icon_green.svg.png";
          user.salary=0;
        });
        this.setState({users: data});
      })
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient,image,salary) {
    event.preventDefault();
    this.setState(prevState => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            isGoldClient,
            image,
            salary
          }
        ]
      }
    });
  }

  changeTextColor(event){
    this.setState({ textColor:event.target.value});
  }

  showUsers(event){
    this.setState({showList:"users"})
  }
  showPosts(event){
    this.setState({showList:"posts"})
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.textColor}}>
        <h1>Admin panel - Proiectul 1</h1>
        <UserAddForm submitAddForm={(event, name, email, isGoldClient, image, salary) => this.submitAddForm(event, name, email, isGoldClient,image,salary)}/>
        { this.state.showList=== "users"?
                 <UserList users={this.state.users}/>:
              null
        }
        {
          this.state.showList=== "posts"?
          <PostList />:
          null
        }
        <button onClick={(event)=>this.showUsers(event)}>Show Users</button>
        <button onClick={(event)=>this.showPosts(event)}>Show Posts</button>
        <input type="color" onChange={(event) => this.changeColor(event)}/>
        <input type="color" onChange={(event) => this.changeTextColor(event)}/>

      </div>
    );
  }
}

export default App;
