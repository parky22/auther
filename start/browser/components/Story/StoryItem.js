import React from 'react';
import { connect } from'react-redux';
import { Link } from 'react-router';
import { removeStory } from '../../redux/stories'; 


/* -----------------    COMPONENT     ------------------ */

class StoryItem extends React.Component {
  render() {
    const { story, removeStory } = this.props;

    return (
      <li className="list-group-item story-item">       
        <ul className="list-inline">
          <li>
            <Link className="large-font" to={`/stories/${story.id}`}>{story.title}</Link>
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <Link to={`/users/${story.author_id}`}>{story.author.name}</Link>
          </li>
        </ul>
        <button className="btn btn-default btn-xs" 
                onClick={ () => removeStory(story.id) }>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      </li>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = null;
const mapDispatch = { removeStory }

export default connect(mapState, mapDispatch)(StoryItem);
