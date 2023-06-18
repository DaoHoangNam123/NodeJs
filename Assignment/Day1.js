var empArr = [
  { empId: 101, empName: "Sara", projectId: "P101" },
  { empId: 102, empName: "Keshav", projectId: "P102" },
  { empId: 103, empName: "Saurabh", projectId: "P103" },
  { empId: 104, empName: "Giri", projectId: "P104" },
  { empId: 105, empName: "Saraansh", projectId: "P105" },
  { empId: 106, empName: "Neha", projectId: "P106" },
  { empId: 107, empName: "Priyam", projectId: "P107" },
  { empId: 108, empName: "Pranav", projectId: "P108" },
  { empId: 109, empName: "Puja", projectId: "P109" },
];
const employeeAdd = (id, name, project) =>
  empArr.push({ empId: id, empName: name, projectId: project });
const employeeUpdate = (empName, newName) => {
  const empIndex = empArr.findIndex((emp) => emp.empName === empName);
  if (empIndex > 0) {
    empArr[empIndex].empName = newName;
  } else {
    console.log("Employee not found");
  }
};

employeeAdd(110, "Nam", "P110");
console.log(empArr);
employeeUpdate("Nam", "Nam Hoang");
console.log(empArr);
