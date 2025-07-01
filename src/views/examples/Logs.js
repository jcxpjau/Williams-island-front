import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Spinner,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect } from "react";
import { useState } from "react";
import api from "services/api";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);

      try {
        const { data: logs } = await api.get("logs");

        if (!logs || logs.length === 0) {
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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  console.log(logs);
  return (
    <>
      <Header cards={true} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">System Logs</h3>
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
                  ) : !logs || logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No logs found.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <>
                        <tr key={log.id}>
                          <td>
                            {log.userName} {log.userSurname}
                          </td>
                          <td className={levelColor(log.level)}>{log.level}</td>
                          <td> {log.context} </td>
                          <td> {log.entity} </td>
                          <td className={actionColor(log.action)}>
                            {log.action}
                          </td>
                          <td> {log.message} </td>
                          <td> {log.createdAt} </td>
                        </tr>
                      </>
                    ))
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Logs;
