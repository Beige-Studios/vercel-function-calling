const { Client, Environment, ApiError } = require("square");
console.log(process.env.SQUARE_ACCESS_TOKEN)
const client = new Client({
    bearerAuthCredentials: {
      accessToken: "EAAAlyjqSc-T2j8wvmJQih1Wwzg_yOV3py2Y--Vdsw3Kn_2yicHpdiIXW7hZvY3k"
    },
  environment: Environment.Sandbox,
});

const { locationsApi } = client;

async function getLocations() {
  try {
    let listLocationsResponse = await locationsApi.listLocations();

    let locations = listLocationsResponse.result.locations;

    locations.forEach(function (location) {
      console.log(
        location.id + ": " +
          location.name +", " +
          location.address.addressLine1 + ", " +
          location.address.locality
      );
    });
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

getLocations();
