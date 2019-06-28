import * as React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Operation} from '../../reducers/review/review';
import {MAX_CHAR_COMMENT, MIN_CHAR_COMMENT} from '../../constants/constants';
import {Comment} from '../../types/user';

interface InjectedProps {
  offerId: number;
  saveReview: (id: number, data: Comment) => void;
}

interface State {
  rating: number;
  comment: string;
}

const withPostComment = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithPostComment extends React.PureComponent<T, State> {

    state: State = {
      rating: 0,
      comment: '',
    };

    handleRatingChange = (event)=> {
      this.setState({rating: +event.target.value});
    };

    handleCommentChange = (event) => {
      this.setState({comment: event.target.value});
    };

    handleSubmitReview = (event) => {
      event.preventDefault();

      const {rating, comment} = this.state;

      this.props.saveReview({rating, comment}, this.props.offerId);
      this.setState({rating: 0, comment: ''});
    };

    render() {
      const {rating, comment} = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          onSubmit={this.handleSubmitReview}
          onRatingChange={this.handleRatingChange}
          onCommentChange={this.handleCommentChange}
          disabled={!(comment.length > MIN_CHAR_COMMENT && comment.length < MAX_CHAR_COMMENT && rating > 0)}
        />
      );
    }
  }

  return WithPostComment;
};

const mapStateToProps = (state, ownProps) => ({...ownProps});
const mapDispatchToProps = (dispatch, ownProps) => ({
  saveReview: (data) => dispatch(Operation.saveReview(ownProps.offerId, data))
});

export {withPostComment};
export default compose(connect(mapStateToProps, mapDispatchToProps), withPostComment);
