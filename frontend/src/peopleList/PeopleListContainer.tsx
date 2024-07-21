import { useState, useEffect } from "react";
import { People } from "./types";
import PeopleList from "./PeopleList";

const PeopleListContainer = () => {
  const [people, setPeople] = useState<People>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_NODEJS_API_URL}/people`
        );
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
