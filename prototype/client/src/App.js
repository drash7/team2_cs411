import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#fff'
};

// count # of artists by checking length of artist array
class ArtistCounter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.artists.length} Artists</h2>
      </div>
    );
  }
}

// // search for a artists by entering its name, the playlists available keep getting updated as the required name is entered
// class Filter extends Component {
//   render() {
//     return (
//       <div style={defaultStyle}>
//         <img/>
//         <input type="text" onKeyUp={event => 
//           this.props.onTextChange(event.target.value)}/>
//       </div>
//     );
//   }
// }

// get the name of each artist as well as its icon for the user, from Spotify
class Artist extends Component {
  render() {
    let artist = this.props.artist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img src={artist.imageUrl} style={{width: '60px'}}/>
        <h3>{artist.name}</h3>
        <ul>
          {artist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

// initialize variables
class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      serverData: {},
      filterString: '',
      numArtists: 20,
      timePeriod: "medium_term"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTopArtists = async (accessToken, limit, time_range) => {
    const params = new URLSearchParams({
      limit: limit,
      time_range: time_range
    });
    const url = 'https://api.spotify.com/v1/me/top/artists?' + params;

    await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    )
      .then(response => response.json())
      .then(data => this.setState({
        artists: data.items.map(item => {
          console.log(data);
          return {
            name: item.name,
            imageUrl: item.images[0].url,
            genres: item.genres,
            songs: []
          }
        }),
        displayResults: true
      }))
  }

  handleChange(event) {
    this.setState({ numArtists: event.target.value });
  }

  handleSubmit(event) {

    this.getTopArtists(this.state.user.accessToken, this.state.numArtists, this.state.timePeriod);
      // .then(event.preventDefault());
  }

  async componentDidMount() {
    // get access token
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    // fetch user data from Spotify
    await fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()) // collect response from API and convert into JSON format
    .then(data => this.setState({ // change state of current component, updating user's name
      user: {
        name: data.display_name,
        accessToken: accessToken
      },
      displayForm: true,
      displayResults: false
    }))

    // this.getTopArtists(accessToken, 50, "medium_term")

    /*
    // fetch data about current user's playlists
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()) // collect response from API and convert into JSON format
    .then(data => this.setState({ // change state of current component, adding user's playlists, with their names and icons
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: []
        }
    })
    }))
    */

  }
  render() {
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.user.name}'s Top Artists
          </h1>
            <div>
              {/* <form style={defaultStyle}> */}
              <label style={{ padding: "1vw" }}>
                How Many Artists?
                <input name="limit" type="numbers" value={this.state.numArtists} onChange={event => this.handleChange(event)} />
              </label>
              {/* </form> */}
              <button onClick={() => { this.handleSubmit() }}>Get Top Artists</button>
            </div>
              <div>
                {
                  this.state.artists.map(artist =>
                    <Artist artist={artist} />
                  )
                }
              </div>
        </div>
            : <button onClick={() => { window.location = 'http://localhost:9000/login' } }>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;