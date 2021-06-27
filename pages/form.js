import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import styles from "../styles/Form.module.css";
import FormField from "../components/formField";
import WithPrivateRoute from "../components/privatRoute";
import {
  getFormation,
  postFormation,
  postImage,
  addInscriptionForm,
  updateFormation,
} from "../actions/Formations";

function Form(props) {
  const router = useRouter();
  const date = new Date();
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [toUpdate, setToUpdate] = useState(false);
  const [formFields, setFormFields] = useState([
    {
      label: "",
    },
  ]);
  const [formFieldData, setFormFieldData] = useState({
    labels: [],
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    image: "",
    category: "",
    inscriptionForm: "",
  });

  useEffect(() => {
    if (router.query.formation) {
      setToUpdate(true);
      props.getFormation(router.query.formation).then((data) =>
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          date: data.date,
        })
      );
    }
  }, [router.query]);

  const testDisabled = () => {
    if (
      formData.title !== "" &&
      formData.description !== "" &&
      formData.image !== "" &&
      formData.category !== "" &&
      formData.inscriptionForm !== ""
    ) {
      setBtnDisabled(false);
    }
  };

  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    testDisabled();
  };

  const addPost = (e) => {
    e.preventDefault();
    props.postFormation(formData).then(() => {
      Router.push("/");
    });
  };

  const updatePost = (e) => {
    e.preventDefault();
    props
      .updateFormation(router.query.formation, formData)
      .then((data) => Router.push("/"));
  };

  const changeHandler = (formField) => {
    if (formField !== "") {
      let array = formFieldData.labels;
      array.push(formField);
      setFormFieldData({ labels: array });
    }
  };

  useEffect(() => {
    if (selectedImage) {
      setImage(null);
      let reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = (e) => {
        setImage(e.target.result);
      };
    }
  }, [selectedImage]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.formContainer}>
          <h3 className={styles.title}>Information du formation</h3>
          {!toUpdate && (
            <div>
              {!formData.image ? (
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
                      .then((data) => onChange("image", data));
                  }}
                >
                  {!selectedImage && (
                    <div className={styles.descriptionContainer}>
                      <span className={styles.description}>
                        Selectionner un fichier
                        <br />
                        <label>Format suppoté: JPG, JPEG, PNG, </label>
                      </span>
                      <label className={styles.button}>Parcourir</label>
                    </div>
                  )}
                  <input
                    className={styles.fileBrowser}
                    type="file"
                    name="file"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                  {!!selectedImage && (
                    <>
                      <div className={styles.preview}>
                        <img src={image} alt="" className={styles.previewImg} />
                      </div>
                      {/* <button
                        type="submit"
                        value="Submit"
                        className={styles.button}
                      >
                        <span>Submit</span>
                      </button> */}
                    </>
                  )}
                </form>
              ) : (
                <div className={styles.image}>
                  <img src={URL.createObjectURL(selectedImage)} />
                </div>
              )}
            </div>
          )}
          <div className={styles.form}>
            <div>
              <label htmlFor="Title">Titre</label>
              <input
                id="Title"
                name="title"
                type="text"
                placeholder="Titre"
                value={formData.title}
                required
                onChange={(e) => onChange("title", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Description">Description</label>
              <textarea
                id="Description"
                name="Description"
                placeholder="Description"
                value={formData.description}
                required
                onChange={(e) => onChange("description", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Category">Categorie</label>
              <input
                id="Category"
                name="Category"
                type="text"
                placeholder="category"
                value={formData.title}
                required
                onChange={(e) => onChange("category", e.target.value)}
              />
            </div>

            <div className={styles.datePicker}>
              <label htmlFor="Date">Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => onChange("date", date)}
              />
              {!toUpdate ? (
                !btnDisabled && <button onClick={addPost}>Ajouter</button>
              ) : (
                <button onClick={updatePost}>Update</button>
              )}
            </div>
          </div>
        </section>
        {!toUpdate && (
          <div>
            {formData.inscriptionForm == "" ? (
              <section className={styles.inscriptionForm}>
                <div>
                  <h3 className={styles.title}>Formulaire d'inscription</h3>
                  <button
                    className={styles.plus}
                    onClick={() => {
                      setFormFields([...formFields, { label: "" }]);
                    }}
                  >
                    <Image src="/plus.svg" height="28px" width="28px" />
                  </button>
                </div>
                <div>
                  <label>Label du champs</label>
                </div>
                {formFields.map(function (formField, index) {
                  return (
                    <FormField
                      key={index}
                      changeHandler={(formField) => changeHandler(formField)}
                    />
                  );
                })}

                <button
                  className={styles.button}
                  onClick={() => {
                    props
                      .addInscriptionForm(formFieldData)
                      .then((data) => onChange("inscriptionForm", data._id));
                  }}
                >
                  Créer Formulaire
                </button>
              </section>
            ) : (
              <section className={styles.formCreated}>
                <span>le formulaire a été créé avec succès</span>
                <Image src="/check.svg" height="24px" width="24px" />
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formations: state.formation,
  imageId: state.formation,
});

const mapDispatchToProps = {
  postFormation,
  postImage,
  addInscriptionForm,
  getFormation,
  updateFormation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
