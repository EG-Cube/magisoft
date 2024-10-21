import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTransportContext } from "../../hooks/useTransportContext";

// components
import TransportCard from "../../components/transport/TransportCard";
import Sort from "../../components/sales/Sort";
import Spinner from "../../components/Spinner";

const AdminTransportListView = ({ type }) => {
  const { transports, dispatch } = useTransportContext();
  const { user } = useAuthContext();
  const [filteredTransports, setFilteredTransports] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTransports = async () => {
      const response = await fetch(`${API_URL}/api/transport`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ENQUIRIES", payload: json });
      }
      setLoading(false);
    };

    if (user) {
      fetchTransports();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredTransports(
      transports?.filter((transport) => {
        const filterLower = filter.toLowerCase();
        return (
          transport?.company.toLowerCase().includes(filterLower) ||
          transport?.fromLocation.toLowerCase().includes(filterLower) ||
          transport?.toLocation.toLowerCase().includes(filterLower) ||
          transport?.modeOfTransport.toLowerCase().includes(filterLower) ||
          transport?.contactNumber?.toLowerCase().includes(filterLower) ||
          transport?.email?.toLowerCase().includes(filterLower) ||
          transport?.description?.toLowerCase().includes(filterLower) ||
          transport?.distance.toString().includes(filterLower) ||
          transport?.duration.toString().includes(filterLower)
        );
      })
    );
  }, [filter, transports, type]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="home">
          <h1>{type} Transports</h1>
          <div className="transports">
            <input
              id="search"
              type="text"
              placeholder="Search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            {/* <Sort /> */}
            {filteredTransports
              ?.sort((a, b) => a.createdAt < b.createdAt)
              .map((transport) => (
                <TransportCard
                  key={transport._id}
                  transport={transport}
                  isAdmin={true}
                  redirectLink={"/admin/transport/view/"}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTransportListView;
