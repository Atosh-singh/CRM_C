const { createPermission } = require("./createPermission");
const { getPermissions } = require("./getPermission");
const { updatePermission} = require("./updatePermission");
const {deletePermission} = require("./deletePermission");
const { restorePermission } = require("./restorePermission");

module.exports = {
  createPermission,
getPermissions,
updatePermission,
deletePermission,
restorePermission
};
