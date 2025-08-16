import { formData } from "./interface";
import * as Yup from "yup";

export const initialValues: formData = {
    email: "",
    password: ""
}

export const validate = Yup.object({
    email: Yup.string().required("PLease Fill the required Feild"),
    password: Yup.string().required("PLease Fill the required Feild")
})