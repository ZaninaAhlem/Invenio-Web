import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";
import dataUriToBuffer from "data-uri-to-buffer";

import styles from "../styles/Form.module.css";
import FormField from "../components/formField";
import { postFormation, postImage } from "../actions/Formations";

function Form(props) {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const addPost = (e) => {
    e.preventDefault();
    props.postFormation(formData).then((data) => {
      if (data) {
        Router.push("/");
      } else console.log("no data");
    });
  };

  const changeHandler = (index, field) => {
    // console.log(field);
  };

  return (
    <>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <form
            className={styles.imageHolder}
            method="post"
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("file", selectedImage);
              props
                .postImage(formData)
                .then((data) => setFormData({ ...formData, image: data }));
            }}
          >
            <input
              type="file"
              name="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <button type="submit" value="Submit">
              <span>Submit</span>
            </button>
          </form>
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

const mapStateToProps = (state) => ({
  formations: state.formation,
  imageId: state.formation,
});

const mapDispatchToProps = {
  postFormation,
  postImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
