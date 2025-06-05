/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useRef } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  BsFillPersonFill,
  BsFillPersonBadgeFill,
  BsPersonVcard,
  BsBuilding,
  BsAt,
  BsTelephone,
  BsPinMap,
  BsEnvelope,
} from "react-icons/bs";

import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { FaChild } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";

const MemberForm = () => {
  const initialState = {
    firstName: "",
    surname: "",
    unit: "",
    birthday: "",
    dateJoined: "",
    address: "",
    email: "",
    phone: "",
    secondaryAddress: "",
    city: "",
    country: "",
    postalCode: "",
  };
  const [form, setForm] = useState(initialState);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    require("../../assets/img/theme/placeholder-pfp.jpg")
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id.replace("input-", "")]: value,
    }));
  };

  return (
    <TabPane tabId="member">
      <RegistrationForm.Root>
        <RegistrationForm.Section title="Personal information">
          <RegistrationForm.ProfilePicture
            preview={preview}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          />
          <div className="col-lg-9 d-flex flex-column">
            <RegistrationForm.Field
              label="First Name"
              id="input-firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              icon={<BsPersonVcard size={18} />}
            />
            <RegistrationForm.Field
              label="Surname"
              id="input-surname"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Surname"
              icon={<BsPersonVcard size={18} />}
            />
            <RegistrationForm.Field
              label="Unit"
              id="input-unit"
              placeholder="Your unit"
              icon={<BsBuilding size={18} />}
            />
            <RegistrationForm.Field
              label="Date of birth"
              id="input-birthday"
              value={form.birthday}
              onChange={handleChange}
              type="date"
            />
            <RegistrationForm.Field
              label="Date joined"
              id="input-dateJoined"
              value={form.dateJoined}
              onChange={handleChange}
              type="date"
            />
          </div>
        </RegistrationForm.Section>

        <RegistrationForm.Section title="Contact information">
          <RegistrationForm.Field
            label="Address"
            id="input-address"
            value={form.address}
            onChange={handleChange}
            placeholder="Your William's Island address"
            md="12"
            icon={<BsEnvelope size={18} />}
          />
          <RegistrationForm.Field
            label="Email address"
            id="input-email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="youremail@provider.com"
            lg="6"
            icon={<BsAt size={18} />}
          />
          <RegistrationForm.Field
            label="Phone number"
            id="input-phone"
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            type="tel"
            placeholder="123-456-7890"
            lg="6"
            icon={<BsTelephone size={18} />}
          />
          <RegistrationForm.Field
            label="Secondary Address"
            id="input-secondaryAddress"
            value={form.secondaryAddress}
            onChange={handleChange}
            placeholder="Your secondary address"
            md="12"
            icon={<BsEnvelope size={18} />}
          />
          <RegistrationForm.Field
            label="City"
            id="input-city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            lg="4"
            icon={<BsPinMap size={18} />}
          />
          <RegistrationForm.Field
            label="Country"
            id="input-country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            lg="4"
            icon={<BsPinMap size={18} />}
          />
          <RegistrationForm.Field
            label="Postal code"
            id="input-postalCode"
            value={form.postalCode}
            onChange={handleChange}
            placeholder="Postal code"
            type="number"
            lg="4"
            icon={<BsPinMap size={18} />}
          />
        </RegistrationForm.Section>

        <RegistrationForm.SubmitBtn />
      </RegistrationForm.Root>
    </TabPane>
  );
};

const DependantForm = () => {
  const initialState = {
    firstName: "",
    surname: "",
    birthday: "",
    dateJoined: "",
    relationship: "",
    email: "",
    phone: "",
  };
  const [form, setForm] = useState(initialState);

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    require("../../assets/img/theme/placeholder-pfp.jpg")
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id.replace("input-", "")]: value,
    }));
  };

  return (
    <TabPane tabId="dependant">
      <RegistrationForm.Root>
        <RegistrationForm.Section title="Personal information">
          <RegistrationForm.ProfilePicture
            preview={preview}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
          />
          <div className="col-lg-9 d-flex flex-column">
            <RegistrationForm.Field
              id="input-firstName"
              label="First Name"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              icon={<BsPersonVcard size={18} />}
            />
            <RegistrationForm.Field
              id="input-surname"
              label="Surname"
              type="text"
              value={form.surname}
              onChange={handleChange}
              placeholder="Surname"
              icon={<BsPersonVcard size={18} />}
            />
            <RegistrationForm.Field
              id="input-birthday"
              label="Date of birth"
              type="date"
              value={form.birthday}
              onChange={handleChange}
            />
            <RegistrationForm.Field
              id="input-dateJoined"
              label="Date joined"
              type="date"
              value={form.dateJoined}
              onChange={handleChange}
            />
            <RegistrationForm.Field
              id="input-relationship"
              label="Relationship to property owner"
              type="select"
              value={form.relationship}
              onChange={handleChange}
              options={[
                { value: "", label: "Select a relationship" },
                { value: "child", label: "Child", icon: <FaChild size={16} /> },
                {
                  value: "spouse",
                  label: "Spouse",
                  icon: <GiBigDiamondRing size={16} />,
                },
                {
                  value: "parent",
                  label: "Parent",
                  icon: <MdFamilyRestroom size={16} />,
                },
                {
                  value: "visitor",
                  label: "Visitor",
                  icon: <BsPersonVcard size={16} />,
                },
              ]}
            />
          </div>
        </RegistrationForm.Section>

        <hr className="my-4" />

        <RegistrationForm.Section title="Contact information">
          <RegistrationForm.Field
            id="input-email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="youremail@provider.com"
            icon={<BsAt size={18} />}
          />

          <RegistrationForm.Field
            id="input-phone"
            label="Phone number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            icon={<BsTelephone size={18} />}
          />
        </RegistrationForm.Section>
        <RegistrationForm.SubmitBtn />
      </RegistrationForm.Root>
    </TabPane>
  );
};

const AddMember = () => {
  const [activeTab, setActiveTab] = useState("member");

  return (
    <>
      <UserHeader
        title="Add Member"
        description="In this page you can you add a new member or change their informations."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit member information</h3>
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  <ListExistingItems.Item>
                    <BsFillPersonFill className="mr-2" size={20} />
                    <span>John Doe (property owner)</span>
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>
                    <GiBigDiamondRing className="mr-2" size={20} />
                    <span>Jane Doe (spouse)</span>
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>
                    <FaChild className="mr-2" size={20} />
                    <span>Will Doe (child)</span>
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>
                    <BsPersonVcard className="mr-2" size={20} />
                    <span>Bob Smith (visitor)</span>
                  </ListExistingItems.Item>
                  <ListExistingItems.Button className="mt-4">
                    <Button className="border-0 shadow-0 m-0">+ New dependant </Button>
                  </ListExistingItems.Button>
                </ListExistingItems.Root>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Col className="p-0" xs="12">
                  <Nav tabs>
                    <NavItem className="mr-2">
                      <NavLink
                        className={activeTab === "member" ? "active" : ""}
                        onClick={() => setActiveTab("member")}
                      >
                        <h3 className="mb-0"> Property Owner Registration</h3>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "dependant" ? "active" : ""}
                        onClick={() => setActiveTab("dependant")}
                      >
                        <h3 className="mb-0"> Dependant Registration</h3>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <MemberForm />
                  <DependantForm />
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddMember;
