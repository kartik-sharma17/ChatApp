import { formData } from "./interface";
import * as Yup from "yup";

export const initialValues: formData = {
    firstName: "",
    lastName: "",
    email: "",
    number: null,
    password: ""
}

export const validate = Yup.object({
    firstName: Yup.string().required("PLease Fill the required Feild"),
    lastName: Yup.string().required("PLease Fill the required Feild"),
    email: Yup.string().required("PLease Fill the required Feild"),
    number: Yup.string().required("PLease Fill the required Feild"),
    password: Yup.string().required("PLease Fill the required Feild")
})