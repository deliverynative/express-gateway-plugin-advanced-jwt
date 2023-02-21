const jwt = require('jsonwebtoken');

module.exports = {
  name: 'advanced-jwt',
  schema: {
    $id: 'N/A',
    type: 'object',
    properties: {
			authHeader: {
				type: 'boolean',
				default: false
			},
      secrets: {
        type: 'array',
      }
    }
  },
  policy: ({ secrets, allowAbsent = false }) => {
    return async (req, res, next) => {
      try {
				const authHeader = req.headers['authorization'] || req.headers['Authorization'];
				if (authHeader) {
					const token = authHeader.split(' ')[1];
					for(let i = 0; i < secrets.length; i++) {
						try {
							jwt.verify(token, secrets[i].secret, { algorithms: [secrets[i].algorithm] });
							break;
						} catch (e) {
							if(i === secrets.length - 1) {
								res.sendStatus(401);
								return;
							}
						}
					}
				} else if(!allowAbsent) {
					res.sendStatus(401);
					return;
				}
      } catch (e) {
        res.sendStatus(500);
        return;
      }
      next();
    };
  }
};