import * as React from 'react';
import {withPostComment} from '../../hocs/with-post-comment/with-post-comment';
import { MAX_CHAR_COMMENT, MIN_CHAR_COMMENT, RATING_ITEMS, ERROR_COLOR } from '../../constants/constants';
import {ResponseStatus} from '../../types/enums/response-status';

interface Props {
  rating: number;
  comment: string;
  disabled: boolean;
  onRatingChange: () => void;
  onCommentChange: () => void;
  onSubmit: () => void;
  postReviewStatus: number;
}

const ReviewForm: React.FunctionComponent<Props> = ({
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
        style={{borderColor: postReviewStatus === ResponseStatus.BAD_REQUEST ? ERROR_COLOR : ``}}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          {postReviewStatus === ResponseStatus.BAD_REQUEST && (
            <>
              <span style={{color: ERROR_COLOR}}>
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

export {ReviewForm};
export default withPostComment(ReviewForm);
