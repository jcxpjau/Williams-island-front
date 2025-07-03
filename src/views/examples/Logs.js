import { Card, CardHeader, Table, Col, Row, Spinner } from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { act, useEffect } from "react";
import { useState } from "react";
import api from "services/api";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import SearchEntity from "./SearchEntity";

const actionColor = (action) => {
  switch (action) {
    case "create":
      return "text-success fw-bold";
    case "update":
      return "text-primary fw-bold";
    case "delete":
      return "text-danger fw-bold";
    default:
      return "";
  }
};

const levelColor = (level) => {
  switch (level) {
    case "info":
      return "text-info fw-semibold";
    case "warning":
      return "text-warning fw-semibold";
    case "success":
      return "text-success fw-semibold";
    default:
      return "";
  }
};

const Logs = () => {
  const [logs, setLogs] = useState(null);
  const [displayLogs, setDisplayLogs] = useState(null);
  const [filter, setFilter] = useState(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);

      try {
        const { data } = await api.get("logs", {
          params: {
            limit: 10,
            skip: (currentPage - 1) * 10,
          },
        });

        setLastPage(data.lastPage || 1);

        const logs = data.data;

        if (!logs || logs.length === 0) {
          setLogs([]);
          setDisplayLogs([]);
          setLoading(false);
          return;
        }

        const logsWithUser = await Promise.all(
          logs.map(async (log) => {
            try {
              const { data: user } = await api.get(`/users/${log.userId}`);
              return {
                ...log,
                userName: user.name,
                userSurname: user.surname,
                action: log.action.split("_")[0],
                entity:
                  log.entity.charAt(0).toUpperCase() + log.entity.slice(1),
              };
            } catch (err) {
              console.log(`Can't find user ${log.userId}:`, err);
              return {
                ...log,
                user: null,
                userName: null,
                userSurname: null,
              };
            }
          })
        );

        setLogs(logsWithUser);
        setDisplayLogs(logsWithUser);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= lastPage) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    if (!filter) {
      setDisplayLogs(logs);
    }
  }, [filter]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (!filter) {
        setDisplayLogs(logs);
        return;
      }

      if (!filterTerm.trim()) {
        setDisplayLogs(logs);
        return;
      }
      const trimmedTerm = filterTerm.trim();
      setLoading(true);
      try {
        if (filter === "userId") {
          const { data } = await api.get(`logs/user/${trimmedTerm}`);
          setDisplayLogs(data);
          setLoading(false);
        }
      /*   if (filter === "entity"){
          const {data} = await api.get(`logs/entity`, {params:{'entity': trimmedTerm}});
          setDisplayLogs(data);
          setLoading(false);

        } */
      } catch {
        setDisplayLogs([]);
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [filterTerm, logs]);
  /*  const handleSearch = (searchTerm) => {
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm === "") {
      setDisplayLogs(logs);
      return;
    }

    const lowerCaseSearchTerm = trimmedTerm.toLowerCase();

    const filteredLogs = logs.filter((log) => {
      const action = log.action.toLowerCase();
      const entity = log.entity.toLowerCase();
      const context = log.context.toLowerCase();
      const name = log.userName;
      return (
        action.includes(lowerCaseSearchTerm) ||
        entity.includes(lowerCaseSearchTerm) ||
        context.includes(lowerCaseSearchTerm) ||
        name.includes(lowerCaseSearchTerm)
      );
    });

    setDisplayLogs(filteredLogs);
  }; */

  const renderPaginationItems = () => {
    const items = [];

    items.push(
      <PaginationItem key="previous" disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </PaginationItem>
    );

    for (let i = 1; i <= lastPage; i++) {
      items.push(
        <PaginationItem key={i} active={i === currentPage}>
          <PaginationLink onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="next" disabled={currentPage === lastPage}>
        <PaginationLink
          next
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </PaginationItem>
    );

    return items;
  };

  const clearSearch = () => {
    setFilter("");
    setFilterTerm("");
    setDisplayLogs(logs);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setFilterTerm("");
  };

  return (
    <Card className="bg-transparent">
      <CardHeader className="border-0">
        <Row className="align-items-center d-flex justify-content-end">
          <Col xs="6" className="d-flex justify-content-end gap-3">
            <div className="d-flex flex-row gap-2 mt-3">
              <select
                className="custom-select btn btn-secondary"
                value={filter}
                onChange={handleFilterChange}
                style={{ textAlign: "left" }}
              >
                <option value="">Filter by</option>
                <option value="userId"> User id </option>
                <option value="entity"> Entity </option>
              </select>

              {!filter && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select a filter"
                  disabled
                  style={{ width: "250px", flex: "0 0 250px" }}
                />
              )}

              {filter && (
                <SearchEntity
                  handleSearch={() => {}}
                  searchTerm={filterTerm}
                  setSearchTerm={setFilterTerm}
                  onClearSearch={clearSearch}
                  placeholder={`Filter by ${filter}`}
                  width={"250px"}
                />
              )}
            </div>
          </Col>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col"> User </th>
            <th scope="col"> Level </th>
            <th scope="col"> Context </th>
            <th scope="col"> Entity </th>
            <th scope="col"> Action </th>
            <th scope="col"> Message </th>
            <th scope="col"> Data </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-5">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <Spinner />
                  <p className="mt-2"> Loading logs </p>
                </div>
              </td>
            </tr>
          ) : !displayLogs || displayLogs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No logs found.
              </td>
            </tr>
          ) : (
            displayLogs.map((log) => (
              <>
                <tr key={log.id}>
                  <td>
                    {log.userName} {log.userSurname}
                  </td>
                  <td className={levelColor(log.level)}>{log.level}</td>
                  <td> {log.context} </td>
                  <td> {log.entity} </td>
                  <td className={actionColor(log.action)}>{log.action}</td>
                  <td> {log.message} </td>
                  <td> {log.createdAt} </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </Table>
      {(!filter || !filterTerm) && (
        <Pagination className="border pt-4 px-4 d-flex justify-content-end">
          {renderPaginationItems()}
        </Pagination>
      )}
    </Card>
  );
};

export default Logs;
