const { createPermission } = require("./createPermission");
const { getPermissions } = require("./getPermission");
const { updatePermission} = require("./updatePermission");
const {deletePermission} = require("./deletePermission")

module.exports = {
  createPermission,
getPermissions,
updatePermission,
deletePermission
};
