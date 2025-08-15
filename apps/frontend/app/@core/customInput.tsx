import { Input } from "@/components/ui/input"

export const CustomInput = (props: any) => {
    const { label, mandatory = false, addClass, formik, name } = props;

    return (
        <div className="my-3">
            <label className="text-sm mx-1">{label} {mandatory ? <><span className="text-red-500">*</span></> : ""}</label>
            <Input onChange={formik.handleChange} className={formik.touched[name] && formik.errors[name] ? `${addClass} rounded-sm mt-1 border-red-500` : `${addClass} rounded-sm border-gray-400 mt-1`} {...props} />
        </div>
    )
}

