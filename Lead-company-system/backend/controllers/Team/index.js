const {createTeam} = require("./createTeam")
const {getTeams} = require("./getTeam")
const {updateTeam} = require("./updateTeam")
const {deleteTeam} = require("./deleteTeam")
const {restoreTeam} = require("./restoreTeam")

module.exports = {
createTeam,
getTeams,
updateTeam,
deleteTeam,
restoreTeam
}