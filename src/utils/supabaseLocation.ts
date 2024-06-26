import axios from "axios";

export async function checkCountry(
  countryName: string,
  countryCode: string
  // userId: bigint
) {
  try {
    const {
      data: { data, error },
    } = await axios.post("https://staxer.uc.r.appspot.com/select", {
      table: "countries_and_states",
      match: {
        description: countryName,
        name: countryCode,
      },
    });

    if (error) {
      throw new Error(`Error checking country existence: ${error.message}`);
    }
    console.log(data, countryName, countryCode);

    // Adds country to the list if it's not in the DB
    if (data.length === 0) {
      // const insertedData = await insertCountry(countryName, countryCode);
      // updateUserTableWithLocationCode(insertedData[0].id, userId);
      // Assigns location to user if country is in the DB
    } else {
      // updateUserTableWithLocationCode(data[0].id, userId);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function insertCountry(countryName: string, countryCode: string) {
  const {
    data: { data, error },
  } = await axios.post("https://staxer.uc.r.appspot.com/insert", {
    table: "countries_and_states",
    body: {
      description: countryName,
      name: countryCode,
    },
  });

  if (error) {
    throw new Error(`Error inserting country: ${error.message}`);
  }

  console.log(`InsertCountry: ${data}`);

  return data;
}

export async function updateUserTableWithLocationCode(
  locationId: bigint,
  userId: bigint
) {
  const {
    data: { data, error },
  } = await axios.post("https://staxer.uc.r.appspot.com/insert", {
    table: "users",
    body: { home_state: locationId },
    match: {
      user_id: userId,
    },
  });

  if (error) {
    throw new Error(`Error updating user table: ${error.message}`);
  }

  console.log("User table updated successfully with location code.", data);
}

export async function getLocationId(countryName: string, countryCode: string) {
  const {
    data: { data, error },
  } = await axios.post("https://staxer.uc.r.appspot.com/select", {
    table: "countries_and_states",
    match: {
      description: countryName,
      name: countryCode,
    },
  });

  if (error) {
    throw new Error(`Error getting location ID: ${error.message}`);
  }

  return data[0].id;
}
