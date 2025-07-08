import { Button } from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Input } from "@/components/Input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuth } from "@/context/AuthContext";

const signupSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmedPassword: z
    .string()
    .nonempty("Confirmed Password is required")
    .min(6, "Confirmed Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmedPassword, {
  message: "Passwords must match",
  path: ["confirmedPassword"],
});

type FormFields = z.infer<typeof signupSchema>;

export const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { signUp } = useAuth();

  const{register, handleSubmit, setError, formState: { errors }} = useForm<FormFields>({
    resolver: zodResolver(signupSchema),
  });


  const onSubmit = async (data: FormFields) => {
    try {
      // await signUp(data.email, data.password);
      if(data.email && data.password) {
      navigate("/login");
      alert("Sign up successful! Please log in.");
    }
  } catch (err) {
    setError("email", {
      type: "manual",
      message: t("login.invalid"),
    });
      setError("password", {
        type: "manual",
        message: t("login.invalid"),
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("signup.title")}
          </div>
          <LanguageSwitcher />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          {/* Email */}
          <Input
            label={t("login.emailTitle")}
            type="email"
            labelCustom="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Password */}
          <Input
            label={t("login.passTitle")}
            type="password"
            labelCustom="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("password")}
            error={errors.password?.message}
          />
          {/* Password Confirmation */}
          <Input
            label={t("signup.confirmPassTitle")}
            type="password"
            labelCustom="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("confirmedPassword")}
            error={errors.confirmedPassword?.message}
          />

          {/* Submit */}

          <Button
            title={t("login.loginBtn")}
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 dark:bg-gray-800  dark:text-gray-400">
              {t("or")}
            </span>
          </div>
        </div>


          <Button
            title={t("login.title")}
            type="button"
            className="w-full mt-6 flex justify-center py-2 px-4 rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            onClick={() => navigate("/login")}
          />

      </div>
    </div>
  );
};
