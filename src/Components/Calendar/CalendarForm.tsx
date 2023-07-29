import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormHelperText,
  Unstable_Grid2 as Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import clsx from "clsx";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { CalendarRow } from "../../types";
import GooglePlacesAutoComplete from "../GooglePlacesAutoComplete";

const initialState = {
  name: "",
  type: "",
  address: "",
  website: "",
  starts_at: null,
  ends_at: null,
  phone: "",
  email: "",
  description: "",
};

const type = [
  {
    value: "In-person meeting",
  },
  {
    value: "Zoom Meeting",
  },
  {
    value: "Exhibition",
  },
  {
    value: "Performance",
  },
  {
    value: "Event",
  },
  {
    value: "Workshop",
  },
  {
    value: "Presentation",
  },
  {
    value: "Meetup",
  },
];

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#000",
      fontFamily: "Times New Roman !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderWidth: "2px",
      },
      "& .Mui-error fieldset": {
        borderColor: "black!important",
      },
    },
    "& .MuiOutlinedInput-root.Mui-error": {
      "& fieldset": {
        borderColor: "black!important",
      },
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "black!important",
      "& span": {
        color: "black!important",
      },
    },
  },
})(TextField);

const theme = createTheme({
  palette: {
    secondary: {
      main: "#000",
    },
  },
});

