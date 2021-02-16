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
    if(name.length<1||name==null){
      window.alert("Name cannot be null");
      return;
    }
    if(!email.includes("@")|| !email.includes(".")){
      window.alert("You must provide a valid email address");
      return;
    }
    if(salary<0){
      window.alert("Salary can't be a negative value");
      return;
    }

    if(image.length==0||image==null){
      image="https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Avatar_icon_green.svg/1024px-Avatar_icon_green.svg.png"
    }


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

  deleteUser(id){
    let users= this.state.users;
    users=users.filter((user)=>{if(user.id!=id) return user });
    this.setState({users:users});
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.textColor}}>
        <h1>Admin panel - Proiectul 1</h1>
        <div className="buttons">
        <button onClick={(event)=>this.showUsers(event)}>Show Users</button>
        <button onClick={(event)=>this.showPosts(event)}>Show Posts</button>
        <div className="colorBtn"><label>Background color </label>
        <input type="color" onChange={(event) => this.changeColor(event)}/>
        </div>
        <div className="colorBtn"><label>Text color </label>
        <input type="color" onChange={(event) => this.changeTextColor(event)}/>
        </div></div>
        <UserAddForm submitAddForm={(event, name, email, isGoldClient, image, salary) => this.submitAddForm(event, name, email, isGoldClient,image,salary)}/>
        
        { this.state.showList=== "users"?
                 
                 <UserList
                  users={this.state.users}
                 deleteUser={(id)=>this.deleteUser(id)}/>:
              null
        }
        
        {
          this.state.showList=== "posts"?
          <PostList />:
          null
        }
       

      </div>
    );
  }
}

export default App;
