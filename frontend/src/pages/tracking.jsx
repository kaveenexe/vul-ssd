import React, { useEffect, useState } from "react";
import axios from "axios";

const Tracking = () => {
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY; // Use environment variable
    const trackingUrl = "https://parcelsapp.com/api/v3/shipments/tracking";
    const shipments = [
      {
        trackingId: "9274890306531713613125",
        language: "en",
        country: "United States",
      },

      // ...
    ];

    const initiateTracking = async () => {
      try {
        const response = await axios.post(trackingUrl, { apiKey, shipments });
        const { uuid } = response.data;
        console.log("aAAAAAAAAAAAA");
        console.log(response.data);
        setUuid(uuid);
      } catch (error) {
        console.error(error);
      }
    };

    initiateTracking();
  }, []);

  useEffect(() => {
    const checkTrackingStatus = async () => {
      try {
        const response = await axios.get(
          `https://parcelsapp.com/api/v3/shipments/tracking?uuid=${uuid}&apiKey=${process.env.REACT_APP_API_KEY}` // Use environment variable
        );
        const { done } = response.data;
        if (done) {
          console.log("Tracking complete");
          console.log(response.data);
        } else {
          console.log("Tracking in progress...");
          setTimeout(checkTrackingStatus, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (uuid) {
      checkTrackingStatus();
    }
  }, [uuid]);

  return <div>Tracking</div>;
};

export default Tracking;
