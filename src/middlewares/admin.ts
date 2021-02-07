import {Request, Response, NextFunction} from 'express';

import { is } from '../helpers/is'
import { error } from "../responses/error";
import { AuthService } from '../services/AuthService';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!is(token)) {
        return res.status(400).json(error("Specify a token", 400));
    }

    const result = await AuthService.isAdmin(token);

    if (result === true) {
        next()
    } else {
        return res.status(401).json(error("You are unauthorized", 401));
    }
}

export {
    isAdmin,
};
