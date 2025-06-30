import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "services/api";
import { useAuth } from "context/auth/authHooks";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function LoginAuth(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("auth/login", { email, password });

      if (res.data.access_token) {
        login(res.data.access_token, rememberMe);
        navigate("/admin/index");
        setLoading(false);
      }
    } catch (err) {
      setError("Incorrect email or password");
      setLoading(false);
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-default shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-white mb-4">
              <p>Sign in with credentials</p>
            </div>
            <Form role="form" onSubmit={LoginAuth}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-white">Remember me</span>
                </label>
              </div>
              {error && (
                <div className="text-danger my-2">
                  <span> {error} </span>
                </div>
              )}
              {loading && (
                <div className="d-flex flex-column align-items-center justify-content-center mt-4 text-white">
                  <Spinner />
                  <p className="mt-2"> Logging in </p>
                </div>
              )}
              {!loading && (
                <div className="text-center">
                  <Button className="my-4" color="secondary" type="submit">
                    Sign in
                  </Button>
                </div>
              )}
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small style={{ color: "#172b4d" }}>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              /*     onClick={() => navigate("/auth/register")} */
            >
              <small style={{ color: "#172b4d" }}>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
