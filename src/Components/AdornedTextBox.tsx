import { useState, ReactNode } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { withStyles } from "@mui/styles"

const CssTextField = withStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "black",
            },
            "&:hover fieldset": {
                borderWidth: "2px",
            },
        },
    },
})(TextField);

export default function AdornedTextBox(props: TextFieldProps & { adornment: ReactNode }) {
    const [selected, setSelected] = useState<boolean>(false)
    const adornment = selected ? props.adornment : null
    return <CssTextField {...props}
        InputProps={{ startAdornment: adornment }}
        onFocus={e => setSelected(true)}
        onBlur={e => setSelected(false)}
    />
}