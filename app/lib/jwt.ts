import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

/**
 *👉 Simple function used to create a JSON Web Token
*/
export function signJwtAccessToken(
    payload: JwtPayload, 
    options: SignOption = DEFAULT_SIGN_OPTION
    ) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

/**
 *👉 Simple function used to verify the JSON Web Token
*/
export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}


//🎯delete this whole file
