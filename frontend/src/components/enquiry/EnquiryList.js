import React, { useEffect, useState } from "react";
import EnquiryCard from "./EnquiryCard";

const EnquiryList = ({ enquiries, sortCriteria }) => {
  // const [sortedEnquiries, setSortedEnquiries] = useState([]);

  // useEffect(() => {
  //   setSortedEnquiries(enquiries);
  // }, []);

  // useEffect(() => {
  //   setSortedEnquiries(() => {
  //     return getSortedEnquiries();
  //   });
  // }, [sortCriteria]);

  // const getSortedEnquiries = () => {
  //   switch (sortCriteria) {
  //     case "Date":
  //       return enquiries.sort(
  //         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  //       );
  //     case "Budget":
  //       return enquiries.sort((a, b) => a.budget - b.budget);
  //     case "Start Date":
  //       return enquiries.sort(
  //         (a, b) => new Date(a.startDate) - new Date(b.startDate)
  //       );
  //     default:
  //       return enquiries;
  //   }
  // };

  return (
    <>
      {enquiries?.map((enquiry) => (
        <EnquiryCard key={enquiry._id} enquiry={enquiry} />
      ))}
    </>
  );
};

export default EnquiryList;
