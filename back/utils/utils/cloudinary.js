const  {v2} =require( "cloudinary");
const  dotenv =require("dotenv");
dotenv.config();

v2.config({
    cloud_name:"daouv5b3i",
    api_key:"729463491857898",
    api_secret:"DEI4pEVRNmnGQblRkmFnV4Oo8Co"
});
module.exports=v2;