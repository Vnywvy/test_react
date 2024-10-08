import { useContext, useState } from "react";
import { departments, countries, statuses } from "../constants";
import { UserContext } from "../context";
import { Popup, CustomDropdown, CustomButton, UserField } from "../components";

const Users = () => {
  const { newUsers, setNewUsers } = useContext(UserContext);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const resetFilters = () => {
    setSelectedDepartments([]);
  };

  const handleRemoveUser = (name) => {
    setNewUsers((pv) => pv.filter((user) => user.name !== name));
  };

  const filteredUsers = newUsers.filter((user) => {
    const departmentMatches =
      selectedDepartments.length === 0 ||
      selectedDepartments.some(
        (selectedDept) => selectedDept.value === user.department.value
      );

    const countryMatches =
      selectedCountries.length === 0 ||
      selectedCountries.some(
        (selectedCountry) => selectedCountry.value === user.country.value
      );

    const statusMatches =
      selectedStatuses.length === 0 ||
      selectedStatuses.some(
        (selectedStatus) => selectedStatus.value === user.status.value
      );

    return departmentMatches && countryMatches && statusMatches;
  });

  const [isPopupOpened, setIsPopupOpened] = useState(false);

  return (
    <main className="page-wrapper">
      <Popup
        users={newUsers}
        isOpened={isPopupOpened}
        setIsOpened={setIsPopupOpened}
        setUsers={setNewUsers}
      />
      <section className="sort-wrapper">
        <p className="mistake">
          {selectedDepartments.length < 3
            ? "Please add at least 3 departmetns to be able to proceed next steps."
            : ""}
        </p>
        <div className="filters">
          <div className="dropdowns-button">
            <div className="dropdowns">
              <CustomDropdown
                name="Departments"
                fields={departments}
                selectedFields={selectedDepartments}
                setSelectedFields={setSelectedDepartments}
                disabled={false}
              />
              <CustomDropdown
                name="Departments"
                fields={countries}
                selectedFields={selectedCountries}
                setSelectedFields={setSelectedCountries}
                disabled={selectedDepartments.length < 3}
              />
              <CustomDropdown
                name="Departments"
                fields={statuses}
                selectedFields={selectedStatuses}
                setSelectedFields={setSelectedStatuses}
                disabled={selectedDepartments.length < 3}
              />
            </div>
            <CustomButton
              image="/images/trash.png"
              disabled={!selectedDepartments.length}
              onClick={resetFilters}
            />
          </div>
          <CustomButton
            text="Add User"
            size="large"
            onClick={() => setIsPopupOpened(true)}
          />
        </div>
      </section>
      <section className="table">
        <div className="headings">
          <h4 className="first-heading">Full Name</h4>
          <h4 className="headings__large">Department</h4>
          <h4>Country</h4>
          <h4>Status</h4>
          <span className="last-span"></span>
        </div>
        {filteredUsers.map((user) => (
          <UserField
            key={user.name}
            name={user.name}
            department={user.department.name}
            country={user.country.name}
            status={user.status.name}
            onClick={handleRemoveUser}
          />
        ))}
      </section>
    </main>
  );
};

export default Users;
