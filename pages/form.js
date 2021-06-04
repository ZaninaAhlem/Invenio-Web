import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import dataUriToBuffer from "data-uri-to-buffer";

import styles from "../styles/Form.module.css";
import FormField from "../components/formField";
import { postFormation } from "../actions/Formations";

export default function Form() {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState([
    {
      label: "",
      type: "",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    image: "",
    category: "",
  });

  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const onImageChange = (imageList) => {
    const image = imageList[0].data_url;
    // setFormData({ ...formData, image: image });
    // console.log(image);
    var decoded = dataUriToBuffer(image);
    console.log(decoded);
  };

  const addPost = (e) => {
    e.preventDefault();
    dispatch(postFormation(formData)).then((data) => {
      if (data) {
        Router.push("/");
      } else console.log("no data");
    });
  };

  const changeHandler = (index, field) => {
    console.log(field);
  };

  return (
    <>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <ImageUploading
            value={formData.image}
            onChange={onImageChange}
            dataURLKey="data_url"
            className={styles.imageUploader}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div>
                <h3>Inofrmation du formation</h3>
                {formData.image ? (
                  <div className="image-item">
                    <img src={formData.image} alt="" width="300" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(0)}>Update</button>
                      &nbsp;
                      <button onClick={() => onImageRemove(0)}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.imageHolder}>
                    <button
                      className={styles.uploadButton}
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Parcourir
                    </button>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
          <div className={styles.formContainer}>
            <label htmlFor="Title">Title</label>
            <input
              id="Title"
              name="title"
              type="text"
              required
              // onFocus={}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              name="Description"
              required
              onChange={(e) => onChange("description", e.target.value)}
            />
            <label htmlFor="Category">Category</label>
            <input
              id="Category"
              name="Category"
              type="text"
              required
              onChange={(e) => onChange("category", e.target.value)}
            />
            <label htmlFor="Date">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => onChange("date", date)}
            />
            <button onClick={addPost}>Add</button>
          </div>
        </main>
        <section className={styles.inscriptionForm}>
          <div>
            <h3>Formulaire d'inscription</h3>
            <button
              className={styles.plus}
              onClick={() => {
                setFormFields([...formFields, { label: "", type: "" }]);
              }}
            >
              <Image src="/plus.svg" height="28px" width="28px" />
            </button>
          </div>
          <div>
            <span>Label du champs</span>
            <span>Type du champs</span>
          </div>
          {formFields.map(function (index) {
            return <FormField key={index} onChange={changeHandler(index)} />;
          })}
        </section>
      </div>
    </>
  );
}
