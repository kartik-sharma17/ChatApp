"use client";
import { CustomInput, CustomSkeleton } from "@/app/@core"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useFormik } from 'formik';
import { initialValues, validate } from "./configFormik";
import { useSignupMutation } from "@/app/@redux/services";
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

export const SignupComponent = () => {

    const [signup, { isLoading }] = useSignupMutation();
    const navigate = useRouter()

    const formik = useFormik({
        initialValues,
        validationSchema: validate,
        onSubmit: async (values) => {
            try {
                const res = await signup(values).unwrap();
                toast.success(res?.message);
                setTimeout(() => {
                    navigate.push('/login')
                }, 3000)
            }
            catch (error) {
                toast.error(error?.data?.message ? error?.data?.message : "Something Went Wrong Please Try Again");
            }
        },
    })

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="grid grid-cols-12 w-full mx-4 sm:w-5/6 md:mx-0 md:w-4/6 h-8/10 rounded-2xl overflow-y-scroll" style={{
                overflowY: "scroll",
                scrollbarWidth: "thin",
                scrollbarColor: "#9ca3af transparent",
            }}>
                <div className="p-4 md:py-10 lg:p-10 px-5 lg:px-12 col-span-12 md:col-span-6 bg-white text-black ">
                    <form className="flex flex-col h-full" onSubmit={formik.handleSubmit}>
                        <h2 className="text-2xl text-center my-2 lg:mt-10 font-medium">Sign Up</h2>

                        <p className="text-xs text-gray-400 text-center">Welcome To Chat App</p>

                        <CustomInput formik={formik} name={"firstName"} mandatory={true} label={"First Name"} type="text" placeholder="First Name" />

                        <CustomInput formik={formik} name={"lastName"} mandatory={true} label={"Last Name"} type="text" placeholder="Last Name" />

                        <CustomInput formik={formik} name={"email"} mandatory={true} label={"Email"} type="email" placeholder="Email" />

                        <CustomInput formik={formik} name={"number"} mandatory={true} label={"Mobile Number"} type="text" placeholder="Mobile Number" />

                        <CustomInput formik={formik} name={"password"} mandatory={true} label={"Create Password"} type="password" placeholder="Create Password" />

                        {isLoading ? <CustomSkeleton className="w-full h-8 mt-4 bg-black" /> : <button type="submit" className="mt-4 text-white bg-black px-5 py-1 rounded-sm w-full cursor-pointer">Sign up</button>}

                        <div className="flex items-center gap-2 w-full mt-7">
                            <hr className="flex-1 border-gray-400" />
                            <p className="text-gray-400 text-xs">Or Continue With</p>
                            <hr className="flex-1 border-gray-400" />
                        </div>

                        <div className="grid grid-cols-12 gap-4 lg:gap-6 mt-7 mb-4">
                            <div className="col-span-12 lg:col-span-6 text-sm flex gap-2 items-center justify-center border-gray-200 rounded-sm border-1 p-2 cursor-pointer"><FontAwesomeIcon icon={faGoogle} className="text-green-400 w-5 h-5" />Google</div>
                            <div className="col-span-12 lg:col-span-6 text-sm flex gap-2 items-center justify-center border-gray-200 rounded-sm border-1 p-2 cursor-pointer"><FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-5 h-5" />Facebook</div>
                        </div>

                        <div className="mt-auto text-gray-400 text-xs text-center">Already have Account? <Link href={"/login"} className="text-black font-medium">Log in</Link></div>
                    </form>
                </div>
                <div className="hidden md:block md:col-span-6">
                    <img
                        src="/assets/pic/loginPic.jpeg"
                        alt="img"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}