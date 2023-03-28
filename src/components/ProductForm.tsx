import React, { useState } from "react";
import FormField from "./FormField";
import Header from "./Header";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sku: { value: "", errorMessage: "" },
    name: { value: "", errorMessage: "" },
    price: { value: "", errorMessage: "" },
    type: { value: "", errorMessage: "" },
    size: { value: "", errorMessage: "" },
    weight: { value: "", errorMessage: "" },
    height: { value: "", errorMessage: "" },
    width: { value: "", errorMessage: "" },
    length: { value: "", errorMessage: "" },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => {
      if (e.target.name === "type") {
        return {
          ...prev,
          size: { value: "", errorMessage: "" },
          weight: { value: "", errorMessage: "" },
          height: { value: "", errorMessage: "" },
          width: { value: "", errorMessage: "" },
          length: { value: "", errorMessage: "" },
          [e.target.name]: { value: e.target.value, errorMessage: "" },
        };
      } else {
        return {
          ...prev,
          [e.target.name]: { value: e.target.value, errorMessage: "" },
        };
      }
    });
  };

  const updateErrorMessage = (
    field: keyof typeof formData,
    errorMessage: string
  ) => {
    setFormData((prev) => {
      return { ...prev, [field]: { ...prev[field], errorMessage } };
    });
  };

  const checkFieldValidation = (
    field: keyof typeof formData,
    checkNumber: boolean = false
  ) => {
    let isError: boolean | undefined;
    if (!formData[field].value) {
      isError = true;
      updateErrorMessage(field, `Please, subimt ${field}`);
    }
    if (checkNumber) {
      if (isNaN(+formData[field].value)) {
        isError = true;
        updateErrorMessage(field, `Please, provide data of indicated type`);
      }
    }

    return isError;
  };

  const handleSaveProduct = async () => {
    let isValid = true;
    const keys = Object.keys(formData).slice(0, 4) as [keyof typeof formData];
    for (const key of keys) {
      if (key == "price") {
        const result = checkFieldValidation(key, true);
        if (result) isValid = false;
      } else {
        const result = checkFieldValidation(key);
        if (result) isValid = false;
      }
    }
    if (formData.type.value) {
      if (formData.type.value == "DVD") {
        const result = checkFieldValidation("size", true);
        if (result) isValid = false;
      } else if (formData.type.value == "Book") {
        const result = checkFieldValidation("weight", true);
        if (result) isValid = false;
      } else if (formData.type.value == "Furniture") {
        const result = checkFieldValidation("height", true);
        if (result) isValid = false;
        const result2 = checkFieldValidation("length", true);
        if (result2) isValid = false;
        const result3 = checkFieldValidation("width", true);
        if (result3) isValid = false;
      }
    }

    if (isValid) {
      const postData: any = {};
      for (const key in formData) {
        const field = key as keyof typeof formData;
        if (formData[field].value) {
          if (field == "name" || field == "sku" || field == "type") {
            postData[field] = formData[field].value;
          } else {
            postData[field] = +formData[field].value;
          }
        }
      }
      try {
        //await axios.post(`${BASE_URL}/create.php`, postData);
        const result = await fetch(`${BASE_URL}/create.php`, {
          method: "post",
          body: JSON.stringify(postData),
        });
        const data = await result.json();
        if (!result.ok) {
          setFormData((prev) => {
            return {
              ...prev,
              sku: { ...prev.sku, errorMessage: data?.message },
            };
          });
          return;
        }
        navigate("/");
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const renderDynamicForm = () => {
    if (formData.type.value == "DVD") {
      return (
        <div className="flex flex-col">
          <FormField
            errorMessage={formData.size.errorMessage}
            value={formData.size.value}
            handleChange={handleInputChange}
            id="size"
            labelText="Size (MB)"
          />
          {!formData.size.errorMessage && (
            <span className="mt-2 text-sm">Please, provide size in mb</span>
          )}
        </div>
      );
    } else if (formData.type.value == "Book") {
      return (
        <div className="flex flex-col">
          <FormField
            errorMessage={formData.weight.errorMessage}
            value={formData.weight.value}
            handleChange={handleInputChange}
            id="weight"
            labelText="Weight (KG)"
          />
          {!formData.weight.errorMessage && (
            <span className="mt-2 text-sm">Please, provide weight in kg</span>
          )}
        </div>
      );
    } else if (formData.type.value == "Furniture") {
      return (
        <div className="flex flex-col gap-4">
          <FormField
            errorMessage={formData.height.errorMessage}
            value={formData.height.value}
            handleChange={handleInputChange}
            id="height"
            labelText="Height (CM)"
          />
          <FormField
            errorMessage={formData.width.errorMessage}
            value={formData.width.value}
            handleChange={handleInputChange}
            id="width"
            labelText="Width (CM)"
          />
          <FormField
            errorMessage={formData.length.errorMessage}
            value={formData.length.value}
            handleChange={handleInputChange}
            id="length"
            labelText="Length (CM)"
          />
          {!formData.height.errorMessage &&
            !formData.length.errorMessage &&
            !formData.width.errorMessage && (
              <span className="mt-2 text-sm">
                Please, provde dimensions in HxWxl format
              </span>
            )}
        </div>
      );
    }
  };

  return (
    <>
      <Header onSaveClick={handleSaveProduct} page="newProduct" />
      <form className="flex flex-col gap-4" id="product_form">
        <FormField
          errorMessage={formData.sku.errorMessage}
          handleChange={handleInputChange}
          id="sku"
          labelText="SKU"
          value={formData.sku.value}
        />
        <FormField
          errorMessage={formData.name.errorMessage}
          handleChange={handleInputChange}
          id="name"
          labelText="Name"
          value={formData.name.value}
        />
        <FormField
          errorMessage={formData.price.errorMessage}
          handleChange={handleInputChange}
          id="price"
          labelText="Price ($)"
          value={formData.price.value}
        />
        <div className="flex flex-col">
          <div className="flex w-80 justify-between">
            <label className="font-medium">Type Switcher</label>
            <select
              className={`border-2 ${
                formData.type.errorMessage ? "border-red-500" : "border-black"
              } py-1 pl-1`}
              value={formData.type.value}
              name="type"
              onChange={(e) => handleInputChange(e)}
              id="productType"
            >
              <option value="" disabled hidden>
                Type Switcher
              </option>
              <option id="DVD" value="DVD">
                DVD
              </option>
              <option id="Book" value="Book">
                Book
              </option>
              <option id="Furniture" value="Furniture">
                Furniture
              </option>
            </select>
          </div>
          {formData.type.errorMessage && (
            <span className="mt-2 text-sm text-red-500">
              {formData.type.errorMessage}
            </span>
          )}
        </div>
        {renderDynamicForm()}
      </form>
    </>
  );
};

export default ProductForm;
