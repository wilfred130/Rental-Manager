import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {jwtConstants} from './jwtConstants'
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}