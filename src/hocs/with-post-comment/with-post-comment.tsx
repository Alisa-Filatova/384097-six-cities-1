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

    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleSubmitReview = this.handleSubmitReview.bind(this);
    }

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

    private handleRatingChange(event) {
      this.setState({rating: +event.target.value});
    }

    private handleCommentChange(event) {
      this.setState({comment: event.target.value});
    }

    private handleSubmitReview(event) {
      event.preventDefault();

      const {rating, comment} = this.state;

      this.props.saveReview({rating, comment}, this.props.offerId);
      this.setState({rating: 0, comment: ``});
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
