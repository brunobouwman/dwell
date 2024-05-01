import { DataEntry, Feature } from "../@interfaces/cryptography";
import {
  FetchDataRequest,
  FetchDataResponse,
  GoogleDataReponse,
  GoogleDataRequest,
  GoogleDataService,
} from "../@interfaces/google";

export class GoogleFitService implements GoogleDataService {
  constructor() {}
  // Function to get the user's historical data from the Google API
  async getGoogleData(request: GoogleDataRequest): Promise<GoogleDataReponse> {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

    if (!clientId) {
      return { userData: [], error: "No client id provided" };
    }

    if (!clientSecret) {
      return { userData: [], error: "No client secret provided" };
    }

    // Create the url to refresh the token
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: request.token,
      });

    //fetch the new token
    let refreshedToken;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      });
      refreshedToken = await response.json();

      // error handling
      if (!response.ok) {
        return { userData: [], error: request.token.error };
      }
    } catch (error) {
      return { userData: [], error: "Error refreshing access token" };
    }

    // Get the user's data sources from the Google API
    let dataSources;
    try {
      const sourcesResponse = await fetch(
        `https://www.googleapis.com/fitness/v1/users/me/dataSources`,
        {
          headers: {
            Authorization: `Bearer ${refreshedToken.access_token}`,
          },
        }
      );
      const sourcesData = await sourcesResponse.json();
      dataSources = sourcesData.dataSource;
    } catch (error) {
      return { userData: [], error: "Error getting data sources" };
    }

    //TODO: Improve code for handling multimple dataSources in the request

    // Loop through all the data sources and fetch the data
    const userData: Feature[] = [];
    const params = [];
    for (const source of dataSources) {
      if (source.dataType.name === "com.google.step_count.delta") {
        params.push({
          token: request.token.access_token,
          type: source.dataType.name,
          streamId: source.dataStreamId,
        });
        const { data, error } = await this.fetchData({
          accessToken: refreshedToken.access_token,
          type: source.dataType.name,
          dataSourceId: source.dataStreamId,
        });

        if (error) {
          return { userData: [], error };
        }

        const feature: Feature = {
          name: "steps",
          entires: data,
        };

        userData.push(feature);
      }
    }

    //TODO: Emit events so the frontend can respond to it
    // if (global.io) {
    //   global.io.emit("googleDataretrieved");
    // }

    // Return the user's data
    return { userData, error: null };
  }

  private async fetchData(
    request: FetchDataRequest
  ): Promise<FetchDataResponse> {
    // Create the start and end date
    const endDate = new Date();
    const startDate = new Date();
    //TODO: Maybe get current day's data?
    startDate.setDate(startDate.getDate() - 1);

    // Get the user's data from the Google API
    let rawData;
    try {
      const response = await fetch(
        `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        {
          body: JSON.stringify({
            aggregateBy: [
              {
                dataTypeName: "com.google.step_count.delta",
                dataSourceId: request.dataSourceId,
              },
            ],
            bucketByTime: {
              durationMillis: 86400000,
            },
            startTimeMillis: startDate.getTime(),
            endTimeMillis: endDate.getTime(),
          }),
          headers: {
            Authorization: `Bearer ${request.accessToken}`,
            "Content-Type": "application/json",
          },
          method: "post",
        }
      );
      rawData = await response.json();
      // console.log("rawData", JSON.stringify(rawData, null, 2));
      // error handling
      if (!response.ok) {
        throw new Error(rawData);
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return { data: [], error: `Error fetching ${request.dataSourceId}` };
    }

    // Loop through all the data and store it in the array
    const dataArray: DataEntry[] = [];
    for (let b = 0; b < rawData.bucket.length; b++) {
      // Iterate through each bucket
      const bucket = rawData.bucket[b];
      for (let d = 0; d < bucket.dataset.length; d++) {
        // Iterate through each dataset in the current bucket
        const dataset = bucket.dataset[d];
        for (let p = 0; p < dataset.point.length; p++) {
          // Iterate through each point in the current dataset
          const point = dataset.point[p];

          // Get the value of the data
          let value;
          if (point.value[0].fpVal) {
            value = point.value[0].fpVal;
          } else if (point.value[0].intVal) {
            value = point.value[0].intVal;
          } else {
            value = point.value[0].mapVal;
          }

          // Create and save a new data object
          const data: DataEntry = {
            // email: "email",
            // type: point.dataTypeName,
            // startTimeNanos: point.startTimeNanos,
            // endTimeNanos: point.endTimeNanos,
            timestamp: startDate.getTime().toString(),
            value,
          };
          dataArray.push(data);
        }
      }
    }

    // console.log("dataArray", dataArray.length);
    // Return the data
    return { data: dataArray };
  }
}
