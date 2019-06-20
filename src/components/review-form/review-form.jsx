import React from 'react';
import PropTypes from 'prop-types';
import withPostComment from '../../hocs/with-post-comment/with-post-comment.jsx';
import {MAX_CHAR_COMMENT, MIN_CHAR_COMMENT, RATING_ITEMS} from '../../constants/constants';
import {ResponseStatus} from '../../enums/response-status';

const ReviewForm = ({
  rating,
  comment,
  disabled,
  onRatingChange,
  onCommentChange,
  onSubmit,
  postReviewStatus,
}) => {
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_ITEMS.map((item) =>
          <React.Fragment key={item.title}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={item.value}
              id={`${item.value}-stars`}
              type="radio"
              checked={rating === item.value}
              onChange={onRatingChange}
            />
            <label
              htmlFor={`${item.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={item.title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={MIN_CHAR_COMMENT}
        maxLength={MAX_CHAR_COMMENT}
        value={comment}
        onChange={onCommentChange}
        style={{borderColor: postReviewStatus === ResponseStatus.BAD_REQUEST ? `red` : ``}}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          {postReviewStatus === ResponseStatus.BAD_REQUEST && (
            <>
              <span style={{color: `red`}}>
                Ooops, something went wrong! Try again later.
              </span><br/>
            </>
          )}
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  postReviewStatus: PropTypes.number,
};

export {ReviewForm};
export default withPostComment(ReviewForm);
