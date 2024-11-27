const Review = require('../models/Review');

const ReviewInfo = async(req, res) => {
    const review_id = req.params.id;

    const review = await Review.findById(review_id);
    if (!review) {
        return res.status(404).json({message: 'Review not found'});
    }

    return res.status(200).json({review: review});
}

const ReviewUpdate = async(req, res) => {
    const review_id = req.params.id;
    const {grade, text, date_time, client_id} = req.body;

    const review = await Review.findByIdAndUpdate(review_id, {grade, text, date_time, client_id}, {new: true});

    if (!review) {
        return res.status(404).json({message: 'Review not found'});
    }

    return res.status(200).json({review: review});
}

const ReviewDelete = async(req, res) => {
    const review_id = req.params.id;

    const review = await Review.findById(review_id);
    if (!review) {
        return res.status(404).json({message: 'Review not found'});
    }

    await Review.findByIdAndDelete(review_id);

    return res.status(200).json();
}

const ReviewCreate = async(req, res) => {
    const {grate, text, date_time, client_id} = req.body;

    const review = new Review({grate, text, date_time, client_id});
    const saved_review = await review.save();

    return res.status(200).json({review: saved_review});
}

const AllReviews = async(req, res) => {
    return res.status(200).json({reviews: await Review.find()});
}

module.exports.ReviewInfo = ReviewInfo;
module.exports.ReviewCreate = ReviewCreate;
module.exports.ReviewUpdate = ReviewUpdate;
module.exports.ReviewDelete = ReviewDelete;

module.exports.AllReviews = AllReviews;