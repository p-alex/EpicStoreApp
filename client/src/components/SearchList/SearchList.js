import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './SearchList.css';

const SearchList = props => {
  const [state, setState] = useState({games:[]});
  useEffect (() => {
    fetch('/api/allGames').then(response => {
      return response.json()
    }).then(data => {
      setState(prevState => ({...prevState,games:data}));
    }) 
  }, []);
  const filteredList = state.games.filter(game => game.name.toLowerCase().includes(props.query));

    return (
      <div className="search-list">
        <ul>
          {filteredList.map((game,id) => {
            if(id < 5){
              return <a key={game._id} href={`/product/` + game.name.replace(/:|,/g,'').split(' ').join('')}><li key={game._id}>{game.name.length > 17 ? game.name.slice(0,20).slice(game.name.indexOf(' '), game.name.length) + '..': game.name}</li></a>
            }
          })}
        </ul>
      </div>
    )
}

export default SearchList;