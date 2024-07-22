import { useState, useEffect } from "react";
import { People } from "./types";
import PeopleList from "./PeopleList";
import { getAppConfigs } from "../../config/AppConfigs";

const AppConfigs = getAppConfigs();
const { API_URL } = AppConfigs;

const PeopleListContainer = () => {
  const [people, setPeople] = useState<People>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/people`);
        const data = await response.json();

        setPeople(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong! Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return <PeopleList peopleData={people} loading={loading} error={error} />;
};

export default PeopleListContainer;
