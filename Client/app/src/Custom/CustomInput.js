import React from "react";
import { Form, Input, Typography } from "antd";
const CustomInput = ( props ) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} style={{ fontSize: "20px", fontWeight: 600 }}>
        {props.label}
      </label>
      <Input
        type={props.type}
       
         id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errors && props.touched && (
        <Typography.Text type="danger" style={{ textAlign: "left" }}>
          {props.errors}
        </Typography.Text>
      )}
    </div>
  );
};

export default CustomInput;
