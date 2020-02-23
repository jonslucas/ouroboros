import bcrypt from 'bcrypt';
import User from '../models/User';

const checkUser = async(pass, hash) => {
  try {
    const verif = await bcrypt.compare(pass, hash);
    
    if (verif) {
      return true;
    }

    return false;

  } catch (e) {
    console.log(e);
    return false;
  }
}

// Middleware for user authentication
export const authenticate = async (req, res, next) => {
  try {
    // TODO: Replace with better auth method.   
    const [, userAndPass] = req.headers.authorization.split(' ');
    const [user, pass] = userAndPass.split(':');
    const u = await User.findOne({username: user});
    const verif = await checkUser(pass, u.pass);
    
    if (!checkUser(pass, u.pass)) {
      res.status(403).json({ message: 'Unauthorized' });
    } else {
      next();
    }

  } catch(e) {
    console.log(e);
    res.status(401).json({ message: 'Invalid Request' });
  }
  
}

export const genHash = async (pass) => {
  const saltRounds = 15;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
