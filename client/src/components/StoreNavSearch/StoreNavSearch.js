import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import './StoreNavSearch.css';
import {connect} from 'react-redux';
import SearchList from '../SearchList/SearchList';
const StoreNavSearch = props => {
  return (
    <React.Fragment>
 <div className="store-nav-container">
      <div className="container store-nav-flex">
        <div className="store-nav-container_links">
          <ul>
            <li>
              <NavLink to="/store" exact activeStyle={{color: 'white'}} onClick={() => props.isBrowsePage('discover')}>
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink to="/store/browse" exact activeStyle={{color: 'white'}} onClick={() => props.isBrowsePage('browse')}>
                Browse
              </NavLink>
            </li>
          </ul>
        </div>
        <form>
          <input type="text" placeholder="Search" value={props.sq} onChange={props.onQueryChange}/>
          {!props.isBrowse && props.sq != '' ? <SearchList query={props.sq}/> : null}
        </form>
        
      </div>
      
    </div>
    
    
    </React.Fragment>
   
  );
};
const mapStateToProps = (state) => {
  return {
    sq:state.searchQuery,
    isBrowse:state.isBrowsePage
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onQueryChange: (e) => dispatch({type:'searchQuery',payload:e.target.value}),
    isBrowsePage: (page) => dispatch({type:'isBrowsePage', payload: {page}})
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)( StoreNavSearch);
