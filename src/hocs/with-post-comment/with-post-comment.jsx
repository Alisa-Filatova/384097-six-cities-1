import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducers/review/review';
import {MAX_CHAR_COMMENT, MIN_CHAR_COMMENT} from '../../constants/constants';

const withPostComment = (Component) => {
  class WithPostComment extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
      this._handleSubmitReview = this._handleSubmitReview.bind(this);
    }

    render() {
      const {rating, comment} = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          onSubmit={this._handleSubmitReview}
          onRatingChange={this._handleRatingChange}
          onCommentChange={this._handleCommentChange}
          disabled={!(comment.length > MIN_CHAR_COMMENT && comment.length < MAX_CHAR_COMMENT && rating > 0)}
        />
      );
    }

    _handleRatingChange(event) {
      this.setState({rating: +event.target.value});
    }

    _handleCommentChange(event) {
      this.setState({comment: event.target.value});
    }

    _handleSubmitReview(event) {
      event.preventDefault();

      const {rating, comment} = this.state;

      this.setState({rating: 0, comment: ``});
      this.props.postReview({rating, comment}, this.props.offerId);
    }
  }

  WithPostComment.propTypes = {
    offerId: PropTypes.number.isRequired,
    postReview: PropTypes.func.isRequired
  };

  return WithPostComment;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps);
const mapDispatchToProps = (dispatch, ownProps) => ({
  postReview: (data) => dispatch(Operation.postReview(ownProps.offerId, data))
});

export {withPostComment};
export default compose(connect(mapStateToProps, mapDispatchToProps), withPostComment);
