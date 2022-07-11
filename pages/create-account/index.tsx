import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
    interface CreateForm {
        email?: string;
        name?: string;
        password?: string;
        passwordcheck?: string;
    }
    interface MutationResult {
    ok: boolean;
    message: string;
    }   


const CreateAccount: NextPage = () => {
    // const [state, setState] = useState({
    //   loading: false
    // });
    
    const {register, handleSubmit} = useForm<CreateForm>();
    const [signup, { data}] = useMutation<MutationResult>("/api/users/signup");

    const onValid = (validForm:CreateForm) => {
        if(validForm.password == validForm.passwordcheck )
        {
            signup(validForm);
        }
        
      };
    const router  = useRouter();    
    const onClickToLogin = () =>{

        router.push("/log-in");
    };
    useEffect(() => {
        if(data?.ok){
            router.push("/");
        }
    }, [data, router] )
    return (
        <div className="flex w-full flex-wrap">
        
        <div className="flex w-full flex-col md:w-1/2">
            <div className="flex justify-center pt-12 md:-mb-12 md:justify-start md:pl-12">
            <img className=" w-8 md:w-14 " src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"    alt="logo" />
            </div>

            <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p className="text-center text-3xl">Join Muitter</p>
            <form  onSubmit={ handleSubmit(onValid) } className="flex flex-col pt-3 md:pt-8" >

                <Input register={register("name")}  name="name" label="Name" type="text" placed="your name" required />
                <Input register={register("email")} name="email" label="Email address" type="email" placed="sample@naver.com" required />
                <Input register={register("password")}  name="password" label="Password" type="password"  required />
                <Input register={register("passwordcheck")}  name="password-confirm" label="Confirm Password" type="password" required />                
                <div className=" text-red-400">{data?.ok ? "" :
                    data?.message}
                </div>

                <input type="submit" value="Register" className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-600" />
            </form>
            <div className="pt-12 pb-12 text-center">
                <p>Already have an account? </p>
                <div onClick={onClickToLogin} className="font-semibold underline">Log in here.</div>
            </div>
            </div>
        </div>

        <div className="w-1/2 shadow-2xl">
            <img className=" hidden h-screen w-full object-cover md:block" src="https://source.unsplash.com/random/1920" alt="Background" />
        </div>
        </div>

    );
}

export default CreateAccount;