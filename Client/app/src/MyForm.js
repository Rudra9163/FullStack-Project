import React, { useState } from "react";
import { Row, Col, Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "./Custom/CustomInput";
import { Formik } from "formik";
import ApiService from "./api/apis";
import { url } from "./Custom/api.url";

const MyForm = () => {
  const navigate = useNavigate();
  const apiservice = new ApiService()

  
  const handleSubmit = async (values) => {
    console.log('Form Values:', values);
    const response = await apiservice.userdetailsform(values);
    try {
      console.log('API Response:', response.data);
      navigate("/Table");
    } catch (error) {
      console.log('Error during API response handling:', error);
    }
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/submit-form",values,
    //    {  headers: {
    //       'create': 'password',
    //   }},
        
    //   );
    //   console.log(response.data);
    //   message.success("Form submitted successfully!");
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error during form submission:", error);
    //   message.error("Error submitting form. Please try again.");
    // }
    
   
  };


  return (
    <>
    <div className="my-form-container">
    <button onClick={()=> navigate("/Table")}>watch table</button>
      <h4 style={{ padding: "20px" }}>Fill your details</h4>
      <Formik
        initialValues={{
          FirstName: "",
          LastName: "",
          EmailAdress: "",
          PhoneNumber: "",
          Adress: "",
          PinCode: "",
          Country: "",
          State: "",
          City: "",
          Remarks: "",
        }}
        validate={(values) => {
          const errors = {};
          // Add your validation rules here
          if (!values.FirstName) {
            errors.FirstName = "Required";
          }
          // Add more validation rules for other fields

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onFinish={handleSubmit}>
            <Row justify="space-between" gutter={24} style={{ padding: "20px" }}>
              {Object.keys(values).map((fieldName,index) => (
                <Col lg={8} style={{ paddingBottom: "20px" }} key={index}>
                  <CustomInput
                    label={fieldName}
                    name={fieldName}
                    value={values[fieldName]}
                    onChange={handleChange}
                    error={errors[fieldName]}
                    touched={touched[fieldName]}
                  />
                </Col>
              ))}
              <Col lg={8} style={{ paddingTop: "30px" }}>
                <button type="submit">Submit</button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
   
    </>
  );
};

export default MyForm;