const rePhoneNumber =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function CalendarForm({
  data,
  after,
}: {
  profile?: boolean;
  data?: CalendarRow;
  after?: (eventId?: string) => void;
}) {
  let isMax = false;

  const formData = {
    ...data,
    starts_at: data?.starts_at ? dayjs(data.starts_at) : undefined,
    ...(data?.ends_at
      ? {
          ends_at: dayjs(data.ends_at),
        }
      : {}),
  };
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .max(20, "Must be at most 20 characters")
        .min(2, "Must be at least 2 characters"),

      type: Yup.string().required("Type is required"),

      address: Yup.string().min(2),

      starts_at: Yup.date()
        .required("Start Date/Time is required")
        .typeError("Must be a valid date")
        .min(new Date(), "Must be after current date/time")
        .transform((_, val) => (val === null ? undefined : new Date(val))),

      ends_at: Yup.date()
        .typeError("Must be a valid date")
        .min(new Date(), "Must be after current date/time")
        .transform((_, val) => (val === null ? undefined : new Date(val))),

      phone: Yup.string().matches(
        rePhoneNumber,
        "Must be a valid phone number"
      ),

      email: Yup.string()
        .required("Email is required")
        .email("Must be a valid email"),

      website: Yup.string().url("Must be a valid URL starting with http(s)://"),
    }),
    initialValues: { ...initialState, ...formData },
    onSubmit: async (values, helpers) => {
      const dataToSubmit = {
        ...values,
      };
      const response = data?.id
        ? await axios.put("/api/calendar/" + data.id, dataToSubmit)
        : await axios.post("/api/calendar/submit", dataToSubmit);
      helpers.setSubmitting(false);
      helpers.resetForm();
      enqueueSnackbar(data?.id ? "Saved Successfully" : "Created event", {
        variant: "success",
      });
      if (after) after(response?.data?.createdEventId);
    },
  });

  formik.values.description.length === 300 ? (isMax = true) : (isMax = false);

  return (
    <div className="[&>div]:border-r-4">
      <form onSubmit={formik.handleSubmit}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ maxWidth: "sm" }}>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="name"
                label="Name of Happening"
                required
                fullWidth
                color="secondary"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="type"
                label="Type of Happening"
                required
                select
                fullWidth
                color="secondary"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={!!formik.errors.type}
                helperText={formik.errors.type}
                disabled={formik.isSubmitting}
                style={{ fontFamily: "Times New Roman !important" }}
              >
                {type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid xs={12} sm={6}>
              <GooglePlacesAutoComplete
                disabled={formik.isSubmitting}
                onChange={(value) => formik.setFieldValue("address", value)}
                value={formik.values.address}
              />
              <div>
                <FormHelperText
                  className="helperText"
                  error={!!formik.errors.address}
                >
                  {formik.errors.address}
                </FormHelperText>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="website"
                label="Website"
                fullWidth
                color="secondary"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={!!formik.errors.website}
                helperText={formik.errors.website}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <DateTimePicker
                label="Start Date/Time *"
                disablePast
                className="block w-[100%]"
                sx={{
                  "& label": {
                    fontFamily: "Times New Roman",
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& fieldset": {
                    border: "1px solid black",
                    color: "black",
                  },
                  "&:hover fieldset": {
                    border: "2px solid black",
                    color: "black",
                  },
                  "& .Mui-focused fieldset": {
                    border: "2px solid black !important",
                  },
                  "& .MuiInputBase-colorError fieldset ": {
                    borderColor: "#d32f2f!important",
                  },
                  "& .MuiInputBase-colorError.Mui-focused fieldset": {
                    borderColor: "#d32f2f!important",
                  },
                  ".MuiFormLabel-colorError.Mui-focused": {
                    color: "#d32f2!important",
                  },
                }}
                value={formik.values.starts_at}
                onChange={(value) => formik.setFieldValue("starts_at", value)}
                disabled={formik.isSubmitting}
              />
              <div>
                <FormHelperText
                  className="helperText"
                  sx={{
                    width: "100%",
                    margin: "0px 0 0 0px!important",
                    padding: "3px 0 0 15px!important",
                  }}
                  error={!!formik.errors.starts_at}
                >
                  {formik.errors.starts_at}
                </FormHelperText>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <DateTimePicker
                label="End Date/Time"
                disablePast
                className="block w-[100%]"
                sx={{
                  "& label": {
                    fontFamily: "Times New Roman",
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& fieldset": {
                    border: "1px solid black",
                    color: "black",
                  },
                  "&:hover fieldset": {
                    border: "2px solid black",
                    color: "black",
                  },
                  "& .Mui-focused fieldset": {
                    border: "2px solid black !important",
                  },
                  "& .MuiInputBase-colorError fieldset ": {
                    borderColor: "#d32f2f!important",
                  },
                  ".MuiFormLabel-colorError": {
                    color: "#d32f2f!important",
                  },
                }}
                value={formik.values.ends_at}
                onChange={(value) => formik.setFieldValue("ends_at", value)}
                disabled={formik.isSubmitting}
              />
              <FormHelperText
                className="helperText"
                error={!!formik.errors.ends_at}
              >
                {formik.errors.ends_at}
              </FormHelperText>
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="phone"
                label="Telephone"
                fullWidth
                color="secondary"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={!!formik.errors.phone}
                helperText={formik.errors.phone}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="email"
                label="Email"
                required
                fullWidth
                color="secondary"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12}>
              <CssTextField
                label="Short Description"
                name="description"
                multiline
                fullWidth
                id="mui-theme-provider-outlined-input"
                variant="outlined"
                color="secondary"
                rows={4}
                inputProps={{
                  maxLength: 300,
                  style: { color: "black" },
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12}>
              <p
                className={`mt-[-13px] ${clsx(isMax ? "text-[#d32f2f]" : "")}`}
              >
                {formik.values.description.length}/300
              </p>
              <Button
                sx={{
                  float: "right",
                  backgroundColor: "rgb(239, 239, 239) !important",
                  textTransform: "none",
                  fontFamily: "Helvetica",
                  fontSize: ".9em",
                  borderRadius: "4px",
                  color: "#000",
                  border: "1px solid #000",
                  height: "31.8px",
                  padding: "0 8px",
                  margin: "-13px 0 20px 0",
                  "&:hover ": {
                    backgroundColor: "rgb(220, 220, 220) !important;",
                  },
                }}
                color="secondary"
                variant="contained"
                disabled={formik.isSubmitting}
                type={"submit"}
              >
                {!formik.isSubmitting && <>Save</>}
                {formik.isSubmitting && (
                  <span style={{ paddingRight: 2 }}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </span>
                )}
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  );
}
