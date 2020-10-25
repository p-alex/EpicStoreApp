import React, {useState} from 'react';
import './BrowsePageFilters.css';
const BrowsePageFilter = props => {
  const [state, setState] = useState ({category: true});
  const categoryHandler = () => {
    if (state.category) {
      setState (prevState => ({...prevState, category: false}));
    } else {
      setState (prevState => ({...prevState, category: true}));
    }
  };
  return (
    <div className="browse-page-filter_container">
      <span style={{color: 'white', borderBottom: 'solid grey 1px'}}>
        Filters
      </span>
      <ul>
        <li>
          <span
            onClick={categoryHandler}
            style={{cursor: 'pointer', userSelect: 'none'}}
          >
            Categories
          </span>
          {state.category
            ? <ul>
                <li>Action</li>
                <li>Adventure</li>
                <li>Mod Toolkit</li>
                <li>Puzzle</li>
                <li>Racing</li>
                <li>RPG</li>
                <li>Shooter</li>
                <li>Strategy</li>
                <li>Survival</li>
              </ul>
            : null}

        </li>
      </ul>
    </div>
  );
};

export default BrowsePageFilter;
