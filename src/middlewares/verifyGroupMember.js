const { ERRORS } = require('../lib/ERRORS');
const getLoginUserId = require('../lib/getLoginUserId');
const handleError = require('../lib/handleError');
const Group = require('../models/Group');

const verifyGroupMember = (req, res, next) => {
  const { groupId } = req.params;
  const userId = getLoginUserId(req);

  try {
    const group = Group.findById(groupId).lean().exec();

    if (!group) {
      return handleError(res, ERRORS.GROUP_NOT_FOUND);
    }

    if (!group.members.includes(userId)) {
      return handleError(res, ERRORS.USER_NOT_FOUND);
    }
    return next();
  } catch (error) {
    return handleError(res, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = verifyGroupMember;
