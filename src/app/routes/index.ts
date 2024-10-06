import express from 'express';
const router = express.Router();

// import v1 from './v1';

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running'
    });
});

// router.use('/v1', v1);

export default router;
