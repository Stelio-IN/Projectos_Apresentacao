import db from '../models/index.js'; // Use import instead of require

// Create main model

const Review = db.reviews; // Supondo que você esteja usando 'reviews' também

//add review

const addReview = async (req, res) => {
    let info = {
        description: req.body.description,
        rating: req.body.rating
        
    }

    const review = await Review.create(info);

    res.status(201).json(review);
};

//get all reviews

const getAllReviews = async (req, res) => {
    const reviews = await Review.findAll();

    res.status(200).json(reviews);
};

//get review by id

const getReviewById = async (req, res) => {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
        return res.status(404).send('Review not found');
    }

    res.status(200).json(review);
};

//update a review

const updateReview = async (req, res) => {
    let id = req.params.id;
    let info = {
        description: req.body.description,
        rating: req.body.rating
    };

    const review = await Review.findByPk(id);

    if (!review) {
        return res.status(404).send('Review not found');
    }

    await review.update(info);

    res.status(200).json(review);
};

//delete a review

const deleteReview = async (req, res) => {
    let id = req.params.id;
    const review = await Review.findByPk(id);

    if (!review) {
        return res.status(404).send('Review not found');
    }

    await review.destroy();

    res.status(200).send('Review deleted successfully');
};
export default {
 addReview,
 getAllReviews,
 getReviewById,
 updateReview,
 deleteReview
};
