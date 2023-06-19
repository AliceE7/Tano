const { soleToken } = require("sole-token");

module.exports = async (client) => {
  
  client._ERRID = function () {
    const err_id = soleToken({ type: "id", size: "17" });
    return err_id;
  };

  client._AUID = function () {
    const AUID = soleToken({ size: "30" });
    return AUID;
  };
};
