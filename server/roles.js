// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("user")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("maire")
 .extend("user")
 .readAny("profile")

 ac.grant("admaire")
 .extend("user")
 .readAny("profile")

 ac.grant("responsable")
 .extend("user")
 .readAny("profile") 

 ac.grant("admin")
 .extend("user")
 .extend("maire")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();