import { Button, Unstable_Grid2 as Grid, Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { withStyles } from "@mui/styles"
import * as Yup from 'yup'
import axios from "axios";

import css from "src/styles/Form.module.css"
import { Resource } from "../../types";
import categories from "./categories.json"

const initialState = {
    name: "",
    link: "",
    category: "",
}

const CssTextField = withStyles({
    root: {
        "& label": {
            color: "#000!important",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#000!important",
            },
            "&:hover fieldset": {
                borderWidth: "2px",
            },
            "& .Mui-error fieldset": {
                borderColor: "#000!important",
            },
        },
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: "#000!important",
            }
        },
        "& .MuiFormLabel-root.Mui-error": {
            color: "#000!important",
            "& span": {
                color: "#000!important",
            }
        }
    },
})(TextField);

export default function ResourcesForm({ data, after = () => { } }: { after?: () => void, data?: Resource }) {

    const { enqueueSnackbar } = useSnackbar()
    const formik = useFormik({
        validationSchema: Yup.object({
            name:
                Yup.string()
                    .required("Name is required")
                    .max(30, "Must be at most 30 characters")
                    .min(2, "Must be at least 2 characters"),
            link:
                Yup.string()
                    .required("Link is required")
                    .url("Must be a valid URL starting with http(s)://"),
            category:
                Yup.string()
                    .required("Category is required")
                    .oneOf(categories, "Must be one of the predefined categories")

        }),
        initialValues: { ...initialState, ...(data ?? {}) }, onSubmit: async (values, helpers) => {
            try {
                const dataToSubmit = { ...values };
                const response = data?.id
                    ? await axios.put(`/api/resources/${data.id}`, dataToSubmit)
                    : await axios.post("/api/resources/submit", dataToSubmit);
                helpers.setSubmitting(false);
                helpers.resetForm();
                enqueueSnackbar(data?.id ? "Saved Successfully" : "Created Resource", { variant: "success" });
                if (after) after();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    enqueueSnackbar("An error occurred: " + error.message, { variant: "error" });
                } else {
                    enqueueSnackbar("An unexpected error occurred", { variant: "error" });
                }
            }
        }
    })

    return (
        <div className={css.wrapper}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} sx={{ maxWidth: "sm" }} >
                    <Grid xs={12} sm={6}>
                        <CssTextField
                            name="name"
                            label="Name"
                            color="primary"
                            required fullWidth
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!formik.errors.name}
                            helperText={formik.errors.name}
                            disabled={formik.isSubmitting}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <CssTextField
                            name="link"
                            label="Link"
                            color="secondary"
                            required fullWidth
                            value={formik.values.link}
                            onChange={formik.handleChange}
                            error={!!formik.errors.link}
                            helperText={formik.errors.link}
                            disabled={formik.isSubmitting}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Autocomplete
                            id="category"
                            options={categories}
                            renderInput={(params) =>
                                <CssTextField
                                    {...params}
                                    name="category"
                                    label="Category"
                                    required
                                    fullWidth
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.category}
                                    helperText={formik.errors.category}
                                    disabled={formik.isSubmitting}
                                />
                            }
                            onInputChange={(event, value) => {
                                formik.setFieldValue("category", value);
                            }}
                            value={formik.values.category}
                        />
                    </Grid>
                    <Grid xs={12} sx={{ marginTop: 4 }}>
                        <Button
                            sx={{
                                float: "right",
                                backgroundColor: "rgb(239, 239, 239)",
                                textTransform: "none",
                                fontFamily: "Helvetica",
                                fontSize: "0.8em",
                                borderRadius: "4px",
                                color: "#000",
                                border: "1px solid #000",
                                height: "30px",
                                margin: "-35px 0 0 0",
                                width: 40,
                                "&:hover ": {
                                    backgroundColor: "rgb(220, 220, 220) !important;",
                                }
                            }}
                            disabled={formik.isSubmitting}
                            type={"submit"}
                            className={css.button}>
                            {!formik.isSubmitting && <>Save</>}
                            {formik.isSubmitting &&
                                <span style={{ paddingRight: 2 }}>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                </span>
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}