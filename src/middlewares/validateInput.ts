import { Request, Response, NextFunction } from 'express';

const arr = ['Street', 'Custom', 'Trail'];

const validate = async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.body;
  if (arr.indexOf(category) < 0) {
    return res.status(400).json({ message: 'ta na disney?' });
  }
  next();
};

export default validate;
