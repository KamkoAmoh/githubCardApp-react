import React from 'react';
import './App.css';
import {default as axios} from 'axios';


// const avatarPlaceHolder = "https://placehold.it/75";

const avatarStyle = {
  borderRadius: '10px'
}

// const testData = [
//   {
//     name: "Dan Abramov",
//     avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
//     company: "Facebook"
//   },
//   {
//     name: "Sophie Alpert",
//     avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
//     company: "Facebook"
//   },
//   {
//     name: "Sebastian Markbage",
//     avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
//     company: "Facebook"
//   }
// ];

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Form extends React.Component {
  state = {
    userName: ""
  }

  handleSubimt = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.onSubmit(resp.data);
      this.setState({ userName: ""});
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubimt}>
        <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({userName: event.target.value})}
          placeholder="GitHub username"
          required
          style={
            {
              marginLeft: 100,
              marginTop: 40,
              width: 250,
              height: 25,
              backgroundColor: "lightGreen",
              borderRadius: "7px"
              }
            }
          />
        <button 
          style={
            {
              marginLeft: 15,
              height: 40,
              backgroundColor: "yellow",
              borderRadius: "6px" 
              }
            }
          >Add card
          </button>
      </form>
    );
  }
}

class Card extends React.Component {
	render() {
    const profile = this.props;
    
  	return (
    	<div className="github-profile" style={{margin: '1rem'}}>
    	  <img src={profile.avatar_url} style={{...avatarStyle}}/>
        <div className="info" style={{ display: 'inline-block', marginLeft: 10 }}>
          <div className="name" style={{ fontSize: '150%', fontWeight: "bold" , color: "green"}}>{profile.name}</div>
          <div className="company" style={{fontWeight: "bold", color: "lightBlue"}}>{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.states = {
  //     profiles: testData
  //   };
  // }

  state = {
    title: "The GitHub Card",
    profiles: [] // testData
  }

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  }

	render() {
  	return (
    	<div>
    	  <div className="header" style={{fontSize: '200%', marginLeft: 100, marginTop: 50, fontWeight: "bolder", fontFamily: 'serif' }}>{this.state.title}</div>
        <Form onSubmit={this.addNewProfile}/>,
        <CardList profiles={this.state.profiles}/>
    	</div>
    );
  }	
}


export default App;
