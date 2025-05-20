import React, { useEffect, useState } from "react";
import Sidebar, { SidebarItem } from "../../components/MySidebar";
import { Home, User } from "lucide-react";
import TestCard from "../../components/TestCard";
import NavBar from "../../components/Navbar";

const StudentTest = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const dummyTests = [
      {
        _id: "1",
        title: "JavaScript Basics",
        description: "Test your knowledge of basic JavaScript concepts.",
        isActive: true,
      },
      {
        _id: "2",
        title: "React Fundamentals",
        description: "Covers components, props, and state.",
        isActive: false,
      },
      {
        _id: "3",
        title: "Data Structures",
        description: "Covers arrays, stacks, and queues.",
        isActive: true,
      },
    ];
    // axios.get("http://localhost:5000/api/tests") // Replace with your API URL
    //       .then((response) => setTests(response.data))
    //       .catch((error) => console.error("Error fetching tests:", error));
    setTests(dummyTests);
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div
          className={`flex-1 p-6 bg-gray-50 
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.map((test) => (
              <TestCard
                key={test._id}
                title={test.title}
                description={test.description}
                isActive={test.isActive}
                onStart={() => console.log("Start test:", test._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentTest;
